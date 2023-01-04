<!-- <script lang="ts">
  // import { SvelteUIProvider, Switch } from "@svelteuidev/core"

  import {
    fns,
    AppShell,
    Navbar,
    Header,
    Title,
    Divider,
  } from "@svelteuidev/core"
  import HeaderContent from "./HeaderContent.svelte"
  // import NavContent from "./NavContent.svelte"

  let isDark = false
  let opened = false

  function toggleTheme() {
    isDark = !isDark
  }
  function toggleOpened() {
    opened = !opened
  }
</script>

<AppShell>
  <Header height="100px" slot="header">
    <HeaderContent />
  </Header>

  <slot>This is the main content</slot>
</AppShell> -->
<script>
  import "beercss"
  import "material-dynamic-colors"
</script>

<header class="primary">
  <nav>
    <button class="circle transparent">
      <i>arrow_backward</i>
    </button>
    <h5>Title large</h5>
    <div class="max" />
    <button class="circle transparent">
      <i>attach_file</i>
    </button>
    <button class="circle transparent">
      <i>today</i>
    </button>
    <button class="circle transparent">
      <i>more_vert</i>
    </button>
  </nav>
</header>

<style lang="sass">

</style>
