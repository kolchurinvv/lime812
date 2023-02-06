<script lang="ts">
  import emailjs from "@emailjs/browser"
  import { slide } from "svelte/transition"
  import { isEmailPattern } from "$lib/utils/regexPatterns"
  export let placeholderText: string = "Ваша почта"
  export let key: string | undefined
  export let maxModal: boolean = false
  export let labelText: string = "отправьте нам сообщение"
  let message: string | undefined
  export let required: boolean = true
  export let customMessage: string | undefined = undefined
  export let expanded: boolean = false

  let sendersEmail: string
  switch (key) {
    case "support-email":
      message = customMessage ? customMessage : "Требуется помощь"
      break
    default:
      message = customMessage ? customMessage : ""
      break
  }
  const serviceId: string = import.meta.env.VITE_EMAILJS_SERVICE
  export let templateId: string = import.meta.env.VITE_EMAILJS_BASE_TEMPLATE
  const pubKey: string = import.meta.env.VITE_EMAILJS_PUB_KEY
  type payloadProps = {
    from_name: string
    message?: string
    reply_to: string
    SKU?: string
  }
  async function sendEmail(sendersEmail: string, props?: payloadProps) {
    if (!sendersEmail?.length) {
      throw new ReferenceError("Почта обязательна!")
    }
    if (!isEmailPattern.test(sendersEmail)) {
      throw new SyntaxError("Некорректный формат почты")
    }

    const payloadProps: payloadProps = {
      from_name: sendersEmail,
      message,
      reply_to: sendersEmail,
    }
    if (props?.SKU) {
      payloadProps.SKU = props.SKU
    }
    const res = await emailjs.send(serviceId, templateId, payloadProps, pubKey)
    if (res.status === 200) {
      return sendersEmail
    } else {
      throw new Error(`FAILED... ${res}`)
    }
  }
  let promise: Promise<string> | boolean = false
  const timeOuts: number[] = []

  export const submitEmail = async (
    e: KeyboardEvent | MouseEvent,
    params?: payloadProps
  ) => {
    if (
      (e instanceof KeyboardEvent && e.code === "Enter") ||
      e instanceof MouseEvent
    ) {
      promise = sendEmail(sendersEmail, params)
      const toasts = document.getElementsByClassName(
        "toast"
      ) as HTMLCollectionOf<Element>
      return new Promise((resolve) => {
        timeOuts.push(
          window.setTimeout(() => {
            sendersEmail = ""
            promise = false
            ;[...(<any>toasts)].forEach((toast) => {
              const classes = toast.classList
              classes.remove("active")
            })
            resolve(200)
          }, 5000)
        )
      })
    }
  }
</script>

<div class="full-width field label prefix suffix border ">
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
  {#if sendersEmail && !maxModal}
    <button
      class="no-padding suffix-action"
      class:primary-alt={key === "order-email"}
      on:click={submitEmail}>
      <i>reply</i>
    </button>
  {/if}
</div>
{#if sendersEmail || expanded}
  <div transition:slide|local class="full-width field textarea label border">
    <textarea bind:value={message} id="{key}-custom-message" />
    <label class="secondary transparent" for="{key}-custom-message">
      {labelText}
    </label>
    {#if required}
      <span class="helper">необязательное поле</span>
    {/if}
  </div>
{/if}
<slot name="customActions" />
{#if promise}
  {#await promise then response}
    <div class="toast active green white-text top">
      <i>done</i>
      <span>Мы Вам обязательно напишем на {response}</span>
    </div>
  {:catch error}
    <div class="toast active orange white-text top">
      <i>warning</i>
      <span>{error?.message ?? "Что-то пошло не так..."}</span>
    </div>
  {/await}
{/if}

<style lang="sass">
.full-width
  width: 100%
// currently this is the only one instance that's affected due to being on yellow background
#order-email:focus, #order-email-custom-message:focus
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
