/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { ModuleImportMap } from '../shared/worker-api.js';
/**
 * Resolves module specifiers using an import map.
 *
 * For overview, see https://github.com/WICG/import-maps. For algorithm, see
 * https://wicg.github.io/import-maps/#resolving
 *
 * TODO(aomarks) Add support for `scopes`.
 */
export declare class ImportMapResolver {
    private importMap;
    constructor(importMap: ModuleImportMap);
    resolve(specifier: string): string | null;
}
//# sourceMappingURL=import-map-resolver.d.ts.map