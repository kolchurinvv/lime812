<script>
  import "material-dynamic-colors"
  import "beercss"
  import "@/theme/theme.scss"
  import "@/theme/global.sass"
  import Header from "./Header.svelte"
  import Footer from "./Footer.svelte"
</script>

<Header />
<slot />
<Footer />
