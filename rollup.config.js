// rollup.config.js

import typescript from '@rollup/plugin-typescript';

export default {
    input: [
        'src/index.ts',
        'src/add.ts',
        'src/subtract.ts',
        'src/get.ts'
    ],
    output: {
        dir: 'dist',
        format: 'cjs'
    },
    plugins: [
        typescript()
    ]
};
