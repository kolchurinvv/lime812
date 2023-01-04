import { sveltekit } from "@sveltejs/kit/vite"
// import type { UserConfig } from "vite"
import { defineConfig, loadEnv } from "vite"
import path from "path"
// TODO create a plugin that hooks into HMR to regenerate the theme when change is detected

const config = defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""))
  return {
    envDir: "/",
    plugins: [sveltekit()],
    build: {
      // generate manifest.json in outDir
      manifest: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})

// const config: UserConfig = {
// plugins: [sveltekit()],
// }

export default config
