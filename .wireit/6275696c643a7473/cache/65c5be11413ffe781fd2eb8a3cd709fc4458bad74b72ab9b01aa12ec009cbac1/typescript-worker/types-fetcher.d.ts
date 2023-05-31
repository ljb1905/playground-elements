/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { ImportMapResolver } from './import-map-resolver.js';
import { CachingCdn } from './caching-cdn.js';
import { PackageJson } from './util.js';
import { PackageDependencies, DependencyGraph, NodeModulesDirectory } from './node-modules-layout-maker.js';
declare type FilePath = string;
declare type FileContent = string;
/**
 * Fetches typings for TypeScript imports and their transitive dependencies, and
 * for standard libraries.
 */
export declare class TypesFetcher {
    private readonly _cdn;
    private readonly _importMapResolver;
    private readonly _rootPackageJson;
    private readonly _rootDependencies;
    private readonly _dependencyGraph;
    private readonly _filesByPackageVersion;
    /**
     * Fetch all ".d.ts" typing files for the full transitive dependency tree of
     * the given project source files and standard libs.
     *
     * @param cdn Interface to unpkg.com or similar CDN service for fetching
     * assets.
     * @param importMapResolver Resolves bare modules to custom URLs, for
     * optionally overriding the CDN.
     * @param rootPackageJson The parsed package.json file for the root project,
     * or undefined if there isn't one.
     * @param sources Project TypeScript source file contents. All bare module
     * imports in these sources will be followed.
     * @param tsLibs Case-insensitive TypeScript standard libraries to fetch, e.g.
     * "es2020", "DOM".
     */
    static fetchTypes(cdn: CachingCdn, importMapResolver: ImportMapResolver, rootPackageJson: PackageJson | undefined, sources: string[], tsLibs: string[]): Promise<{
        files: Map<FilePath, FileContent>;
        layout: NodeModulesDirectory;
        dependencyGraph: {
            root: PackageDependencies;
            deps: DependencyGraph;
        };
    }>;
    private constructor();
    private _addTypeScriptStandardLib;
    private _handleBareAndRelativeSpecifiers;
    private _handleBareSpecifier;
    private _handleRelativeSpecifier;
    private _getDependencyVersion;
    private _getDtsPath;
    private _fetchPackageJsonAndAddToOutputFiles;
    private _fetchAndAddToOutputFiles;
    /**
     * Record in our dependency graph that some package depends on another.
     */
    private _addEdgeToDependencyGraph;
    /**
     * Materialize a node_modules/ file tree for the given layout into the given
     * file map, using the files we've fetched.
     *
     * For example, given the layout ...
     *
     *   ROOT
     *   ├── A1
     *   ├── B1
     *   │   └── A2
     *   └── C1
     *       └── A2
     *
     * ... and where each package just contains one "index.d.ts" file, then
     * populates the file map with keys:
     *
     *   a/index.d.ts
     *   b/index.d.ts
     *   b/node_modules/a/index.d.ts
     *   c/index.d.ts
     *   c/node_modules/a/index.d.ts
     */
    private _materializeNodeModulesTree;
}
export {};
//# sourceMappingURL=types-fetcher.d.ts.map