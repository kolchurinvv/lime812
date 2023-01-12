<script>
  // import "beercss"
  // import "material-dynamic-colors"
  import "@/theme/theme.scss"
  import "@/theme/global.sass"
  import Header from "$lib/common/Header.svelte"
  import Footer from "$lib/common/Footer.svelte"
</script>

<Header />
<main id="app-content">
  <slot />
</main>
<Footer />
