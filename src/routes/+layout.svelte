<script lang="ts">
  import "@/theme/theme.scss"
  import "@/theme/global.sass"
  import Header from "$lib/common/Header.svelte"
  import Footer from "$lib/common/Footer.svelte"
  import { onMount } from "svelte"
  import { mode } from "$lib/store/ui"
  import { page } from "$app/stores"
  import "material-dynamic-colors"

  $: routeId = String($page.route.id).toString()
  const routeMap: { [key: string]: string } = {
    null: "Главная",
    "/": "Главная",
    "/about": "О компании",
    "/promos": "Акции",
    "/contacts": "Контакты",
    "/catalog": "Прайс",
  }

  onMount(() => {
    // ! ui() comes from beercss which is imported via cdn in app.html
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

<svelte:head>
  <title>{routeMap[routeId]} | Lime812</title>
  <meta
    name="keywords"
    content="Профлист,
            Купить профлист,
            Гвоздь дюбель,
            Водосточка,
            Купить снегозадержатели,
            Водосточка ПВХ,
            Металлический водосток,
            Защита кровли,
            Профлист оцинкованный,
            Натуральный гранит,
            Столешница из гранита,
            Еврошифер" />
</svelte:head>

<Header />
<main id="app-content" class="main-container">
  <slot />
</main>
<Footer />
