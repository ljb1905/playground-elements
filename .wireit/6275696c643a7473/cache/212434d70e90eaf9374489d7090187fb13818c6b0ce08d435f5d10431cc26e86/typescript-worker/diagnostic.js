/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import ts from '../internal/typescript.js';
/**
 * Convert a diagnostic from TypeScript format to Language Server Protocol
 * format.
 */
export function makeLspDiagnostic(tsDiagnostic) {
    var _a;
    return {
        code: tsDiagnostic.code,
        source: (_a = tsDiagnostic.source) !== null && _a !== void 0 ? _a : 'typescript',
        message: ts.flattenDiagnosticMessageText(tsDiagnostic.messageText, '\n'),
        severity: diagnosticCategoryMapping[tsDiagnostic.category],
        range: {
            start: tsDiagnostic.file !== undefined && tsDiagnostic.start !== undefined
                ? tsDiagnostic.file.getLineAndCharacterOfPosition(tsDiagnostic.start)
                : { character: 0, line: 0 },
            end: tsDiagnostic.file !== undefined &&
                tsDiagnostic.start !== undefined &&
                tsDiagnostic.length !== undefined
                ? tsDiagnostic.file.getLineAndCharacterOfPosition(tsDiagnostic.start + tsDiagnostic.length)
                : { character: 0, line: 0 },
        },
    };
}
/**
 * We don't want a runtime import of 'vscode-languageserver-protocol' just for the
 * DiagnosticSeverity constants. We can duplicate the values instead, and assert
 * we got them right with a type constraint.
 */
const diagnosticCategoryMapping = {
    [ts.DiagnosticCategory.Error]: 1,
    [ts.DiagnosticCategory.Warning]: 2,
    [ts.DiagnosticCategory.Message]: 3,
    [ts.DiagnosticCategory.Suggestion]: 4,
};
