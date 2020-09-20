import typescript from '@wessberg/rollup-plugin-ts'
import { terser } from 'rollup-plugin-terser'
import cleanup from 'rollup-plugin-cleanup'

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
            chunkFileNames: '[name]-[hash].[format].js',
            entryFileNames: '[name].[format].js'
        },
        {
            dir: 'lib',
            format: 'esm',
            chunkFileNames: '[name]-[hash].[format].js',
            entryFileNames: '[name].[format].js'
        },
    ],
    plugins: [
        typescript(),
        terser(),
        cleanup({comments: 'none'})
    ],
};
