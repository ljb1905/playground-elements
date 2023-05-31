/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { LanguageServiceContext } from './language-service-context.js';
import { CachingCdn } from './caching-cdn.js';
import { ImportMapResolver } from './import-map-resolver.js';
let workerContext;
let cacheKey = '';
/**
 * Acquire the existing worker instance, or create a fresh one if missing.
 * If the config differs from the existing instance's config, a new WorkerContext is
 * instantiated and made the new instance.
 */
export function getWorkerContext(config) {
    const configCacheKey = JSON.stringify(config);
    if (workerContext && cacheKey === configCacheKey) {
        return workerContext;
    }
    cacheKey = configCacheKey;
    workerContext = new WorkerContext(config);
    return workerContext;
}
export class WorkerContext {
    constructor(config) {
        var _a;
        this.importMapResolver = new ImportMapResolver(config.importMap);
        this.cdn = new CachingCdn((_a = config.cdnBaseUrl) !== null && _a !== void 0 ? _a : 'https://unpkg.com/');
        this.languageServiceContext = new LanguageServiceContext();
    }
}
