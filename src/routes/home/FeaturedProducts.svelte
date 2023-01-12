<script lang="ts">
  import { onDestroy, onMount } from "svelte"
  export let serialNumber: string
  export let tabs: {
    sectionTitle: string
    tabContent:
      | {
          title: string
          items: { src: string; cardTitle: string; description: string }[]
        }[]
  } = {
    sectionTitle: "",
    tabContent: [],
  }

  const timeOuts: number[] = []
  const selectElement = (event: Event) => {
    const element = event.target as HTMLButtonElement
    if (element.parentElement) {
      ;[...element.parentElement.children].forEach((elem) => {
        if (elem !== element) {
          elem.classList.add("transparent")
        }
      })
    }
    const classes = element.classList
    timeOuts.push(
      window.setTimeout(() => {
        classes.remove("transparent")
      }, 200)
    )
  }
  onMount(() => {
    // make first tab active
    const serialSelector = "0".concat(serialNumber)
    document
      .querySelector(`[data-ui="#page${serialSelector}"]`)
      ?.classList.remove("transparent")
    // make first page active
    document.getElementById(`page${serialSelector}`)?.classList.add("active")
  })
  onDestroy(() => {
    for (const tm of timeOuts) {
      clearTimeout(tm)
    }
  })
</script>

<section class="medium-padding">
  <div class="main-container">
    <h4>{tabs.sectionTitle}</h4>
    <nav class="no-space middle-align">
      {#each tabs.tabContent as tab, index}
        <button
          on:click={(e) => selectElement(e)}
          class="y-border no-round transparent"
          data-ui="#page{index}{serialNumber}">{tab.title}</button>
      {/each}
    </nav>
    <div class="featured-products">
      {#each tabs.tabContent as tab, index}
        <div class="page right" id="page{index}{serialNumber}">
          {#each tab.items as item}
            <article class="no-padding round">
              <img
                class="responsive small top-round"
                alt="featured product"
                src={item.src} />
              <div class="padding">
                <h6>{item.cardTitle}</h6>
                <p>
                  {item.description}
                </p>
                <nav>
                  <button class="no-round">Скачать Прайс</button>
                </nav>
              </div>
            </article>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>

<style lang="sass">
section:nth-child(2n-2)
  background-color: var(--background)

section > div
  text-transform: uppercase
  h4::after
    content: ''
    display: inline-block
    width: 90px
    height: 2px
    margin: auto 0 17px 40px
    background: var(--primary)
  nav > button
    position: relative
    z-index: 1
    text-transform: uppercase
    &:hover::after, &:focus::after
      background-image: radial-gradient(circle,var(--primary) 1%,transparent 1%)
      z-index: -1
  .featured-products > *
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
    grid-auto-flow: column
    column-gap: 2em
    article
      margin-top: 16rem
      text-transform: initial
      min-width: 210px
      & > img
        object-fit: contain
</style>
