export declare type CodeLanguagePreference = 'ts' | 'js';
export declare const CODE_LANGUAGE_CHANGE = "code-language-change";
export declare const BEFORE_CODE_LANGUAGE_CHANGE = "before-code-language-change";
export declare const CODE_SAVE = "code-save";
export declare const CODE_DOWNLOAD = "code-download";
export declare const CODE_RESET = "code-reset";
interface BeforeCodeLanguageChangeDetail {
    pendingLanguage: CodeLanguagePreference;
    cancel: () => void;
}
declare global {
    interface WindowEventMap {
        [BEFORE_CODE_LANGUAGE_CHANGE]: CustomEvent<BeforeCodeLanguageChangeDetail>;
    }
}
export declare const getCodeLanguagePreference: () => CodeLanguagePreference;
export declare const setCodeLanguagePreference: (preference: CodeLanguagePreference, force?: boolean) => void;
export declare const writeCodeLanguagePreferenceBodyAttribute: () => void;
export {};
//# sourceMappingURL=code-language-preference.d.ts.map