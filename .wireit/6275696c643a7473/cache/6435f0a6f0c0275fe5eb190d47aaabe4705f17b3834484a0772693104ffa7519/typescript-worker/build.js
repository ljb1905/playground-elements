/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { BareModuleTransformer } from './bare-module-transformer.js';
import { getWorkerContext } from './worker-context.js';
import { processTypeScriptFiles } from './typescript-builder.js';
export const build = async (files, config, emit) => {
    const workerContext = getWorkerContext(config);
    const bareModuleBuilder = new BareModuleTransformer(workerContext.cdn, workerContext.importMapResolver);
    const results = bareModuleBuilder.process(processTypeScriptFiles(workerContext, files.map((file) => ({ kind: 'file', file }))));
    for await (const result of results) {
        emit(result);
    }
    emit({ kind: 'done' });
};
