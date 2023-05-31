/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { TestRunnerPlugin } from '@web/test-runner-core/dist/server/TestRunnerPlugin.js';
/**
 * A plugin for @web/test-runner that simulates an NPM CDN like unpkg.com. It
 * extends the built-in @web/test-runner server, and can be re-configured from
 * the test suite itself between each test using a server command
 * (https://modern-web.dev/docs/test-runner/commands/).
 *
 * Usage:
 *
 *    import {executeServerCommand} from '@web/test-runner-commands';
 *
 *    const cdnData = {
 *      "foo": {
 *        "versions": {
 *          "1.2.3": {
 *            "files": {
 *              "package.json": {
 *                "content": `{
 *                  "main": "lib/index.js"
 *                }`
 *              },
 *              "lib/index.js": {
 *                "content": "console.log('hello');"
 *              },
 *            }
 *          }
 *        }
 *      }
 *    };
 *    const {cdnBaseUrl, id} = await executeServerCommand('set-fake-cdn-data', cdnData);
 *    // Redirects to <cdnBaseUrl>/foo@1.2.3/lib/index.js and serves its content.
 *    const result = await fetch(new URL("foo@^1.0.0", cdnBaseUrl).href);
 *    await executeServerCommand('delete-fake-cdn-data', id);
 */
export declare function fakeCdnPlugin(): TestRunnerPlugin;
export declare type CdnData = {
    [pkg: string]: {
        versions: {
            [version: string]: {
                files: {
                    [path: string]: {
                        content: string;
                        status?: number;
                    };
                };
            };
        };
    };
};
//# sourceMappingURL=fake-cdn-plugin.d.ts.map