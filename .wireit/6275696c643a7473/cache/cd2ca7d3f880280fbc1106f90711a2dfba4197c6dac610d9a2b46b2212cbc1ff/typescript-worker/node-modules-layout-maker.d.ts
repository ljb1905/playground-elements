/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
declare type VersionNumber = string;
/**
 * Like the "dependencies" field of a package.json file, except the version
 * numbers are always concrete instead of semver ranges.
 */
export interface PackageDependencies {
    [pkg: string]: VersionNumber;
}
/**
 * Maps from NPM package name, to the versions of that package, to its
 * dependencies.
 */
export interface DependencyGraph {
    [pkg: string]: {
        [version: string]: PackageDependencies;
    };
}
/**
 * The contents of a "node_modules/" directory. Keys are NPM package names.
 * Values are objects containing the version, and the contents of a nested
 * "node_modules/" directory.
 */
export interface NodeModulesDirectory {
    [pkg: string]: {
        version: VersionNumber;
        nodeModules: NodeModulesDirectory;
    };
}
/**
 * Given an NPM-style dependency graph, makes a directory structure comprised of
 * nested "node_modules/" folders that is compatible with the layout expected by
 * the Node module resolution algorithm
 * (https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders).
 *
 * Attempts to create the flattest directory layout possible to reduce file
 * duplication, without causing version conflicts.
 *
 * For example, given the dependency graph:
 *
 *      ROOT
 *       /|\
 *      / | \
 *     /  |  \
 *    v   v   v
 *    A1  B1  C1
 *         \   /
 *          \ /
 *           v
 *           A2 --> D1
 *
 * Returns the directory tree:
 *
 *   ROOT
 *   ├── A1
 *   ├── B1
 *   │   └── A2
 *   ├── C1
 *   │   └── A2
 *   └── D1
 */
export declare class NodeModulesLayoutMaker {
    layout(rootDeps: PackageDependencies, depGraph: DependencyGraph): NodeModulesDirectory;
}
export {};
//# sourceMappingURL=node-modules-layout-maker.d.ts.map