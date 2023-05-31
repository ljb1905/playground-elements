/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { fileExtension, parseNpmStyleSpecifier, isExactSemverVersion, pkgVersion, pkgVersionPath, } from './util.js';
import { Deferred } from '../shared/deferred.js';
/**
 * An interface to unpkg.com or a similar NPM CDN service.
 */
export class CachingCdn {
    /**
     * @param urlPrefix E.g. https://unpkg.com/
     */
    constructor(urlPrefix) {
        /** A cache for all fetches. */
        this._fetchCache = new Map();
        /**
         * Maps from package + version ranges/tags to resolved semver versions. This
         * allows us to canonicalize more efficiently, because once we've resolved
         * e.g. "foo@^1.0.0/foo.js" to "foo@1.2.3/foo.js", we can then canonicalize
         * "foo@^1.0.0/bar.js" without another fetch.
         */
        this._versionCache = new Map();
        this._urlPrefix = urlPrefix;
    }
    /**
     * Fetch a file from the CDN.
     */
    async fetch(location) {
        const { file } = await this._fetch(location);
        return file;
    }
    /**
     * Return a version of the given CDN file specifier where version ranges and
     * NPM tags are resolved to concrete semver versions, and ambiguous paths are
     * resolved to concrete ones.
     *
     * E.g. foo@^1.0.0 -> foo@1.2.3/index.js
     *
     * TODO(aomarks) Remove this method in favor of separate resolveVersion and
     * fileExists methods, so that the caller can fully control resolution. We
     * shouldn't rely on unpkg's redirection logic for resolving paths anymore,
     * because it doesn't follow Node package exports, which can arbitrary remap
     * paths.
     */
    async canonicalize(location) {
        let exact = isExactSemverVersion(location.version);
        if (!exact) {
            const pv = pkgVersion(location);
            const resolved = this._versionCache.get(pv);
            if (resolved !== undefined) {
                location = { ...location, version: resolved };
                exact = true;
            }
        }
        if (!exact || fileExtension(location.path) === '') {
            const { url } = await this._fetch(location);
            location = this._parseUnpkgUrl(url);
        }
        return location;
    }
    /**
     * Resolve the concrete version of the given package and version range
     */
    async resolveVersion({ pkg, version, }) {
        return (await this.canonicalize({ pkg, version, path: 'package.json' }))
            .version;
    }
    /**
     * Fetch and parse a package's package.json file.
     */
    async fetchPackageJson({ pkg, version, }) {
        const { url, file: { content }, } = await this._fetch({ pkg, version, path: 'package.json' });
        try {
            return JSON.parse(content);
        }
        catch (e) {
            throw new Error(`Error parsing CDN package.json from ${url}: ${e}`);
        }
    }
    async _fetch(location) {
        var _a;
        let exact = isExactSemverVersion(location.version);
        if (!exact) {
            const pv = pkgVersion(location);
            const resolved = this._versionCache.get(pv);
            if (resolved !== undefined) {
                location = { ...location, version: resolved };
                exact = true;
            }
        }
        const pvp = pkgVersionPath(location);
        const cached = this._fetchCache.get(pvp);
        if (cached !== undefined) {
            return cached.promise;
        }
        const deferred = new Deferred();
        this._fetchCache.set(pvp, deferred);
        const url = this._urlPrefix + pvp;
        const res = await fetch(url);
        const content = await res.text();
        if (res.status !== 200) {
            const err = new Error(`CDN HTTP ${res.status} error (${url}): ${content}`);
            deferred.reject(err);
            return deferred.promise;
        }
        if (!exact) {
            const canonical = this._parseUnpkgUrl(res.url);
            this._versionCache.set(pkgVersion(location), canonical.version);
            this._fetchCache.set(pkgVersionPath(canonical), deferred);
        }
        const result = {
            url: res.url,
            file: {
                content,
                contentType: (_a = res.headers.get('content-type')) !== null && _a !== void 0 ? _a : 'text/plain',
            },
        };
        deferred.resolve(result);
        return deferred.promise;
    }
    _parseUnpkgUrl(url) {
        if (url.startsWith(this._urlPrefix)) {
            const parsed = parseNpmStyleSpecifier(url.slice(this._urlPrefix.length));
            if (parsed !== undefined) {
                return parsed;
            }
        }
        throw new Error(`Unexpected CDN URL format: ${url}`);
    }
}
