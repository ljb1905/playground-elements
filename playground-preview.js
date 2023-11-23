/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { __decorate } from "tslib";
import { html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '@material/mwc-icon-button';
import '@material/mwc-linear-progress';
import { PlaygroundConnectedElement } from './playground-connected-element.js';
import './internal/overlay.js';
import { CODE_DOWNLOAD, CODE_RESET, CODE_SAVE } from './code-language-preference.js';
/**
 * An HTML preview component consisting of an iframe and a floating reload
 * button.
 *
 * @fires reload - Fired when the user clicks the reload button
 */
let PlaygroundPreview = class PlaygroundPreview extends PlaygroundConnectedElement {
    constructor() {
        super();
        /**
         * The HTML file used in the preview.
         */
        this.htmlFile = 'index.html';
        /**
         * The string to display in the location bar.
         */
        this.location = ''; //'Result';
        /**
         * Whether the iframe is currently loading.
         */
        this._loading = true;
        /**
         * Whether to show the loading bar.
         */
        this._showLoadingBar = false;
        /**
         * Whether the iframe has fired its "load" event at least once.
         */
        this._loadedAtLeastOnce = false;
        this.reload = () => {
            const iframe = this.iframe;
            if (!iframe) {
                return;
            }
            // Reloading the iframe can cause a history entry to be added to the parent
            // window (on Chrome but not Firefox, and only when the parent/iframe origins
            // are different). Removing the iframe from the DOM while we initiate the
            // reload prevents a history entry from being added.
            const { parentNode, nextSibling } = iframe;
            if (parentNode) {
                iframe.remove();
            }
            // Note we can't use contentWindow.location.reload() here, because the
            // IFrame might be on a different origin.
            iframe.src = '';
            iframe.src = this._indexUrl;
            if (parentNode) {
                parentNode.insertBefore(iframe, nextSibling);
            }
            this._loading = true;
            this._showLoadingBar = true;
        };
        if (navigator.serviceWorker === undefined) {
            this._error = html `<p>
          <b>Sorry!</b> Preview unavailable because this browser doesn't
          <a
            href="https://caniuse.com/serviceworkers"
            target="_blank"
            rel="noopener"
            >support</a
          >
          service workers.
        </p>
        <p>
          <i
            >Note: Firefox
            <a
              href="https://bugzilla.mozilla.org/show_bug.cgi?id=1320796"
              target="_blank"
              rel="noopener"
              >doesn't</a
            >
            support service workers in private browsing mode.</i
          >
        </p> `;
        }
    }
    forceSave() {
        var _a;
        /* eslint-disable @typescript-eslint/no-floating-promises */
        (_a = this._project) === null || _a === void 0 ? void 0 : _a.saveDebounced(true);
    }
    localStorageSave() {
        window.dispatchEvent(new Event(CODE_SAVE));
    }
    download() {
        /* eslint-disable @typescript-eslint/no-floating-promises */
        //this._project?.saveDebounced(true);
        window.dispatchEvent(new Event(CODE_DOWNLOAD));
    }
    reset() {
        /* eslint-disable @typescript-eslint/no-floating-promises */
        //this._project?.saveDebounced(true);
        window.dispatchEvent(new Event(CODE_RESET));
    }
    update(changedProperties) {
        if (changedProperties.has('_project')) {
            const oldProject = changedProperties.get('_project');
            if (oldProject) {
                oldProject.removeEventListener('urlChanged', this.reload);
                // To be more responsive, we start loading as soon as compilation
                // starts. This is safe because requests block on compilation finishing.
                oldProject.removeEventListener('compileStart', this.reload);
            }
            if (this._project) {
                this._project.addEventListener('urlChanged', this.reload);
                this._project.addEventListener('compileStart', this.reload);
            }
        }
        super.update(changedProperties);
    }
    get _indexUrl() {
        var _a;
        const base = (_a = this._project) === null || _a === void 0 ? void 0 : _a.baseUrl;
        if (!base || !this.htmlFile) {
            return '';
        }
        const url = new URL(this.htmlFile, base);
        return url.toString();
    }
    render() {
        return html `
      <div id="toolbar" part="preview-toolbar">
        <span id="location" part="preview-location"> ${this.location}</span>
        <div style="display:flex; justify-content:space-between; margin-right:12px">
          <mwc-icon-button
            id="reload-button"
            aria-label="Reload preview"
            part="preview-reload-button"
            ?disabled=${!this._indexUrl}
            @click=${this.forceSave}
          >
            <!-- Source: https://material.io/resources/icons/?icon=refresh&style=baseline -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill="currentcolor"
              width="16px"
              height="16px"
            >
              <path
                d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
              />
            </svg>
          </mwc-icon-button>
          <mwc-icon-button
            id="reload-button"
            aria-label="Reload preview"
            part="preview-reload-button"
            ?disabled=${!this._indexUrl}
            @click=${this.localStorageSave}
          >
            <!-- Source: https://material.io/resources/icons/?icon=refresh&style=baseline -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentcolor"
              width="16px"
              height="16px"
            >
              <path
                d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
              />
            </svg>
          </mwc-icon-button>
          <mwc-icon-button
            id="reload-button"
            aria-label="Reload preview"
            part="preview-reload-button"
            ?disabled=${!this._indexUrl}
            @click=${this.download}
          >
            <!-- Source: https://material.io/resources/icons/?icon=refresh&style=baseline -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentcolor"
              width="16px"
              height="16px"
            >
              <path
                d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
              />
            </svg>
          </mwc-icon-button>
          <mwc-icon-button
            id="reload-button"
            aria-label="Reload preview"
            part="preview-reload-button"
            ?disabled=${!this._indexUrl}
            @click=${this.reset}
          >
            <!-- Source: https://material.io/resources/icons/?icon=refresh&style=baseline -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentcolor"
              width="16px"
              height="16px"
            >
              <path
                d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
              />
            </svg>
          </mwc-icon-button>
        </div>
      </div>

      <div id="content" class=${classMap({ error: !!this._error })}>
        <mwc-linear-progress
          aria-hidden=${this._loading ? 'false' : 'true'}
          part="preview-loading-indicator"
          indeterminate
          ?closed=${!this._showLoadingBar}
        ></mwc-linear-progress>

        ${this._loadedAtLeastOnce ? nothing : html `<slot></slot>`}

        <iframe
          title="Project preview"
          @load=${this._onIframeLoad}
          ?hidden=${!this._loadedAtLeastOnce}
        ></iframe>
      </div>

      ${this._error
            ? html `
            <playground-internal-overlay id="error">
              ${this._error}</playground-internal-overlay
            >
          `
            : nothing}
    `;
    }
    updated() {
        // TODO(aomarks) If we instead use an `ifDefined(this._indexUrl)` binding in
        // the template, then the preview loads twice. I must be doing something
        // dumb, but this hacky way of synchronizing the src works correctly for
        // now. Figure out the more elegant solution.
        if (this.iframe && this.iframe.src !== this._indexUrl) {
            this.iframe.src = this._indexUrl;
        }
    }
    async firstUpdated() {
        var _a, _b;
        // Loading should be initially indicated only when we're not pre-rendering,
        // because in that case there should be no visible change once the actual
        // iframe loads, and the indicator is distracting.
        if (this._loading && !this._slotHasAnyVisibleChildren()) {
            this._showLoadingBar = true;
        }
        // The latest version of MWC forwards the aria-label attribute to the
        // progressbar role correctly
        // (https://github.com/material-components/material-components-web-components/pull/2264),
        // but until 0.21.0 is released we'll need to fix it up ourselves.
        const progress = this.shadowRoot.querySelector('mwc-linear-progress');
        await progress.updateComplete;
        (_b = (_a = progress.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('[role=progressbar]')) === null || _b === void 0 ? void 0 : _b.setAttribute('aria-label', 'Preview is loading');
    }
    _slotHasAnyVisibleChildren() {
        var _a;
        const assigned = (_a = this._slot) === null || _a === void 0 ? void 0 : _a.assignedNodes({ flatten: true });
        if (!assigned) {
            return false;
        }
        for (const node of assigned) {
            if (node.nodeType === Node.COMMENT_NODE) {
                continue;
            }
            if (node.nodeType === Node.TEXT_NODE &&
                (node.textContent || '').trim() === '') {
                continue;
            }
            return true;
        }
        return false;
    }
    _onIframeLoad() {
        if (this._indexUrl) {
            // Check "src" because the iframe will fire a "load" for a blank page
            // before "src" is set.
            this._loading = false;
            this._loadedAtLeastOnce = true;
            this._showLoadingBar = false;
        }
    }
};
PlaygroundPreview.styles = css `
    :host {
      display: flex;
      flex-direction: column;
      background: white;
      font-family: sans-serif;
      height: 350px;
      position: relative; /* for the error message overlay */
      border-top-right-radius: 6px;
    }

    #toolbar {
      flex: 0 0 var(--playground-bar-height, 40px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: var(--playground-border, solid 1px #ddd);
      font-size: 15px;
      color: var(--playground-preview-toolbar-foreground-color, white);
      //border-radius: inherit;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background: var(--playground-preview-toolbar-background, #515966);
      border-top-right-radius: 6px;
      margin-left:-1px;
    }

    #location {
      margin: 0 10px;
    }

    #reload-button {
      --mdc-icon-button-size: 30px;
      --mdc-icon-size: 18px;
    }

    #content {
      max-height: 100%;
      position: relative;
      flex: 1;
    }

    #content.error {
      display: none;
    }

    #error {
      padding: 0 20px;
    }

    mwc-linear-progress {
      /* There is no way to directly specify the height of a linear progress
      bar, but zooming works well enough. It's 4px by default, and we want it to
      be 2px to match the tab bar indicator.*/
      zoom: 0.5;
      --mdc-linear-progress-buffer-color: transparent;
      position: absolute;
      top: -6px;
      width: 100%;
      --mdc-theme-primary: var(--playground-highlight-color, #ffa200);
    }

    iframe,
    slot {
      width: 100%;
      height: 100%;
    }

    iframe {
      border: none;
    }

    [hidden] {
      display: none;
    }

    mwc-icon-button {
      color: var(--playground-tab-bar-foreground-color);
    }

    mwc-icon-button:hover {
      color: #FAA804;
    }
  `;
__decorate([
    property({ attribute: 'html-file' })
], PlaygroundPreview.prototype, "htmlFile", void 0);
__decorate([
    property()
], PlaygroundPreview.prototype, "location", void 0);
__decorate([
    query('iframe', true)
], PlaygroundPreview.prototype, "iframe", void 0);
__decorate([
    query('slot')
], PlaygroundPreview.prototype, "_slot", void 0);
__decorate([
    state()
], PlaygroundPreview.prototype, "_loading", void 0);
__decorate([
    state()
], PlaygroundPreview.prototype, "_showLoadingBar", void 0);
__decorate([
    state()
], PlaygroundPreview.prototype, "_loadedAtLeastOnce", void 0);
__decorate([
    state()
], PlaygroundPreview.prototype, "_error", void 0);
PlaygroundPreview = __decorate([
    customElement('playground-preview')
], PlaygroundPreview);
export { PlaygroundPreview };
