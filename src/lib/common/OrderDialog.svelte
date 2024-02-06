<script lang="ts">
  import { onDestroy } from "svelte"
  import type { purchaseItem } from "@/lib/types/emailOrder"
  import EmailForm from "./EmailForm.svelte"

  export let active: boolean = false
  export let subject: string | undefined

  export let item: purchaseItem = {
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
</script>

<dialog class="modal max" class:active={active === true}>
  <section class="order-container">
    <article class="no-padding">
      <img
        class="responsive top-round"
        alt="selected featured product"
        src={item.src} />
      <div class="padding">
        <h6>{item.cardTitle}</h6>
        <p>
          {item.description}
        </p>
      </div>
    </article>
    <EmailForm
      {templateId}
      key="purchase-order"
      expanded={true}
      maxModal={true}
      optional={false}
      {item}
      labelText="Суть заказа:"
      on:close={() => {
        closeDialog()
      }}>
      <nav slot="customActions" class="center-align">
        <button class="accent-container small-elevate" type="submit">
          заказать
        </button>
        <button
          class="tertiary-container small-elevate"
          on:click={() => closeDialog()}>
          отменить
        </button>
      </nav>
    </EmailForm>
  </section>
</dialog>

<style lang="sass">
  .modal
    z-index: 9999
    .order-container
      max-width: 500px
      margin: 0 auto
      display: flex
      flex-direction: column
      justify-content: center
      article 
        align-self: center
        display: flex
        flex-grow: 0
        width: 250px
        flex-direction: column
        background: initial
        & > img
          object-fit: contain
        & > div
          display: flex
          flex-grow: 1
          flex-direction: column
          justify-content: space-between
</style>
