<script lang="ts">
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
</AppShell>

<style lang="sass">

</style>
