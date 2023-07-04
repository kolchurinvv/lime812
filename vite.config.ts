import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig, loadEnv, type UserConfig } from "vite"
const config = defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""))
  return {
    envDir: "/",
    plugins: [sveltekit()],
    server: {
      fs: {
        strict: false,
      },
    },
    ssr: {
      noExternal: ["beercss"],
    },
  } as UserConfig
})

export default config
