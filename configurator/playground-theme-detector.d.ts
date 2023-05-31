/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { LitElement } from 'lit';
import '../playground-code-editor.js';
export declare class PlaygroundThemeDetector extends LitElement {
    static styles: import("lit").CSSResult;
    private _filetype;
    private _iframeSrcdoc;
    private _codeText;
    private _propertyValues;
    private _iframeWithUserHtml;
    private _playgroundWithUserText;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): Promise<void>;
    _copySample(filetype: 'ts' | 'html' | 'css'): Promise<void>;
    _onClickPasteButton(): Promise<void>;
    private _readClipboard;
    private _extractStyles;
    _onClickApply(): void;
    _onClickCancel(): void;
}
//# sourceMappingURL=playground-theme-detector.d.ts.map