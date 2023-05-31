/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { NpmFileLocation, PackageJson } from './util.js';
export interface CdnFile {
    content: string;
    contentType: string;
}
/**
 * An interface to unpkg.com or a similar NPM CDN service.
 */
export declare class CachingCdn {
    private readonly _urlPrefix;
    /** A cache for all fetches. */
    private readonly _fetchCache;
    /**
     * Maps from package + version ranges/tags to resolved semver versions. This
     * allows us to canonicalize more efficiently, because once we've resolved
     * e.g. "foo@^1.0.0/foo.js" to "foo@1.2.3/foo.js", we can then canonicalize
     * "foo@^1.0.0/bar.js" without another fetch.
     */
    private readonly _versionCache;
    /**
     * @param urlPrefix E.g. https://unpkg.com/
     */
    constructor(urlPrefix: string);
    /**
     * Fetch a file from the CDN.
     */
    fetch(location: NpmFileLocation): Promise<CdnFile>;
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
    canonicalize(location: NpmFileLocation): Promise<NpmFileLocation>;
    /**
     * Resolve the concrete version of the given package and version range
     */
    resolveVersion({ pkg, version, }: {
        pkg: string;
        version: string;
    }): Promise<string>;
    /**
     * Fetch and parse a package's package.json file.
     */
    fetchPackageJson({ pkg, version, }: {
        pkg: string;
        version: string;
    }): Promise<PackageJson>;
    private _fetch;
    private _parseUnpkgUrl;
}
//# sourceMappingURL=caching-cdn.d.ts.map