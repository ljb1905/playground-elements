/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
interface BaseKnob<Id extends string, T> {
    id: Id;
    label: string;
    section: string;
    default: T;
    cssProperty?: string;
    formatCss?: (value: T) => string;
    htmlAttribute?: string;
}
interface CheckboxKnob<Id extends string> extends BaseKnob<Id, boolean> {
    type: 'checkbox';
}
interface SliderKnob<Id extends string> extends BaseKnob<Id, number> {
    type: 'slider';
    min: number;
    max: number;
}
interface ColorKnob<Id extends string> extends BaseKnob<Id, string> {
    type: 'color';
    unsetLabel?: string;
    originalDefault?: string;
}
interface SelectKnob<Id extends string, T extends string> extends BaseKnob<Id, T> {
    type: 'select';
    options: ReadonlyArray<T>;
}
export declare const knobs: readonly [SelectKnob<"theme", "3024-day" | "3024-night" | "abbott" | "abcdef" | "ambiance" | "ayu-dark" | "ayu-mirage" | "base16-dark" | "base16-light" | "bespin" | "blackboard" | "cobalt" | "colorforth" | "darcula" | "dracula" | "duotone-dark" | "duotone-light" | "eclipse" | "elegant" | "erlang-dark" | "gruvbox-dark" | "hopscotch" | "icecoder" | "idea" | "isotope" | "juejin" | "lesser-dark" | "liquibyte" | "lucario" | "material-darker" | "material-ocean" | "material-palenight" | "material" | "mbo" | "mdn-like" | "midnight" | "monokai" | "moxer" | "neat" | "neo" | "night" | "nord" | "oceanic-next" | "panda-syntax" | "paraiso-dark" | "paraiso-light" | "pastel-on-dark" | "railscasts" | "rubyblue" | "seti" | "shadowfox" | "solarized" | "ssms" | "the-matrix" | "tomorrow-night-bright" | "tomorrow-night-eighties" | "ttcn" | "twilight" | "vibrant-ink" | "xq-dark" | "xq-light" | "yeti" | "yonce" | "zenburn" | "default">, SliderKnob<"fontSize">, SelectKnob<"fontFamily", "monospace" | "Roboto Mono" | "Source Code Pro" | "Ubuntu Mono">, ...ColorKnob<"codeBackground" | "synDefault" | "synKeyword" | "synAtom" | "synNumber" | "synDef" | "synVariable" | "synProperty" | "synOperator" | "synVariable2" | "synVariable3" | "synType" | "synComment" | "synString" | "synString2" | "synMeta" | "synQualifier" | "synBuiltin" | "synTag" | "synAttribute" | "synCallee">[], CheckboxKnob<"resizable">, CheckboxKnob<"editableFileSystem">, CheckboxKnob<"lineNumbers">, CheckboxKnob<"lineWrapping">, CheckboxKnob<"noCompletions">, ColorKnob<"highlight">, ColorKnob<"pageBackground">, SliderKnob<"radius">, CheckboxKnob<"borders">, ColorKnob<"tabBarBackground">, ColorKnob<"tabBarForeground">, SliderKnob<"barHeight">, ColorKnob<"previewToolbarBackground">, ColorKnob<"previewToolbarForeground">, SliderKnob<"previewWidth">];
export declare type Knob = typeof knobs[number];
export declare type KnobId = Knob['id'];
declare type KnobsById = {
    [K in Knob as K['id']]: K;
};
export declare const knobsById: KnobsById;
export declare const knobsBySection: {
    [section: string]: (SelectKnob<"theme", "3024-day" | "3024-night" | "abbott" | "abcdef" | "ambiance" | "ayu-dark" | "ayu-mirage" | "base16-dark" | "base16-light" | "bespin" | "blackboard" | "cobalt" | "colorforth" | "darcula" | "dracula" | "duotone-dark" | "duotone-light" | "eclipse" | "elegant" | "erlang-dark" | "gruvbox-dark" | "hopscotch" | "icecoder" | "idea" | "isotope" | "juejin" | "lesser-dark" | "liquibyte" | "lucario" | "material-darker" | "material-ocean" | "material-palenight" | "material" | "mbo" | "mdn-like" | "midnight" | "monokai" | "moxer" | "neat" | "neo" | "night" | "nord" | "oceanic-next" | "panda-syntax" | "paraiso-dark" | "paraiso-light" | "pastel-on-dark" | "railscasts" | "rubyblue" | "seti" | "shadowfox" | "solarized" | "ssms" | "the-matrix" | "tomorrow-night-bright" | "tomorrow-night-eighties" | "ttcn" | "twilight" | "vibrant-ink" | "xq-dark" | "xq-light" | "yeti" | "yonce" | "zenburn" | "default"> | SliderKnob<"fontSize"> | SelectKnob<"fontFamily", "monospace" | "Roboto Mono" | "Source Code Pro" | "Ubuntu Mono"> | ColorKnob<"codeBackground" | "synDefault" | "synKeyword" | "synAtom" | "synNumber" | "synDef" | "synVariable" | "synProperty" | "synOperator" | "synVariable2" | "synVariable3" | "synType" | "synComment" | "synString" | "synString2" | "synMeta" | "synQualifier" | "synBuiltin" | "synTag" | "synAttribute" | "synCallee"> | CheckboxKnob<"resizable"> | CheckboxKnob<"editableFileSystem"> | CheckboxKnob<"lineNumbers"> | CheckboxKnob<"lineWrapping"> | CheckboxKnob<"noCompletions"> | ColorKnob<"highlight"> | ColorKnob<"pageBackground"> | SliderKnob<"radius"> | CheckboxKnob<"borders"> | ColorKnob<"tabBarBackground"> | ColorKnob<"tabBarForeground"> | SliderKnob<"barHeight"> | ColorKnob<"previewToolbarBackground"> | ColorKnob<"previewToolbarForeground"> | SliderKnob<"previewWidth">)[];
};
export declare const knobIds: ("lineNumbers" | "lineWrapping" | "noCompletions" | "theme" | "editableFileSystem" | "resizable" | "codeBackground" | "synDefault" | "synKeyword" | "synAtom" | "synNumber" | "synDef" | "synVariable" | "synProperty" | "synOperator" | "synVariable2" | "synVariable3" | "synType" | "synComment" | "synString" | "synString2" | "synMeta" | "synQualifier" | "synBuiltin" | "synTag" | "synAttribute" | "synCallee" | "fontSize" | "fontFamily" | "highlight" | "pageBackground" | "radius" | "borders" | "tabBarBackground" | "tabBarForeground" | "barHeight" | "previewToolbarBackground" | "previewToolbarForeground" | "previewWidth")[];
export declare const knobSectionNames: string[];
export declare type KnobsOfType<T extends Knob['type']> = Exclude<{
    [K in Knob as K['id']]: K extends {
        type: T;
    } ? K : never;
}[KnobId], never>;
export declare type KnobValueType<T extends KnobId> = KnobsById[T]['default'];
export declare class KnobValues {
    private values;
    getValue<T extends KnobId>(id: T): KnobValueType<T>;
    setValue<T extends KnobId>(id: T, value: KnobValueType<T>): void;
}
export {};
//# sourceMappingURL=knobs.d.ts.map