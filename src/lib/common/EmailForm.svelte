<script lang="ts">
  import emailjs from "@emailjs/browser"
  import { slide } from "svelte/transition"
  import { createEventDispatcher, onDestroy } from "svelte"
  import type {
    purchaseItem,
    payloadProps,
    requiredFieldsType,
  } from "@/lib/types/emailOrder"
  import { isEmailPattern } from "$lib/utils/regexPatterns"
  import { onMount } from "svelte"
  export let item: purchaseItem | undefined = undefined
  export let key: string | undefined
  export let maxModal: boolean = false
  export let labelText: string = "отправьте нам сообщение"
  export let optional: boolean = true
  export let expanded: boolean = false
  export let templateId: string = import.meta.env.VITE_EMAILJS_BASE_TEMPLATE

  const dispatch = createEventDispatcher()

  let message: string | undefined
  let requiredFields: requiredFieldsType = {
    email: {
      fieldValue: "",
      type: "email",
      label_placeholder: "Ваша Почта",
      errors: new Set(),
      prefixIcon: "email",
      ref: undefined,
    },
  }

  const timeOuts: number[] = []
  // util functions
  function typeSwitch(node: HTMLInputElement, type: string): void {
    node.type = type
  }
  let toasts: HTMLCollectionOf<Element>
  onMount(() => {
    toasts = document.getElementsByClassName(
      "toast"
    ) as HTMLCollectionOf<Element>
    switch (key) {
      case "support-email":
        message = item?.optionalMessage ?? "Требуется помощь"
        break
      case "purchase-order":
        message = item?.optionalMessage ?? "Интересует продукция"
        requiredFields["name"] = {
          fieldValue: "",
          type: "text",
          label_placeholder: "Ваше Имя",
          errors: new Set(),
          prefixIcon: "person",
          ref: undefined,
        }
        requiredFields["phone"] = {
          fieldValue: "",
          type: "tel",
          label_placeholder: "Ваш Телефон",
          errors: new Set(),
          prefixIcon: "phone",
          ref: undefined,
        }

        break
      default:
        message = item?.optionalMessage ?? ""
        break
    }
  })
  onDestroy(() => {
    for (const to of timeOuts) {
      window.clearTimeout(to)
    }
  })

  // TODO needs a major re-design
  function validatePayload(payload: requiredFieldsType): boolean | string {
    let retVal: boolean | string = false
    for (const field in payload) {
      const { fieldValue, type, errors } = payload[field]
      switch (type) {
        case "email":
          if (!isEmailPattern.test(fieldValue)) {
            errors.add("Некорректный формат почты")
            retVal = "email"
          }
          break

        default:
          break
      }
    }
    return retVal
  }
  // end util functions
  const serviceId: string = import.meta.env.VITE_EMAILJS_SERVICE
  const pubKey: string = import.meta.env.VITE_EMAILJS_PUB_KEY

  let error: string | undefined
  let success: string | undefined
  let disabled: boolean = false
  async function sendMessage(
    payload: requiredFieldsType,
    item?: purchaseItem
  ): Promise<void> {
    disabled = true
    const payloadHasErrors = validatePayload(payload)
    if (typeof payloadHasErrors === "string") {
      error = requiredFields[payloadHasErrors].errors.values().next().value
      timeOuts.push(
        window.setTimeout(() => {
          ;[...(<any>toasts)].forEach((toast) => {
            const classes = toast.classList
            classes.remove("active")
            error = undefined
          })
        }, 5000)
      )
      disabled = false
      return
    }
    // before setting email value as the payload prop - check if it's correct
    const payloadProps: payloadProps = {
      from_name: requiredFields.email.fieldValue,
      message,
      reply_to: requiredFields.email.fieldValue,
    }
    if (item?.SKU) {
      payloadProps.SKU = item.SKU
    }
    try {
      const res = await emailjs.send(
        serviceId,
        templateId,
        payloadProps,
        pubKey
      )
      if (res.status === 200) {
        disabled = false
        success = requiredFields.email.fieldValue
        timeOuts.push(
          window.setTimeout(() => {
            dispatch("close")
            ;[...(<any>toasts)].forEach((toast) => {
              const classes = toast.classList
              classes.remove("active")
              error = undefined
              success = undefined
              requiredFields.email.fieldValue = ""
              requiredFields.email.errors = new Set()
            })
          }, 4000)
        )
      }
    } catch (e) {
      if (e instanceof Error) {
        disabled = false
        error =
          e?.message ??
          "something terrible happened with the email service provider"
      }
    }
  }
</script>

<form
  on:submit|preventDefault={() => {
    sendMessage(requiredFields, item)
  }}
  on:keydown={(e) => {
    if (e.code === "Enter" && (e.metaKey || e.ctrlKey)) {
      console.log("meta + enter")
      sendMessage(requiredFields, item)
    }
    if (e.code === "Enter") {
      return
    }
  }}>
  {#each Object.keys(requiredFields) as field}
    <div
      class="full-width field label prefix border"
      class:suffix={requiredFields[field]?.suffixIcon}>
      {#if !disabled}
        <i>{requiredFields[field].prefixIcon}</i>
      {:else}
        <div class="loader" class:secondary={key === "order-email"} />
      {/if}
      <input
        required
        {disabled}
        bind:this={requiredFields[field].ref}
        use:typeSwitch={requiredFields[field].type}
        bind:value={requiredFields[field].fieldValue}
        id="{key}-{field}" />
      <label class="secondary transparent" for="{key}-{field}">
        {requiredFields[field].label_placeholder}
      </label>
      {#if requiredFields.email.fieldValue.length && !maxModal}
        <button
          type="submit"
          class="no-padding suffix-action"
          class:primary-alt={key === "order-email"}>
          <i>reply</i>
        </button>
      {/if}
    </div>
  {/each}

  {#if requiredFields.email.fieldValue.length || expanded}
    <div transition:slide|local class="full-width field textarea label border">
      <textarea {disabled} bind:value={message} id="{key}-custom-message" />
      <label class="secondary transparent" for="{key}-custom-message">
        {labelText}
      </label>
      {#if optional}
        <span class="helper">необязательное поле</span>
      {/if}
    </div>
    <div class="data-processing-info">
      <p>
        Отправив сообщение, Вы даете согласие на обработку персональных данных в
        соответствии с законом от 27.07.2006 №152-ФЗ "О персональных данных."
      </p>
      <p>
        <i>verified_user</i>
        Мы гарантируем безопасность и сохранность Ваших данных.
      </p>
    </div>
  {/if}
  <slot name="customActions" />
</form>
<!-- TODO move toasts to the parent component -->
<!-- success dialog -->
{#if success}
  <div class="toast active green white-text top">
    <i>done</i>
    <span>Мы Вам обязательно напишем на {success}</span>
  </div>
{/if}

<!-- error dialog -->
{#if error}
  <div class="toast active orange white-text top">
    <i>warning</i>
    <span>{error ?? "Что-то пошло не так..."}</span>
  </div>
{/if}

<style lang="sass">
form
  margin-top:2rem
  .full-width
    width: 100%
  & > *
    margin-bottom: 1.5rem
  // currently this is the only one instance that's affected due to being on yellow background
  #order-email-email:focus, #order-email-custom-message:focus, #order-email-email:focus + label::after, #order-email-custom-message:focus + label::after
    border-color: var(--secondary)
  .suffix-action
    position: absolute
    top: 0.2rem
    right: 0
    &.primary-alt
      color: var(--on-primary-alt)
  .data-processing-info
    font-size: 0.75em
    text-transform: initial


</style>
