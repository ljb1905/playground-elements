/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { expose } from 'comlink';
import { build } from './build.js';
import { getCompletionItemDetails, queryCompletions } from './completions.js';
const workerAPI = {
    compileProject: build,
    getCompletions: queryCompletions,
    getCompletionItemDetails: getCompletionItemDetails,
};
expose(workerAPI);
