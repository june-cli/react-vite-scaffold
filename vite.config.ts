import path from 'path'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import styleImport from 'vite-plugin-style-import'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // 参考：https://github.com/vitejs/vite/issues/1930#issuecomment-778595832
  dotenv.config({ path: `.env.${mode}` })

  console.log('BUILD_ENV: ', process.env.BUILD_ENV)

  const isEnvTest = process.env.BUILD_ENV === 'test'
  const isEnvAnalyze = process.env.NODE_ENV === 'analyze'

  return defineConfig({
    base: process.env.PUBLIC_URL,
    plugins: [
      reactRefresh(),
      styleImport({
        libs: [
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: name => `antd/es/${name}/style`,
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      open: true,
      proxy: {},
    },
    build: {
      sourcemap: isEnvTest,
      // Code Splitting
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (/node_modules\/(react|react-dom)\//.test(id)) {
                return 'react'
              }
              if (/node_modules\/antd\//.test(id)) {
                return 'antd'
              }
              return 'vendor'
            }
          },
        },
        plugins: [
          isEnvAnalyze &&
            visualizer({
              filename: './node_modules/.cache/visualizer/stats.html',
              open: true,
              gzipSize: true,
              brotliSize: true,
            }),
        ].filter(Boolean),
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  })
}
