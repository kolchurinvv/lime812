<script lang="ts">
  import { onDestroy, SvelteComponentTyped } from "svelte"
  import GetCustomerEmail from "./GetCustomerEmail.svelte"
  export let active: boolean = false
  export let subject: string | undefined

  export let item: {
    src: string
    cardTitle: string
    description: string
    SKU: string
    optionalMessage?: string
  } = {
    src: "",
    cardTitle: "",
    description: "",
    SKU: "",
    optionalMessage: "",
  }
  const templateId = import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE
  function closeDialog(): void {
    active = false
    item = {
      src: "",
      cardTitle: "",
      description: "",
      SKU: "",
      optionalMessage: "",
    }
  }
  onDestroy(() => {
    active = false
    subject = undefined
    item = {
      src: "",
      cardTitle: "",
      description: "",
      SKU: "",
      optionalMessage: "",
    }
  })
  let send: SvelteComponentTyped
</script>

<div class="modal max" class:active={active === true}>
  <section class="order-container">
    <article class="no-padding no-round">
      <img
        class="responsive small no-round"
        alt="featured product"
        src={item.src} />
      <div class="padding">
        <h6>{item.cardTitle}</h6>
        <p>
          {item.description}
        </p>
      </div>
    </article>

    <GetCustomerEmail
      key="purchase-order"
      customMessage={item.optionalMessage}
      required={false}
      maxModal={true}
      expanded={true}
      labelText="Суть заказа:"
      {templateId}
      bind:this={send}>
      <nav slot="customActions">
        <button class="primary-container" on:click={() => closeDialog()}
          >отменить</button>
        <button
          class="primary-container"
          on:click={async (e) => {
            const res = await send.submitEmail(e)
            if (res === 200) {
              closeDialog()
            }
          }}>заказать</button>
      </nav>
    </GetCustomerEmail>
  </section>
</div>

<style lang="sass">
  .modal
    z-index: 9999
    .order-container
      max-width: 500px
      height: 100%
      margin: 0 auto
      display: flex
      flex-direction: column
      justify-content: center
      button
        text-transform: capitalize
      article 
        display: flex
        flex-grow: 0
        width: 250px
        flex-direction: column
        & > img
          object-fit: contain
        & > div
          display: flex
          flex-grow: 1
          flex-direction: column
          justify-content: space-between
</style>
