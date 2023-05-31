/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { NpmFileLocation, PackageJson } from './util.js';
/**
 * Resolves a path according to the Node package exports algorithm.
 *
 * Documentation:
 *
 *   Node: https://nodejs.org/api/packages.html#packages_package_entry_points
 *   Rollup: https://github.com/rollup/plugins/tree/master/packages/node-resolve/#package-entrypoints
 *   Webpack: https://webpack.js.org/guides/package-exports/
 *
 * Reference implementations:
 *
 *   Node: https://github.com/nodejs/node/blob/a9dd03b1ec89a75186f05967fc76ec0704050c36/lib/internal/modules/esm/resolve.js#L615
 *   Rollup:
 * https://github.com/rollup/plugins/blob/53fb18c0c2852598200c547a0b1d745d15b5b487/packages/node-resolve/src/package/resolvePackageImportsExports.js#L6
 */
export declare class NodeModuleResolver {
    private readonly _conditions;
    constructor({ conditions }: {
        conditions: string[];
    });
    /**
     * @param location Package/version/path to resolve.
     * @param packageJson The package's package.json (parsed object, not string).
     * @param base Path of the importing module, used for error messages (e.g.
     * "./my-element.js").
     * @return The resolved subpath.
     * @throws If the given subpath could not be resolved.
     */
    resolve(location: NpmFileLocation, packageJson: PackageJson, base: string): string;
}
//# sourceMappingURL=node-module-resolver.d.ts.map