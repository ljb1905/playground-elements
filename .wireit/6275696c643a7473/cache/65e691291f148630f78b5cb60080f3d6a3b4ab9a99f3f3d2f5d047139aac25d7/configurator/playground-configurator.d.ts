/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { LitElement } from 'lit';
import '../playground-ide.js';
import '../playground-code-editor.js';
import '@material/mwc-dialog';
import '@material/mwc-button';
import './playground-theme-detector.js';
/**
 * A configurator for the playground-* elements.
 */
export declare class PlaygroundConfigurator extends LitElement {
    static styles: import("lit").CSSResult[];
    private values;
    private _themeDetectorOpen;
    private _ide;
    connectedCallback(): void;
    private setValue;
    private setValues;
    private _applyTheme;
    private readUrlParams;
    private setUrlParams;
    render(): import("lit-html").TemplateResult<1>;
    private get knobs();
    private get htmlText();
    private get themeImport();
    private get htmlTextAttributes();
    private get cssText();
    private knob;
    private selectKnob;
    private sliderKnob;
    private colorKnob;
    private checkboxKnob;
    private _openThemeDetector;
    private _closeThemeDetector;
    private _onThemeDetectorApply;
}
declare global {
    interface HTMLElementTagNameMap {
        'playground-configurator': PlaygroundConfigurator;
    }
}
//# sourceMappingURL=playground-configurator.d.ts.map