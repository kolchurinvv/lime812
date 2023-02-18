<script lang="ts">
  import { onDestroy, SvelteComponentTyped } from "svelte"
  import type { purchaseItem } from "@/lib/types/emailOrder"
  // import GetCustomerEmail from "./GetCustomerEmail.svelte"
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
  // let send: SvelteComponentTyped
</script>

<div class="modal max" class:active={active === true}>
  <section class="order-container">
    <article class="no-padding ">
      <img
        class="responsive  top-round"
        alt="featured product"
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
      <nav slot="customActions">
        <button class="accent-container" type="submit">заказать</button>
        <button class="tertiary-container" on:click={() => closeDialog()}>
          отменить
        </button>
      </nav>
    </EmailForm>
  </section>
</div>

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
      .accent-container
        background-color: var(--primary-accent)

</style>
