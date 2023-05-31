/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { LanguageServiceContext } from './language-service-context.js';
import { CachingCdn } from './caching-cdn.js';
import { ImportMapResolver } from './import-map-resolver.js';
import { WorkerConfig } from '../shared/worker-api.js';
/**
 * Acquire the existing worker instance, or create a fresh one if missing.
 * If the config differs from the existing instance's config, a new WorkerContext is
 * instantiated and made the new instance.
 */
export declare function getWorkerContext(config: WorkerConfig): WorkerContext;
export declare class WorkerContext {
    readonly cdn: CachingCdn;
    readonly importMapResolver: ImportMapResolver;
    readonly languageServiceContext: LanguageServiceContext;
    constructor(config: WorkerConfig);
}
//# sourceMappingURL=worker-context.d.ts.map