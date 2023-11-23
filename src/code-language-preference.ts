export type CodeLanguagePreference = 'ts' | 'js';
const LOCAL_STORAGE_KEY = 'code-language-preference';
const BODY_ATTRIBUTE = 'code-language-preference';
export const CODE_LANGUAGE_CHANGE = 'code-language-change';
export const BEFORE_CODE_LANGUAGE_CHANGE = 'before-code-language-change';
export const CODE_SAVE = 'code-save';
export const CODE_DOWNLOAD = 'code-download';
export const CODE_RESET = 'code-reset';

interface BeforeCodeLanguageChangeDetail {
  pendingLanguage: CodeLanguagePreference;
  cancel: () => void;
}

declare global {
  interface WindowEventMap {
    [BEFORE_CODE_LANGUAGE_CHANGE]: CustomEvent<BeforeCodeLanguageChangeDetail>;
  }
}

export const getCodeLanguagePreference = (): CodeLanguagePreference =>
  (localStorage.getItem(LOCAL_STORAGE_KEY) as CodeLanguagePreference | null) ??
  'ts';

export const setCodeLanguagePreference = (
  preference: CodeLanguagePreference,
  force = false
): void => {
  if (!force) {
    let cancelled = false;
    const detail: BeforeCodeLanguageChangeDetail = {
      pendingLanguage: preference,
      cancel: () => {
        cancelled = true;
      },
    };
    window.dispatchEvent(
      new CustomEvent(BEFORE_CODE_LANGUAGE_CHANGE, {detail})
    );
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
