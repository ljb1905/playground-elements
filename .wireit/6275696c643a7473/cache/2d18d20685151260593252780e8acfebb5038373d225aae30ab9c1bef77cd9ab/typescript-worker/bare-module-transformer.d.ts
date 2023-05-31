/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { BuildOutput } from '../shared/worker-api.js';
import { ImportMapResolver } from './import-map-resolver.js';
import { CachingCdn } from './caching-cdn.js';
/**
 * Transforms bare module specifiers in .js files to canonical local paths, and
 * adds the corresponding modules to the virtual filesystem.
 *
 * For example, transforms:
 *   import {html} from "lit";
 * Into:
 *   import {html} from "./node_modules/lit@2.1.2/index.js";
 *
 * Dependencies are served from within the local
 * "<service-worker-scope>/node_modules/" path. This allows us to transform not
 * only our own project files, but the entire module dependency graph too.
 *
 * Specifiers are canonicalized to include the latest concrete version that is
 * compatible with the semver range, and to make default modules and file
 * extensions explicit. This provides improved module de-duplication over
 * unpkg.com's "?module" mode, which does not canonicalize.
 *
 * Version constraints are read from the "dependencies" field of package.json
 * files, both in dependencies and in the top-level project itself. If the
 * project doesn't contain a package.json file, the latest versions are assumed.
 */
export declare class BareModuleTransformer {
    private _cdn;
    private _importMapResolver;
    private _emittedExternalDependencies;
    private _nodeResolver;
    constructor(cdn: CachingCdn, importMapResolver: ImportMapResolver);
    process(results: AsyncIterable<BuildOutput> | Iterable<BuildOutput>): AsyncIterable<BuildOutput>;
    /**
     * Handle files from the top-level project.
     */
    private _handleProjectFiles;
    /**
     * Transform all of the imported module specifiers in the given JS module,
     * emit the transformed file, and process any dependencies corresponding to
     * those specifiers.
     */
    private _handleModule;
    /**
     * Transform the given module specifier and process the dependency
     * corresponding to it if needed.
     */
    private _handleSpecifier;
    /**
     * Canonicalize the given bare module specifier, then fetch it and add it to
     * the local filesystem.
     */
    private _handleBareSpecifier;
    /**
     * Fetch the given external module, and add it to the local filesystem under
     * its "node_modules/" path.
     */
    private _fetchExternalDependency;
}
//# sourceMappingURL=bare-module-transformer.d.ts.map