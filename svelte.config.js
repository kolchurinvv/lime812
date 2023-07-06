import adapter from "svelte-adapter-bun"
// import sveltePreprocess from "svelte-preprocess"
import preprocess from "svelte-preprocess"
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess()],

  kit: {
    adapter: adapter({
      dynamic_origin: true,
    }),
    alias: {
      "@/*": "./src/*",
      "@@/*": "./*",
    },
  },
}

export default config
