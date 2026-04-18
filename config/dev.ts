import type { UserConfigExport } from "@tarojs/cli";
export default {

  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
} satisfies UserConfigExport<'vite'>
