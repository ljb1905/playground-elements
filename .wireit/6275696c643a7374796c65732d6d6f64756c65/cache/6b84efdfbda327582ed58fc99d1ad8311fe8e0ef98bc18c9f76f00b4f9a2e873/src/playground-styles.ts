import { css } from 'lit';

const styles = css`/**
 * This file is derived from \`code-mirror/lib/codemirror.css\`, modified in the
 * following ways:
 *
 * - CSS custom properties added.
 * - Rules for unused features and addons removed.
 * - Unnecessary vendor prefixes removed.
 * - \`.cm-s-default\` class selectors removed.
 * - Empty rules removed.
 */

/* BASICS */

.CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: var(--playground-code-font-family, monospace);
  font-size: var(--playground-code-font-size, 14px);
  padding: var(--playground-code-padding, 0);
  height: 350px;
  color: var(--playground-code-default-color, #000);
  background: var(--playground-code-background, #fff);
  direction: ltr;
  /* CodeMirror uses z-indexes up to 6 to e.g. place scrollbars above the code
     area. However, this can create undesirable stacking effects with the rest
     of the page. Force a new stacking context. */
  isolation: isolate;
  line-height: var(--playground-code-line-height, 1.4em);
}

/* PADDING */

.CodeMirror-lines {
  padding: 4px 0; /* Vertical padding around content */
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  padding: var(
    --playground-code-line-padding,
    0 4px
  ); /* Horizontal padding of content */
}

.CodeMirror-scrollbar-filler,
.CodeMirror-gutter-filler {
  background: var(
    --playground-code-background,
    #fff
  ); /* The little square between H and V scrollbars */
}

/* GUTTER */

.CodeMirror-gutters {
  border-right: var(--playground-code-gutter-border-right, none);
  background: var(
    --playground-code-gutter-background,
    var(--playground-code-background, #fff)
  );
  box-shadow: var(--playground-code-gutter-box-shadow, none);
  white-space: nowrap;
}
.CodeMirror-linenumber {
  padding: 0 3px 0 5px;
  min-width: 20px;
  text-align: right;
  color: var(--playground-code-linenumber-color, #767676);
  white-space: nowrap;
  margin-right: 1em;
}
.CodeMirror-code > div > .CodeMirror-line {
  /* Some extra room between the line number gutter and the line */
  padding-left: 0.7em;
}

/* CURSOR */

.CodeMirror-cursor {
  border-left: 2px solid
    var(
      --playground-code-cursor-color,
      var(--playground-code-default-color, #000)
    );
  border-right: none;
  width: 0;
}

@keyframes blink {
  0% {
  }
  50% {
    background: transparent;
  }
  100% {
  }
}

/* DEFAULT THEME */

.cm-header,
.cm-strong {
  font-weight: bold;
}
.cm-em {
  font-style: italic;
}
.cm-link {
  text-decoration: underline;
}
.cm-strikethrough {
  text-decoration: line-through;
}

.cm-keyword {
  color: var(--playground-code-keyword-color, #708);
}
.cm-atom {
  color: var(--playground-code-atom-color, #219);
}
.cm-number {
  color: var(--playground-code-number-color, #164);
}
.cm-def {
  color: var(--playground-code-def-color, #00f);
}
.cm-variable {
  color: var(--playground-code-variable-color, #000);
}
.cm-property {
  color: var(--playground-code-property-color, #000);
}
.cm-operator {
  color: var(--playground-code-operator-color, #000);
}
.cm-variable-2 {
  color: var(--playground-code-variable-2-color, #05a);
}
.cm-variable-3 {
  color: var(--playground-code-variable-3-color, #085);
}
.cm-type {
  color: var(--playground-code-type-color, #085);
}
.cm-comment {
  color: var(--playground-code-comment-color, #a50);
}
.cm-string {
  color: var(--playground-code-string-color, #a11);
}
.cm-string-2 {
  color: var(--playground-code-string-2-color, #f50);
}
.cm-meta {
  color: var(--playground-code-meta-color, #555);
}
.cm-qualifier {
  color: var(--playground-code-qualifier-color, #555);
}
.cm-builtin {
  color: var(--playground-code-builtin-color, #30a);
}
.cm-tag {
  color: var(--playground-code-tag-color, #170);
}
.cm-attribute {
  color: var(--playground-code-attribute-color, #00c);
}
.cm-callee {
  color: var(--playground-code-callee-color, #000);
}

.CodeMirror-composing {
  border-bottom: 2px solid;
}

/* STOP */

/* The rest of this file contains styles related to the mechanics of
   the editor. You probably shouldn't touch them. */

.CodeMirror {
  position: relative;
  overflow: hidden;
}

.CodeMirror-scroll {
  overflow: scroll !important; /* Things will break if this is overridden */
  /* 50px is the magic margin used to hide the element's real scrollbars */
  /* See overflow: hidden in .CodeMirror */
  margin-bottom: -50px;
  margin-right: -50px;
  padding-bottom: 50px;
  height: 100%;
  outline: none; /* Prevent dragging from highlighting the element */
  position: relative;
}
.CodeMirror-sizer {
  position: relative;
  border-right: 50px solid transparent;
}

/* The fake, visible scrollbars. Used to force redraw during scrolling
   before actual scrolling happens, thus preventing shaking and
   flickering artifacts. */
.CodeMirror-vscrollbar,
.CodeMirror-hscrollbar,
.CodeMirror-scrollbar-filler,
.CodeMirror-gutter-filler {
  position: absolute;
  z-index: 6;
  display: none;
  outline: none;
}
.CodeMirror-vscrollbar {
  right: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.CodeMirror-hscrollbar {
  bottom: 0;
  left: 0;
  overflow-y: hidden;
  overflow-x: scroll;
}
.CodeMirror-scrollbar-filler {
  right: 0;
  bottom: 0;
}
.CodeMirror-gutter-filler {
  left: 0;
  bottom: 0;
}

.CodeMirror-gutters {
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100%;
  z-index: 3;
}
.CodeMirror-gutter {
  white-space: normal;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  margin-bottom: -50px;
}
.CodeMirror-gutter-wrapper {
  position: absolute;
  z-index: 4;
  background: none !important;
  border: none !important;
}
.CodeMirror-gutter-background {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 4;
}
.CodeMirror-gutter-elt {
  position: absolute;
  cursor: default;
  z-index: 4;
}
.CodeMirror-gutter-wrapper ::selection {
  background: transparent;
}

.CodeMirror-lines {
  cursor: text;
  min-height: 1px; /* prevents collapsing before first draw */
}
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  /* Reset some styles that the rest of the page might have set */
  border-radius: 0;
  border-width: 0;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  margin: 0;
  white-space: pre;
  word-wrap: normal;
  line-height: inherit;
  color: inherit;
  z-index: 2;
  position: relative;
  overflow: visible;
  -webkit-tap-highlight-color: transparent;
  font-variant-ligatures: contextual;
}
.CodeMirror-wrap pre.CodeMirror-line,
.CodeMirror-wrap pre.CodeMirror-line-like {
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: normal;
}

.CodeMirror-linebackground {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
}

.CodeMirror-linewidget {
  position: relative;
  z-index: 2;
  padding: 0.1px; /* Force widget margins to stay inside of the container */
}

.CodeMirror-rtl pre {
  direction: rtl;
}

.CodeMirror-code {
  outline: none;
}

/* Force content-box sizing for the elements where we expect it */
.CodeMirror-scroll,
.CodeMirror-sizer,
.CodeMirror-gutter,
.CodeMirror-gutters,
.CodeMirror-linenumber {
  box-sizing: content-box;
}

.CodeMirror-measure {
  position: absolute;
  width: 100%;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.CodeMirror-cursor {
  position: absolute;
  pointer-events: none;
}
.CodeMirror-measure pre {
  position: static;
}

div.CodeMirror-cursors {
  visibility: hidden;
  position: relative;
  z-index: 3;
}
div.CodeMirror-dragcursors {
  visibility: visible;
}

.CodeMirror-focused div.CodeMirror-cursors {
  visibility: visible;
}

.CodeMirror-selected {
  background: var(--playground-code-selection-background, #d7d4f0);
}
.CodeMirror-focused .CodeMirror-selected {
  background: var(--playground-code-selection-background, #d7d4f0);
}
.CodeMirror-crosshair {
  cursor: crosshair;
}
.CodeMirror-line::selection,
.CodeMirror-line > span::selection,
.CodeMirror-line > span > span::selection {
  background: var(--playground-code-selection-background, #d7d4f0);
}

/* Completions */

.CodeMirror-hints {
  position: absolute;
  z-index: 10;
  overflow: hidden;
  list-style: none;

  margin: 0;
  padding: 0;

  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px -3px,
    rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
  border: 1px solid var(--playground-code-selection-background, silver);

  background: var(--playground-code-background, white);
  font-size: var(--playground-code-font-size, 14px);
  font-family: var(--playground-code-font-family, monospace);

  max-height: 20em;
  width: 600px;
  max-width: min(600px, 80vw);
  overflow-y: auto;
}

.CodeMirror-hint {
  margin: 0;
  padding: 0 6px;
  white-space: pre;
  color: var(--playground-code-cursor-color, black);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

@media (pointer: coarse) {
  .CodeMirror-hint {
    padding: 1em 6px;
  }
}

.CodeMirror-hint-active {
  background: var(--playground-code-background, rgba(0, 0, 0, 0.2));
  filter: brightness(1.2);
}

.CodeMirror-hint mark {
  background: inherit;
  color: var(--playground-code-qualifier-color, #555);
}

.CodeMirror-hint .hint-object-name {
  padding-right: 2em;
  white-space: nowrap;
}

.CodeMirror-hint .hint-object-details {
  flex-basis: 80%;
  font-size: calc(var(--playground-code-font-size, 14px) * 0.9);
  color: var(--playground-code-string-2-color, white);
  opacity: 0.8;
  text-align: right;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Used to force a border model for a node */
.cm-force-border {
  padding-right: 0.1px;
}

@media print {
  /* Hide the cursor when printing */
  .CodeMirror div.CodeMirror-cursors {
    visibility: hidden;
  }
}

/* See issue #2901 */
.cm-tab-wrap-hack:after {
  content: '';
}

/* Help users use markselection to safely style text background */
span.CodeMirror-selectedtext {
  background: none;
}
`;

export { styles as default, styles };
