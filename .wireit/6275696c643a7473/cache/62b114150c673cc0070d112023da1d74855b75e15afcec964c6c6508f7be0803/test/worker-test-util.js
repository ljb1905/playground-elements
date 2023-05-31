/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { assert } from '@esm-bundle/chai';
import { build } from '../typescript-worker/build.js';
import { executeServerCommand } from '@web/test-runner-commands';
export const configureFakeCdn = async (data) => {
    const { cdnBaseUrl, id } = (await executeServerCommand('set-fake-cdn-data', data));
    const deleteCdnData = async () => {
        await executeServerCommand('delete-fake-cdn-data', id);
    };
    return {
        cdnBaseUrl,
        deleteCdnData,
    };
};
export const checkTransform = async (files, expected, importMap = {}, cdnData = {}) => {
    const { cdnBaseUrl, deleteCdnData } = await configureFakeCdn(cdnData);
    try {
        const results = [];
        await new Promise((resolve) => {
            const emit = (result) => {
                if (result.kind === 'done') {
                    resolve();
                }
                else {
                    results.push(result);
                }
            };
            build(files, { importMap, cdnBaseUrl }, emit);
        });
        for (const result of results) {
            if (result.kind === 'diagnostic') {
                // Sometimes diagnostics contain a CDN URL to help with debugging
                // (usually the unpkg.com URL). But that will be a local dynamic URL in
                // testing, so we'll substitute a static string so that we can do a
                // simple equality test.
                while (result.diagnostic.message.includes(cdnBaseUrl)) {
                    result.diagnostic.message = result.diagnostic.message.replace(cdnBaseUrl, '<CDN-BASE-URL>/');
                }
            }
        }
        assert.deepEqual(results.sort(sortBuildOutput), expected.sort(sortBuildOutput));
    }
    finally {
        await deleteCdnData();
    }
};
const sortBuildOutput = (a, b) => {
    if (a.kind === 'file' && b.kind === 'file') {
        return a.file.name.localeCompare(b.file.name);
    }
    if (a.kind === 'diagnostic' && b.kind === 'diagnostic') {
        return a.diagnostic.message.localeCompare(b.diagnostic.message);
    }
    return a.kind.localeCompare(b.kind);
};
