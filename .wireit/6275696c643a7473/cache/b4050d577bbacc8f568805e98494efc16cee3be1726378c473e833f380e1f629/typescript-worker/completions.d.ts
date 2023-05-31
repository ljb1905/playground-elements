/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { CompletionInfo, WithMetadata } from 'typescript';
import { EditorCompletionDetails, WorkerConfig } from '../shared/worker-api.js';
/**
 * Query completions from the Language Service, and sort them by
 * relevance for user to use.
 */
export declare const queryCompletions: (filename: string, fileContent: string, tokenUnderCursor: string, cursorIndex: number, config: WorkerConfig) => Promise<WithMetadata<CompletionInfo> | undefined>;
/**
 * Acquire extra information on the hovered completion item.
 * This includes some package info, context and signatures.
 *
 * This is done separate from acquiring completions, since it's slower, and
 * is done on a per completion basis.
 */
export declare const getCompletionItemDetails: (filename: string, cursorIndex: number, config: WorkerConfig, completionWord: string) => Promise<EditorCompletionDetails>;
//# sourceMappingURL=completions.d.ts.map