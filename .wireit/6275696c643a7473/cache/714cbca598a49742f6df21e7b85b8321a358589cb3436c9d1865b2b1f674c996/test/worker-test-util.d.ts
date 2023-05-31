/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { BuildOutput, ModuleImportMap, SampleFile } from '../shared/worker-api.js';
import { CdnData } from './fake-cdn-plugin.js';
export declare const configureFakeCdn: (data: CdnData) => Promise<{
    cdnBaseUrl: string;
    deleteCdnData: () => Promise<void>;
}>;
export declare const checkTransform: (files: SampleFile[], expected: BuildOutput[], importMap?: ModuleImportMap, cdnData?: CdnData) => Promise<void>;
//# sourceMappingURL=worker-test-util.d.ts.map