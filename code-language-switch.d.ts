import { LitElement } from 'lit';
export declare class CodeLanguageSwitch extends LitElement {
    static styles: import("lit").CSSResult;
    codeSwitchHanler?: (codeType: string) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _onCodeLanguagePreferenceChanged;
    render(): import("lit-html").TemplateResult<1>;
    private _toggleLanguageAndAdjustScroll;
}
declare global {
    interface HTMLElementTagNameMap {
        'code-language-switch': CodeLanguageSwitch;
    }
}
//# sourceMappingURL=code-language-switch.d.ts.map