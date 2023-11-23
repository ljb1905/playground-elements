

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { getCodeLanguagePreference, setCodeLanguagePreference, CODE_LANGUAGE_CHANGE} from './code-language-preference.js';

@customElement('code-language-switch')
export class CodeLanguageSwitch extends LitElement {
  static override styles = css`
    :host,
    * {
      box-sizing: border-box;
    }

    :host {
      display: inline-flex;
      align-items: center;
      font-size: 13px;
      width: calc(48em / 13);
      height: calc(27em / 13);
      border-radius: 1em;
      padding: calc(2em / 13);
      border: calc(1.5em / 13) solid #FAA804;
      background: var(--playground-tab-bar-background, #515966);
      font-family: 'Open Sans', sans-serif;
    }

    button {
      flex: 1;
      height: 100%;
      display: flex;
      position: relative;
      font-size: inherit;
      font-family: inherit;
      background: transparent;
      border: none;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      padding: 0;
      z-index: 0;
      padding-top: 2px;
      padding-right: 1px;
    }

    #toggle {
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      transition: left 100ms;
      background: #FAA804;
      //background: #FFF;
      z-index: -1;
      border-radius: 1em;
    }

    @media (prefers-reduced-motion: reduce) {
      #toggle {
        transition: none;
      }
    }

    button:hover > #toggle {
      background: #FF7206bd;
      //background: #FAA804bd;
    }

    [aria-checked='false'] > #toggle {
      left: 1px;
    }

    [aria-checked='true'] > #toggle {
      left: 50%;
    }

    #jsLabel,
    #tsLabel {
      display: inline-flex;
      z-index: 1;
      padding: 0 0 calc(1em / 13) calc(3em / 13);
      opacity: 60%;
      transition: color 100ms, opacity 100ms;
      color:#fff
    }

    [aria-checked='true'] > #tsLabel,
    [aria-checked='false'] > #jsLabel {
      color: #000;
      font-weight: 600;
      opacity: 100%;
    }
  `;

  @property({ attribute: 'code-switch-handler' })
  codeSwitchHanler?: (codeType:string)=>void;

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener(CODE_LANGUAGE_CHANGE, this._onCodeLanguagePreferenceChanged);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(CODE_LANGUAGE_CHANGE, this._onCodeLanguagePreferenceChanged);
  }

  private _onCodeLanguagePreferenceChanged = () => {
    this.requestUpdate();
    if(this.codeSwitchHanler){
      this.codeSwitchHanler(getCodeLanguagePreference())
    }
  };

  override render() {
    const mode = getCodeLanguagePreference();
    return html`
      <button
        role="switch"
        aria-checked=${mode == 'ts' ? 'true' : 'false'}
        aria-label="Toggle TypeScript"
        title=${mode === 'ts' ? 'Disable TypeScript' : 'Enable TypeScript'}
        @click=${this._toggleLanguageAndAdjustScroll}
      >
        <span id="jsLabel">JS</span>
        <span id="tsLabel">TS</span>
        <span id="toggle"></span>
      </button>
    `;
  }

 
  private _toggleLanguageAndAdjustScroll() {
    const newLanguage = getCodeLanguagePreference() === 'ts' ? 'js' : 'ts';
    const viewportYBefore = this.getBoundingClientRect().y;
    setCodeLanguagePreference(newLanguage);
    const viewportYAfter = this.getBoundingClientRect().y;
    window.scrollBy({top: viewportYAfter - viewportYBefore});
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'code-language-switch': CodeLanguageSwitch;
  }
}
