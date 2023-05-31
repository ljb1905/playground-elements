/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Resolves module specifiers using an import map.
 *
 * For overview, see https://github.com/WICG/import-maps. For algorithm, see
 * https://wicg.github.io/import-maps/#resolving
 *
 * TODO(aomarks) Add support for `scopes`.
 */
export class ImportMapResolver {
    constructor(importMap) {
        this.importMap = importMap;
    }
    resolve(specifier) {
        var _a;
        for (const [specifierKey, resolutionResult] of Object.entries((_a = this.importMap.imports) !== null && _a !== void 0 ? _a : {})) {
            // Note that per spec we shouldn't do a lookup for the exact match case,
            // because if a trailing-slash mapping also matches and comes first, it
            // should have precedence.
            if (specifierKey === specifier) {
                return resolutionResult;
            }
            if (specifierKey.endsWith('/') && specifier.startsWith(specifierKey)) {
                if (!resolutionResult.endsWith('/')) {
                    console.warn(`Could not resolve module specifier "${specifier}"` +
                        ` using import map key "${specifierKey}" because` +
                        ` address "${resolutionResult}" must end in a forward-slash.`);
                    return null;
                }
                const afterPrefix = specifier.substring(specifierKey.length);
                let url;
                try {
                    url = new URL(afterPrefix, resolutionResult);
                }
                catch {
                    console.warn(`Could not resolve module specifier "${specifier}"` +
                        ` using import map key "${specifierKey}" because` +
                        ` "${afterPrefix}" could not be parsed` +
                        ` relative to "${resolutionResult}".`);
                    return null;
                }
                const urlSerialized = url.href;
                if (!urlSerialized.startsWith(resolutionResult)) {
                    console.warn(`Could not resolve module specifier "${specifier}"` +
                        ` using import map key "${specifierKey}" because` +
                        ` "${afterPrefix}" backtracked above "${resolutionResult}".`);
                    return null;
                }
                return urlSerialized;
            }
        }
        return null;
    }
}
