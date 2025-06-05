import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import postcssPresetEnv from "postcss-preset-env";
import postcssPxtorem from "postcss-pxtorem";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // 根据mode值加载对应的.env.**文件的环境变量
  // console.log("env", env);

  return {
    base: './',
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"), // __dirname : 当前文件所在的目录的绝对路径
      },
    },

    // define: 定义全局变量
    define: {
      APP_ENV: JSON.stringify(env.APP_ENV),
    },

    // 插件
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        // 自动导入Vue相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "vue-router", "pinia"],
        // 生成自动导入的TS声明文件
        dts: "./auto-imports.d.ts",
        // Element Plus的自动导入
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/assets/svgs")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          // 全局scss
          additionalData: `@use "@/assets/styles/common/variables.scss";`,
        },
      },

      // postcss配置：在编译时将CSS中的px转换为rem
      postcss: {
        plugins: [
          postcssPresetEnv({
            stage: 3,
            features: {
              "nesting-rules": true,
              "custom-media-queries": true,
            },
            browsers: "last 3 versions",
            autoprefixer: {
              grid: true,
            },
          }),
          postcssPxtorem({
            // 如果是移动端，通常会设置较大的rootValue（如 37.5 或 75）
            // 如果是PC端，通常使用16作为基准值
            rootValue: 16, // rootValue是PostCSS转换时的基准值，表示1rem===16px
            propList: ["*"], // 需要转换的属性，这里表示全部都进行转换
            selectorBlackList: [], // 过滤掉不需要转换的选择器
            minPixelValue: 2, // 最小px值
            exclude: /node_modules/i, // 排除node_modules目录
          }),
        ],
      },
    },

    // 服务
    server: {
      host: true,
      hmr: true,
      port: 8888,
      open: true,
      proxy: {
        "/api": {
          target: "http://47.113.177.51:53000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/"),
        },
      },
    },

    // 构建
    build: {
      outDir: "dist", // 打包输出目录名称
      minify: "esbuild", // esbuild 打包更快
      sourcemap: mode !== "production", // 是否显示源代码
      reportCompressedSize: false, // 禁用 gzip 压缩大小报告，可略微减少打包时间
      chunkSizeWarningLimit: 2000, // 规定触发警告的 chunk 大小
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",

          manualChunks(id: string) {
            // console.log("id", id);
            // 1、第三方库较少时，将第三方库打包成一个单独的文件
            if (
              id.includes("node_modules") &&
              (id.endsWith(".js") || id.endsWith(".ts"))
            ) {
              return "vendor";
            }
            // 2、项目中使用第三方库较多时，将第三方库按功能分组打包
            // if (id.includes("node_modules")) {
            //   if (id.includes("element-plus")) {
            //     return "vendor-element-plus";
            //   } else if (id.includes("vue")) {
            //     return "vendor-vue";
            //   } else if (id.includes("@vue")) {
            //     return "vendor-vue-related";
            //   } else if (id.includes("axios") || id.includes("lodash")) {
            //     return "vendor-utils";
            //   } else {
            //     return "vendor-others";
            //   }
            // }
          },
        },
      },
    },
  };
});
