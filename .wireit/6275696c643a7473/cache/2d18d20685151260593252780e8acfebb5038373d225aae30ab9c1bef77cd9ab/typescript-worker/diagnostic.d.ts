/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import ts from '../internal/typescript.js';
import * as lsp from 'vscode-languageserver-protocol';
/**
 * Convert a diagnostic from TypeScript format to Language Server Protocol
 * format.
 */
export declare function makeLspDiagnostic(tsDiagnostic: ts.Diagnostic): lsp.Diagnostic;
//# sourceMappingURL=diagnostic.d.ts.map