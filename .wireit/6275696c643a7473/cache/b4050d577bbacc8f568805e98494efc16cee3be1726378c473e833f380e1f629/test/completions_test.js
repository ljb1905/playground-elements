/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import '../playground-ide.js';
import '../playground-code-editor.js';
import { assert } from '@esm-bundle/chai';
import { sendKeys } from '@web/test-runner-commands';
import { html, render } from 'lit';
suite('completions', () => {
    let container;
    let project;
    let editor;
    let testRunning;
    setup(async () => {
        var _a, _b, _c, _d, _e, _f;
        container = document.createElement('div');
        document.body.appendChild(container);
        render(html `
        <playground-ide sandbox-base-url="/">
          <script type="sample/ts" filename="hello.ts"></script>
          <script type="sample/html" filename="index.html">
            <body>
              <script type="module" src="hello.js">&lt;/script>
            </body>
          </script>
        </playground-ide>
      `, container);
        await assertPreviewContains('');
        project = (_b = (_a = document
            .querySelector('playground-ide')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('playground-project');
        editor = (_f = (_e = (_d = (_c = document
            .querySelector('playground-ide')) === null || _c === void 0 ? void 0 : _c.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('playground-file-editor')) === null || _e === void 0 ? void 0 : _e.shadowRoot) === null || _f === void 0 ? void 0 : _f.querySelector('playground-code-editor');
    });
    teardown(() => {
        container.remove();
    });
    const emulateUser = async (word) => {
        const chars = word.split('');
        while (chars.length > 0) {
            const c = chars.shift();
            if (c) {
                await raf();
                await raf();
                await sendKeys({
                    type: c,
                });
            }
        }
    };
    const waitForIframeLoad = (iframe) => new Promise((resolve) => {
        iframe.addEventListener('load', () => resolve(), { once: true });
    });
    const assertPreviewContains = async (text) => {
        const iframe = (await pierce('playground-ide', 'playground-preview', 'iframe'));
        await waitForIframeLoad(iframe);
        // TODO(aomarks) Chromium and Webkit both fire iframe "load" after the
        // contentDocument has actually loaded, but Firefox fires it before. Why is
        // that? If not for that, we wouldn't need to poll here.
        await new Promise((resolve) => {
            const check = () => {
                var _a, _b, _c;
                if ((_c = (_b = (_a = iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.includes(text)) {
                    resolve();
                }
                else if (testRunning) {
                    setTimeout(check, 10);
                }
            };
            check();
        });
    };
    const waitForElement = (parent, elementName) => {
        return new Promise((resolve, reject) => {
            (function tryToFindElem(attempt) {
                if (parent === null || parent === void 0 ? void 0 : parent.querySelector(elementName)) {
                    return resolve('');
                }
                if (attempt > 10) {
                    return reject();
                }
                setTimeout(() => tryToFindElem(attempt + 1), 100);
            })(1);
        });
    };
    const waitForCompletionsToAppear = () => new Promise((resolve, reject) => {
        // Make sure we can grab the focuscontainer for observing
        if (!editor || !editor.shadowRoot)
            return reject();
        const focusContainer = editor.shadowRoot.querySelector('#focusContainer');
        if (!focusContainer)
            return reject();
        const config = { childList: true };
        // To avoid computer/dom specific timing errors in tests, we rely on
        // mutations
        const observer = new MutationObserver(async (mutationsList, obs) => {
            if (addedNodesContainsCompletionsMenu(mutationsList)) {
                obs.disconnect();
                resolve('');
            }
        });
        if (focusContainer) {
            observer.observe(focusContainer, config);
        }
        setTimeout(() => {
            observer.disconnect();
            resolve('');
        }, 10000);
    });
    const addedNodesContainsCompletionsMenu = (mutationsList) => mutationsList.some((mut) => Array.from(mut.addedNodes).some((node) => node.classList.contains('CodeMirror-hints')));
    const raf = async () => new Promise((r) => requestAnimationFrame(r));
    const pierce = async (...selectors) => {
        var _a;
        let node = document.body;
        for (const selector of selectors) {
            const result = ((_a = node.shadowRoot) !== null && _a !== void 0 ? _a : node).querySelector(selector);
            assert.instanceOf(result, Element);
            if (result.updateComplete) {
                await result.updateComplete;
            }
            node = result;
        }
        return node;
    };
    const waitForCompileDone = () => new Promise((resolve) => {
        project === null || project === void 0 ? void 0 : project.addEventListener('compileDone', async () => {
            resolve('');
        }, { once: true });
    });
    test('displays completion items on input', async () => {
        var _a, _b;
        await waitForCompileDone();
        editor === null || editor === void 0 ? void 0 : editor.focus();
        await emulateUser('document.query');
        await waitForCompletionsToAppear();
        await waitForElement(editor === null || editor === void 0 ? void 0 : editor.shadowRoot, '.CodeMirror-hints');
        const completionItemList = (_a = editor === null || editor === void 0 ? void 0 : editor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.CodeMirror-hints');
        if ((completionItemList === null || completionItemList === void 0 ? void 0 : completionItemList.children.length) !== 7) {
            // For debugging purposes, it's easier to debug if we know the invalid
            // completions
            console.log('Invalid completions: ');
            for (const listItem of (completionItemList === null || completionItemList === void 0 ? void 0 : completionItemList.children) || []) {
                console.log((_b = listItem === null || listItem === void 0 ? void 0 : listItem.querySelector('.hint-object-name')) === null || _b === void 0 ? void 0 : _b.innerText);
            }
        }
        assert.isNotNull(completionItemList);
        assert.isDefined(completionItemList);
        assert.equal(completionItemList === null || completionItemList === void 0 ? void 0 : completionItemList.children.length, 7, 'Completion item list length');
    });
    test('can navigate the completion item list', async () => {
        var _a;
        await waitForCompileDone();
        editor === null || editor === void 0 ? void 0 : editor.focus();
        await emulateUser('document.que');
        await waitForCompletionsToAppear();
        sendKeys({
            press: 'ArrowDown',
        });
        await waitForElement(editor === null || editor === void 0 ? void 0 : editor.shadowRoot, '.CodeMirror-hint-active#cm-complete-0-1');
        const activeHint = (_a = editor === null || editor === void 0 ? void 0 : editor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.CodeMirror-hint-active');
        assert.equal(activeHint === null || activeHint === void 0 ? void 0 : activeHint.id, 'cm-complete-0-1', 'Active hint should have the ID cm-complete-0-1 marking the second hint');
    });
    test('enter key confirms completion item selection', async () => {
        var _a;
        await waitForCompileDone();
        editor === null || editor === void 0 ? void 0 : editor.focus();
        await emulateUser('document.queryS');
        await waitForCompletionsToAppear();
        const editorChange = new Promise((resolve) => {
            editor === null || editor === void 0 ? void 0 : editor.addEventListener('change', () => {
                resolve('');
            });
            setTimeout(() => {
                resolve('');
            }, 10000);
        });
        sendKeys({
            press: 'Enter',
        });
        await editorChange;
        assert.equal(editor === null || editor === void 0 ? void 0 : editor.value, 'document.querySelector', 'Completion should be visible in the code editor');
        const completionItemList = (_a = editor === null || editor === void 0 ? void 0 : editor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.CodeMirror-hints');
        assert.isNull(completionItemList, 'Completion item list should disappear on completion confirmation');
    });
    test('completions should contain local scoped items', async () => {
        var _a;
        await waitForCompileDone();
        editor === null || editor === void 0 ? void 0 : editor.focus();
        await emulateUser(`function reallySpecificFunctionName() {
            console.log("foo");
        }`);
        await sendKeys({ press: 'Enter' });
        await emulateUser('reallySpecifi');
        const completionItemList = (_a = editor === null || editor === void 0 ? void 0 : editor.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.CodeMirror-hints');
        assert.isNotNull(completionItemList);
        const completionItemText = (completionItemList === null || completionItemList === void 0 ? void 0 : completionItemList.querySelector('.hint-object-name')).innerText;
        assert.equal(completionItemText, 'reallySpecificFunctionName', 'Completion item should be the created function');
    });
});
