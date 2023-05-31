/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Merges multiple async iterables into one iterable. Order is not preserved.
 * Iterables can be added before or during iteration. After exhausted, adding a
 * new iterator throws.
 */
export declare class MergedAsyncIterables<T> {
    private readonly _buffer;
    private _numSources;
    private _notify?;
    private _done;
    [Symbol.asyncIterator](): AsyncGenerator<Awaited<T>, void, unknown>;
    add(iterable: AsyncIterable<T>): void;
}
/**
 * Return the relative path from two URL pathnames.
 *
 * E.g. given "a/b/c.js" and "a/d.js" return "../d.js".
 */
export declare const relativeUrlPath: (from: string, to: string) => string;
/**
 * Resolve two URL pathnames into an absolute path.
 *
 * E.g. given "a/b/c.js" and "../d.js" return "a/d.js".
 */
export declare const resolveUrlPath: (a: string, b: string) => string;
/**
 * Return whether the given module import specifier is bare, a relative URL, or
 * a fully qualified URL.
 */
export declare const classifySpecifier: (specifier: string) => 'bare' | 'relative' | 'url';
export interface NpmFileLocation {
    pkg: string;
    version: string;
    path: string;
}
/**
 * Parse the given module import specifier using format
 * "<pkg>[@<version>][/<path>]".
 *
 * E.g. given "foo@^1.2.3/bar.js" return {
 *   pkg: "foo",
 *   version: "^1.2.3",
 *   path: "bar.js"
 * }
 */
export declare const parseNpmStyleSpecifier: (specifier: string) => NpmFileLocation | undefined;
/**
 * Return the file extension of the given URL path. Does not include the leading
 * ".". Note this only considers the final ".", so e.g. given "foo.d.ts" this
 * will return "ts".
 */
export declare const fileExtension: (path: string) => string;
/**
 * Change the given URL path's file extension to a different one. `newExt`
 * should not include the leading ".". Note this only considers the final ".",
 * so e.g. given "foo.d.ts" and ".js" this will return "foo.d.js".
 */
export declare const changeFileExtension: (path: string, newExt: string) => string;
/**
 * Given a string and string-relative character index, return the equivalent
 * line number and line-relative character index.
 */
export declare const charToLineAndChar: (str: string, char: number) => {
    line: number;
    character: number;
};
/**
 * The "exports" field of a package.json.
 *
 * See https://nodejs.org/api/packages.html#packages_exports.
 */
export declare type PackageExports = PackageExportsTarget | PackageExportsPathOrConditionMap;
/**
 * The export result for some path or condition.
 */
export declare type PackageExportsTarget = PackageExportsTargetPath | PackageExportsConditionMap | PackageExportsTarget[] | null;
/**
 * A concrete resolved path (e.g. "./lib/foo.js").
 */
export declare type PackageExportsTargetPath = string;
/**
 * Map from a path or condition to a target.
 */
export declare type PackageExportsPathOrConditionMap = {
    [pathOrCondition: string]: PackageExportsTarget;
};
/**
 * Map from a condition to a target.
 *
 * Note this is technically the same type as PackageExportsPathOrConditionMap,
 * but it's distinguished for clarity because "path" keys are only allowed in
 * the top-level of the "exports" object.
 */
export declare type PackageExportsConditionMap = {
    [condition: string]: PackageExportsTarget;
};
export interface PackageJson {
    version?: string;
    main?: string;
    exports?: PackageExports;
    module?: string;
    types?: string;
    typings?: string;
    type?: string;
    dependencies?: {
        [key: string]: string;
    };
}
export interface PackageJsonWithExports extends PackageJson {
    exports: PackageExports;
}
/**
 * Return whether the given string is an exact semver version, as opposed to a
 * range or tag.
 */
export declare const isExactSemverVersion: (s: string) => boolean;
export declare const pkgVersion: ({ pkg, version }: {
    pkg: string;
    version: string;
}) => string;
export declare const pkgVersionPath: ({ pkg, version, path }: NpmFileLocation) => string;
export declare const trimLeadingSlash: (s: string) => string;
export declare const trimTrailingSlash: (s: string) => string;
//# sourceMappingURL=util.d.ts.map