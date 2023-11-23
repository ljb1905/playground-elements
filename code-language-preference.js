const LOCAL_STORAGE_KEY = 'code-language-preference';
const BODY_ATTRIBUTE = 'code-language-preference';
export const CODE_LANGUAGE_CHANGE = 'code-language-change';
export const BEFORE_CODE_LANGUAGE_CHANGE = 'before-code-language-change';
export const CODE_SAVE = 'code-save';
export const CODE_DOWNLOAD = 'code-download';
export const CODE_RESET = 'code-reset';
export const getCodeLanguagePreference = () => {
    var _a;
    return (_a = localStorage.getItem(LOCAL_STORAGE_KEY)) !== null && _a !== void 0 ? _a : 'ts';
};
export const setCodeLanguagePreference = (preference, force = false) => {
    if (!force) {
        let cancelled = false;
        const detail = {
            pendingLanguage: preference,
            cancel: () => {
                cancelled = true;
            },
        };
        window.dispatchEvent(new CustomEvent(BEFORE_CODE_LANGUAGE_CHANGE, { detail }));
        if (cancelled) {
            return;
        }
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, preference);
    window.dispatchEvent(new Event(CODE_LANGUAGE_CHANGE));
    writeCodeLanguagePreferenceBodyAttribute();
};
export const writeCodeLanguagePreferenceBodyAttribute = () => {
    document.body.setAttribute(BODY_ATTRIBUTE, getCodeLanguagePreference());
};
