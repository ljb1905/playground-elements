/**
 * @license
 * Copyright 2017 Node.js contributors. All rights reserved.
 * SPDX-License-Identifier: MIT
 */
import { PackageExportsTarget } from '../util.js';
export declare class InvalidModuleSpecifierError extends Error {
    constructor(request: string, reason: string, base?: string);
}
export declare class InvalidPackageConfigError extends Error {
    constructor(path: string, base: string, message: string);
}
export declare class InvalidPackageTargetError extends Error {
    constructor(pkgPath: URL, key: string, target: PackageExportsTarget, isImport?: boolean, base?: string);
}
export declare class PackagePathNotExportedError extends Error {
    constructor(pkgPath: string, subpath: string, base?: string);
}
//# sourceMappingURL=errors.d.ts.map