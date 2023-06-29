<script lang="ts">
  import { onDestroy, onMount, createEventDispatcher } from "svelte"
  import type { purchaseItem } from "$lib/types/emailOrder"
  const dispatch = createEventDispatcher()
  function openModal(item: purchaseItem): void {
    dispatch("req:openModal", item)
  }
  export let serialNumber: string
  export let tabs: {
    sectionTitle: string
    tabContent:
      | {
          title: string
          items: {
            src: string
            cardTitle: string
            description: string
            SKU: string
            optionalMessage?: string
          }[]
        }[]
  } = {
    sectionTitle: "",
    tabContent: [],
  }

  const timeOuts: number[] = []
  const selectElement = (event: Event) => {
    const element = event.target as HTMLButtonElement
    if (element.parentElement) {
      ;[...(<any>element.parentElement.children)].forEach((elem) => {
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

<section class="wide medium-padding">
  <div class="main-container">
    <h4>{tabs.sectionTitle}</h4>
    <nav class="no-space">
      {#each tabs.tabContent as tab, index}
        <button
          on:click={(e) => selectElement(e)}
          class="y-border transparent tab-title primary filled"
          data-ui="#page{index}{serialNumber}"
          class:no-round={index !== 0 && index !== tabs.tabContent.length - 1}
          class:left-round={index === 0}
          class:right-round={index === tabs.tabContent.length - 1}>
          {tab.title}
        </button>
      {/each}
    </nav>
    <div class="featured-products">
      {#each tabs.tabContent as tab, index}
        <div class="page right" id="page{index}{serialNumber}">
          {#each tab.items as item}
            <article class="no-padding round">
              <img
                class="responsive top-round"
                alt="featured product"
                src={item.src} />
              <div class="padding">
                <h6>{item.cardTitle}</h6>
                <p>
                  {item.description}
                </p>
                <nav>
                  <button
                    on:click={() => {
                      openModal(item)
                    }}
                    class=" primary-container bottom">
                    заявка на продукт
                  </button>
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
section:nth-child(even)
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
  nav
    width: 100%
  nav > button
    position: relative
    z-index: 1
    text-transform: uppercase
    &:hover::after, &:focus::after
      background-image: radial-gradient(circle,var(--primary) 1%,transparent 1%)
      z-index: -1
  nav > .tab-title
    flex-grow: 1
  .featured-products > *
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
    grid-auto-flow: column
    column-gap: 2em
    article
      display: flex
      flex-direction: column
      margin-top: 1rem
      text-transform: initial
      min-width: 210px
      & > img
        object-fit: contain
      & > div
        display: flex
        flex-grow: 1
        flex-direction: column
        justify-content: space-between
</style>
