<script lang="ts">
  import { page } from "$app/stores"
  import { mode } from "$lib/store/ui"
  import Logo from "@/lib/common/logo.svelte"

  const modeToggle = () => {
    const newMode = ui("mode") == "dark" ? "light" : "dark"
    mode.set(newMode === "dark")
    ui("mode", newMode)
  }
</script>

<header class="small-padding">
  <nav class="">
    <a href="/">
      <Logo style={{ style: "width: 160px" }} />
    </a>
    <div class="max" />
    <!-- <a style="text-s" href="tel:8-800-700-4332">8-800-700-4332</a> -->
    <a class:active={$page.route.id === "/"} href="/">
      <button class="transparent upper extra small-elevate">Главная</button>
    </a>
    <a class:active={$page.route.id === "/about"} href="/about">
      <button class="transparent upper extra small-elevate">О компании</button>
    </a>
    <a class:active={$page.route.id === "/promos"} href="/promos">
      <button class="transparent upper extra small-elevate">акции</button>
    </a>
    <a class:active={$page.route.id === "/contacts"} href="/contacts">
      <button class="transparent upper extra small-elevate">контакты</button>
    </a>
    <a class:active={$page.route.id === "/catalog"} href="/catalog">
      <button class=" border upper extra small-elevate y-border">прайс</button>
    </a>
    <button on:click={modeToggle} class="circle transparent">
      <i>light_mode</i>
    </button>
  </nav>
</header>

<style lang="scss">
  header {
    margin-bottom: 2rem;
    position: sticky;
    top: 0;
    z-index: 800;
    border-bottom: 2px solid var(--primary);
    background-color: var(--surface);
    nav {
      max-width: 1200px;
      margin: 0 auto;
      a {
        text-decoration-color: transparent;
        transition: text-decoration-color 200ms ease-in-out;
        &:hover,
        &.active {
          text-decoration: underline;
          text-decoration-color: var(--primary);
          text-decoration-thickness: 3px;
          text-decoration-style: solid;
          text-underline-offset: 5px;
        }
      }
    }
  }
</style>
