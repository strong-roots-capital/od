// rollup.config.js

import typescript from '@wessberg/rollup-plugin-ts';

export default {
    input: [
        'src/add.ts',
        'src/get.ts',
        'src/index.ts',
        'src/start-of.ts',
        'src/subtract.ts'
    ],
    output: [
        {
            dir: 'lib',
            format: 'cjs',
        },
        {
            dir: 'lib',
            format: 'esm',
            chunkFileNames: '[name]-[hash].[format].js',
            entryFileNames: '[name].[format].js'
        },
    ],
    plugins: [
        typescript()
    ]
};
