<script lang="ts">
  import { page } from "$app/stores"
  import { mode } from "$lib/store/ui"
  import Logo from "$lib/common/logo.svelte"
  import MenuBurger from "./MenuBurger.svelte"

  export let routeName: string
  const routeNameToIconMap: { [key: string]: string } = {
    Главная: "home",
    "О компании": "info",
    Акции: "notifications_active",
    Контакты: "call",
    Прайс: "view_list",
  }
  $: navIcon = routeNameToIconMap[routeName]

  const modeToggle = () => {
    const newMode = ui("mode") == "dark" ? "light" : "dark"
    mode.set(newMode === "dark")
    ui("mode", newMode)
  }

  let isBurgerChecked = false
  let mobileMenu: HTMLElement | null = null
  let mainMenu: HTMLElement | null = null

  $: {
    if (mainMenu && isBurgerChecked) {
      mainMenu.style.transform = "translateX(0)"
      mainMenu.classList.add("large-blur")
    } else if (mainMenu && !isBurgerChecked) {
      mainMenu.style.transform = "translateX(-100%)"
      mainMenu.classList.remove("large-blur")
    }
  }
</script>

<header class="small-padding">
  <h5 class="tertiary small-padding">Отсчет до новой версии: Скоро!</h5>
  <nav bind:this={mobileMenu} class="mobile-container">
    <a href="/">
      <Logo style={{ style: "width: 100%" }} />
    </a>
    <div class="responsive medium-elevate chip round primary">
      <i class="extra">{navIcon}</i>
      <span class="upper">{routeName}</span>
    </div>
    <MenuBurger bind:isChecked={isBurgerChecked} />
  </nav>
  <nav bind:this={mainMenu} class="main-container">
    <a href="/">
      <Logo style={{ style: "width: 100%" }} />
    </a>
    <!-- <div class="max" /> -->
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

<style lang="scss" scoped>
  // default aka small screens
  header {
    position: sticky;
    top: 0;
    z-index: 800;
    border-bottom: 2px solid var(--primary);

    h5 {
      display: block;
      text-align: center;
    }

    .main-container {
      position: absolute;
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: 1fr;
      margin-top: 3.5rem !important;
      padding: 1rem 0;
      top: 0;
      left: 0;
      transform: translateX(-100%);
      transition: transform 200ms ease-in-out;
      a:first-child {
        display: none;
      }
      a:nth-child(2) {
        width: initial;
      }
      *:last-child {
        justify-self: center;
      }
    }
    nav {
      width: 100%;
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 1fr 4fr 1fr;
      min-height: initial;
      & > a:first-child {
        width: 71px;
      }
      & > *:last-child {
        justify-self: end;
      }
      a {
        text-decoration-color: transparent;
        transition: text-decoration-color 200ms ease-in-out;
        & > button {
          font-size: 1rem;
        }
        &:hover,
        &.active {
          text-decoration: underline;
          text-decoration-color: var(--primary);
          text-decoration-thickness: 3px;
          text-decoration-style: solid;
          text-underline-offset: 5px;
        } // large screens
      }
    }
  }
  @media screen and (min-width: 576px) {
    header {
      // margin-bottom: 2em;
      background-color: var(--surface);
      .main-container {
        position: initial;
        display: flex;
        padding: 0 0;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        transform: translateX(0%) !important;
        transition: none;
        justify-content: space-between;

        a:first-child {
          display: flex;
          width: 100%;
          min-width: 6rem;
          max-width: 10rem;
        }
      }
      .mobile-container {
        display: none;
        visibility: hidden;
      }
    }
  }
</style>
