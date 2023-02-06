<script lang="ts">
  import { onDestroy, SvelteComponentTyped } from "svelte"
  import GetCustomerEmail from "./GetCustomerEmail.svelte"
  export let active: boolean = false
  export let subject: string | undefined
  export let message: string | undefined
  const templateId = import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE
  function closeDialog(): void {
    active = false
  }
  onDestroy(() => {
    active = false
    subject = undefined
    message = undefined
  })
  let send: SvelteComponentTyped
</script>

<div class="modal max" class:active={active === true}>
  <GetCustomerEmail
    key="purchase-order-{subject}"
    customMessage={message}
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
          const res = await send.submitEmail(e, { SKU: "test_0" })
          if (res === 200) {
            closeDialog()
          }
        }}>заказать</button>
    </nav>
  </GetCustomerEmail>
</div>

<style lang="sass">
  .modal
    z-index: 9999
  button
    text-transform: capitalize
</style>
