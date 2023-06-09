<script>
  import "@/theme/theme.scss"
  import "@/theme/global.sass"
  import Header from "$lib/common/Header.svelte"
  import Footer from "$lib/common/Footer.svelte"
  import { onMount } from "svelte"
  import { mode } from "$lib/store/ui"
  // TODO figure out how to import these
  // import "beercss"
  // import "material-dynamic-colors"

  onMount(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
    if (darkThemeMq.matches) {
      //@ts-ignore
      ui("mode", "dark")
      mode.set(true)
    } else {
      //@ts-ignore
      ui("mode", "light")
      mode.set(false)
    }
  })
</script>

<Header />
<main id="app-content" class="main-container">
  <slot />
</main>
<Footer />
