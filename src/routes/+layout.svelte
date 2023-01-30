<script>
  // import "beercss"
  // import "material-dynamic-colors"
  import "@/theme/theme.scss"
  import "@/theme/global.sass"
  import Header from "$lib/common/Header.svelte"
  import Footer from "$lib/common/Footer.svelte"
  import { onMount } from "svelte"

  onMount(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
    if (darkThemeMq.matches) {
      //@ts-ignore
      ui("mode", "dark")
    } else {
      //@ts-ignore
      ui("mode", "light")
    }
  })
</script>

<Header />
<main id="app-content">
  <slot />
</main>
<Footer />
