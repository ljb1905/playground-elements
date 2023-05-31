/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import ts from '../internal/typescript.js';
/**
 * Compiles a project, returning a Map of compiled file contents. The map only
 * contains context for files that are compiled. Other files are skipped.
 *
 * TODO (justinfagnani):  We could share a DocumentRegistry across
 * multiple <playground-project> instances to save memory and type analysis of
 * common lib files like lit-element, lib.d.ts and dom.d.ts.
 */
export declare class LanguageServiceContext {
    readonly compilerOptions: {
        target: ts.ScriptTarget;
        module: ts.ModuleKind;
        experimentalDecorators: boolean;
        skipDefaultLibCheck: boolean;
        skipLibCheck: boolean;
        allowJs: boolean;
        moduleResolution: ts.ModuleResolutionKind;
        jsx: ts.JsxEmit;
        lib: string[];
    };
    readonly serviceHost: WorkerLanguageServiceHost;
    readonly service: ts.LanguageService;
}
interface VersionedFile {
    version: number;
    content: string;
}
declare class WorkerLanguageServiceHost implements ts.LanguageServiceHost {
    readonly compilerOptions: ts.CompilerOptions;
    readonly packageRoot: string;
    readonly files: Map<string, VersionedFile>;
    constructor(packageRoot: string, compilerOptions: ts.CompilerOptions);
    updateFileContentIfNeeded(fileName: string, content: string): void;
    /**
     * Sync up the freshly acquired project files.
     * In the syncing process files yet to be added are added, and versioned.
     * Files that existed already but are modified are updated, and their version number
     * gets bumped fo that the languageservice knows to update these files.
     * */
    sync(files: Map<string, string>): void;
    private _removeDeletedFiles;
    getCompilationSettings(): ts.CompilerOptions;
    getScriptFileNames(): string[];
    getScriptVersion(fileName: string): string;
    fileExists(fileName: string): boolean;
    readFile(fileName: string): string | undefined;
    getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined;
    getCurrentDirectory(): string;
    getDefaultLibFileName(): string;
}
export {};
//# sourceMappingURL=language-service-context.d.ts.map