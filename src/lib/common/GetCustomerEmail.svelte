<script lang="ts">
  import emailjs from "@emailjs/browser"

  export let placeholderText: string = "Ваша почта"
  export let key: string

  let sendersEmail: string = ""
  let message: string
  let status: boolean | null
  switch (key) {
    case "support-email":
      message = "Требуется помощь"
      break

    default:
      message = "Пользователь проявил интерес"
      break
  }
  const serviceId: string = import.meta.env.VITE_EMAILJS_SERVICE
  const templateId: string = import.meta.env.VITE_EMAILJS_TEMPLATE
  const pubKey: string = import.meta.env.VITE_EMAILJS_PUB_KEY
  async function sendEmail(sendersEmail: string): Promise<boolean> {
    if (!sendersEmail.length) {
      throw new Error("email is required")
    }
    const res = await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: sendersEmail,
        message,
        reply_to: sendersEmail,
      },
      pubKey
    )
    if (res.status === 200) {
      return true
    } else {
      throw new Error(`FAILED... ${res}`)
    }
  }
  let promise: Promise<boolean> | boolean = false
  const timeOuts: number[] = []
  const submitEmail = (e: KeyboardEvent | MouseEvent) => {
    if (
      (e instanceof KeyboardEvent && e.code === "Enter") ||
      e instanceof MouseEvent
    ) {
      promise = sendEmail(sendersEmail)
      const toasts = document.getElementsByClassName(
        "toast"
      ) as HTMLCollectionOf<Element>
      timeOuts.push(
        window.setTimeout(() => {
          sendersEmail = ""
          promise = false
          ;[...(<any>toasts)].forEach((toast) => {
            const classes = toast.classList
            classes.remove("active")
          })
        }, 7000)
      )
      return
    }
  }
</script>

<div class="field label prefix suffix border ">
  {#if !promise}
    <i>email</i>
  {:else}
    <div class="loader" class:secondary={key === "order-email"} />
  {/if}
  <input
    disabled={promise ? true : false}
    type="email"
    on:keydown|self={submitEmail}
    bind:value={sendersEmail}
    id={key} />
  <label class="secondary transparent" for={key}>{placeholderText}</label>
  {#if sendersEmail}
    <button
      class="no-padding suffix-action"
      class:primary-alt={key === "order-email"}
      on:click={submitEmail}>
      <i>reply</i>
    </button>
  {/if}
</div>
{#if promise}
  {#await promise then response}
    <div class="toast active green white-text top">
      <i>done</i>
      <span>Мы Вам обязательно напишем на {sendersEmail}</span>
    </div>
  {:catch error}
    <div class="toast active orange white-text top">
      <i>warning</i>
      <span>Что-то пошло не так...</span>
    </div>
  {/await}
{/if}

<style lang="sass">
// currently this is the only one instance that's affected due to being on yellow background
#order-email:focus
  border-color: var(--secondary)
.loader.secondary
  border: 4rem solid var(--secondary)
.suffix-action
  position: absolute
  top: 4rem
  right: 0
  &.primary-alt
    color: var(--on-primary-alt)

</style>
