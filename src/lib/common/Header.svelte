<script lang="ts">
  const modeToggle = () => {
    //@ts-ignore
    const newMode = ui("mode") == "dark" ? "light" : "dark"
    //@ts-ignore
    ui("mode", newMode)
  }
</script>

<header class="small-padding">
  <nav class="main-container">
    <a href="/">
      <img src="/home-logo.png" alt="logo" style="max-height: 80px" />
    </a>
    <div class="max" />
    <a href="/about"
      ><button class="transparent no-round upper extra small-elevate"
        >О компании</button
      ></a>
    <a href="/promos"
      ><button class="transparent no-round upper extra small-elevate"
        >акции</button
      ></a>
    <a href="contacts"
      ><button class="transparent no-round upper extra small-elevate"
        >контакты</button
      ></a>
    <a href="/catalog"
      ><button class="no-round border upper extra small-elevate y-border"
        >прайс</button
      ></a>
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
    z-index: 9999
    border-bottom: 2px solid var(--primary)
</style>
