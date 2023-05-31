/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * This kinda turned into something like storybook.js and similar. Maybe we
 * should just use another library.
 */
import { themeNames } from './themes.js';
import { tokens } from './highlight-tokens.js';
function checkbox(def) {
    return { type: 'checkbox', ...def };
}
function slider(def) {
    return { type: 'slider', ...def };
}
function color(def) {
    return { type: 'color', ...def };
}
function select(def) {
    return { type: 'select', ...def };
}
const pixels = (value) => value + 'px';
export const knobs = [
    // code style
    select({
        id: 'theme',
        label: 'Theme',
        section: 'code',
        options: ['default', ...themeNames],
        default: 'default',
    }),
    slider({
        id: 'fontSize',
        label: 'Font size',
        section: 'code',
        cssProperty: '--playground-code-font-size',
        formatCss: pixels,
        min: 1,
        max: 30,
        default: 14,
    }),
    select({
        id: 'fontFamily',
        label: 'Font',
        section: 'code',
        cssProperty: '--playground-code-font-family',
        options: ['monospace', 'Roboto Mono', 'Source Code Pro', 'Ubuntu Mono'],
        formatCss: (value) => {
            if (value !== 'monospace') {
                return `${value}, monospace`;
            }
            return value;
        },
        default: 'monospace',
    }),
    ...tokens.map((token) => {
        const { id, label, cssProperty, defaultValue } = token;
        return color({
            id,
            label,
            cssProperty,
            default: defaultValue,
            originalDefault: defaultValue,
            section: 'code',
        });
    }),
    // features
    checkbox({
        id: 'resizable',
        label: 'Resizable',
        section: 'features',
        default: false,
        htmlAttribute: 'resizable',
    }),
    checkbox({
        id: 'editableFileSystem',
        label: 'Editable filesystem',
        section: 'features',
        default: false,
        htmlAttribute: 'editable-file-system',
    }),
    checkbox({
        id: 'lineNumbers',
        label: 'Line numbers',
        section: 'features',
        default: false,
        htmlAttribute: 'line-numbers',
    }),
    checkbox({
        id: 'lineWrapping',
        label: 'Line wrapping',
        section: 'features',
        default: false,
        htmlAttribute: 'line-wrapping',
    }),
    checkbox({
        id: 'noCompletions',
        label: 'No completions',
        section: 'features',
        default: false,
        htmlAttribute: 'no-completions',
    }),
    // general appearance
    color({
        id: 'highlight',
        label: 'Highlight',
        cssProperty: '--playground-highlight-color',
        default: '#6200ee',
        section: 'general appearance',
    }),
    color({
        id: 'pageBackground',
        label: 'Page background',
        default: '#cccccc',
        originalDefault: '#cccccc',
        section: 'general appearance',
    }),
    slider({
        id: 'radius',
        label: 'Radius',
        cssProperty: 'border-radius',
        formatCss: pixels,
        min: 0,
        max: 30,
        default: 0,
        section: 'general appearance',
    }),
    checkbox({
        id: 'borders',
        label: 'Borders',
        cssProperty: '--playground-border',
        formatCss: (value) => value ? '1px solid #ddd' : 'none',
        default: true,
        section: 'general appearance',
    }),
    // tab bar
    color({
        id: 'tabBarBackground',
        label: 'Background',
        cssProperty: '--playground-tab-bar-background',
        default: '#eaeaea',
        section: 'tab bar',
    }),
    color({
        id: 'tabBarForeground',
        label: 'Foreground',
        cssProperty: '--playground-tab-bar-foreground-color',
        default: '#000000',
        section: 'tab bar',
    }),
    slider({
        id: 'barHeight',
        label: 'Bar height',
        cssProperty: '--playground-bar-height',
        formatCss: pixels,
        min: 10,
        max: 100,
        default: 40,
        section: 'tab bar',
    }),
    // preview
    color({
        id: 'previewToolbarBackground',
        label: 'Background',
        cssProperty: '--playground-preview-toolbar-background',
        default: '#ffffff',
        section: 'preview',
    }),
    color({
        id: 'previewToolbarForeground',
        label: 'Foreground',
        cssProperty: '--playground-preview-toolbar-foreground-color',
        default: '#444444',
        section: 'preview',
    }),
    slider({
        id: 'previewWidth',
        label: 'Preview width',
        cssProperty: '--playground-preview-width',
        formatCss: (val) => `${val}%`,
        min: 0,
        max: 100,
        default: 30,
        section: 'preview',
    }),
];
export const knobsById = {};
export const knobsBySection = {};
for (const knob of knobs) {
    // Cast to an arbitrary specific Knob type here because TypeScript isn't quite
    // clever enough to know that the id will match the type.
    knobsById[knob.id] = knob;
    let catArr = knobsBySection[knob.section];
    if (catArr === undefined) {
        catArr = knobsBySection[knob.section] = [];
    }
    catArr.push(knob);
}
export const knobIds = Object.keys(knobsById);
export const knobSectionNames = Object.keys(knobsBySection);
export class KnobValues {
    constructor() {
        this.values = new Map();
    }
    getValue(id) {
        if (this.values.has(id)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return this.values.get(id);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return knobsById[id].default;
    }
    setValue(id, value) {
        this.values.set(id, value);
    }
}
