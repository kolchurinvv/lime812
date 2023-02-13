<script lang="ts">
  import { page } from "$app/stores"
  import { mode } from "$lib/store/ui"
  const modeToggle = () => {
    //@ts-ignore
    const newMode = ui("mode") == "dark" ? "light" : "dark"
    mode.set(newMode === "dark")
    //@ts-ignore
    ui("mode", newMode)
  }
</script>

<header class="small-padding">
  <nav class="main-container">
    <a href="/">
      <img
        src={$mode
          ? "/new-logos/logo-black-bg.svg"
          : "/new-logos/logo-white-bg.svg"}
        alt="logo"
        style="height: 80px" />
    </a>
    <div class="max" />
    <a class:active={$page.route.id === "/"} href="/">
      <button class="transparent no-round upper extra small-elevate">
        Главная
      </button>
    </a>
    <a class:active={$page.route.id === "/about"} href="/about">
      <button class="transparent no-round upper extra small-elevate">
        О компании
      </button>
    </a>
    <a class:active={$page.route.id === "/promos"} href="/promos">
      <button class="transparent no-round upper extra small-elevate">
        акции
      </button>
    </a>
    <a class:active={$page.route.id === "/contacts"} href="/contacts">
      <button class="transparent no-round upper extra small-elevate">
        контакты
      </button>
    </a>
    <a class:active={$page.route.id === "/catalog"} href="/catalog">
      <button class="no-round border upper extra small-elevate y-border">
        прайс
      </button>
    </a>
    <button on:click={modeToggle} class="circle transparent">
      <i>light_mode</i>
    </button>
  </nav>
</header>

<style lang="sass">
  header
    margin-bottom: 3em
    position: sticky
    top: 0
    z-index: 800
    border-bottom: 2px solid var(--primary)
    a
      text-decoration-color: transparent
      transition: text-decoration-color 200ms ease-in-out
      &:hover, &.active
        text-decoration: underline
        text-decoration-color: var(--primary)
        text-decoration-thickness: 3px
        text-decoration-style: solid
        text-underline-offset: 5px

</style>
