<script lang="ts">
  import emailjs from "@emailjs/browser"
  import { onMount } from "svelte"

  export let placeholderText: string = "Ваша почта"
  export let key: string
  let sendersEmail: string = ""
  let message: string
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
  onMount(() => {
    console.log("looking for dev key", serviceId)
  })
  const logKey = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      emailjs
        .send(
          serviceId,
          templateId,
          {
            from_name: sendersEmail,
            message,
            reply_to: sendersEmail,
          },
          pubKey
        )
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text)
        })
        .catch((err) => {
          console.log("FAILED...", err)
        })
        .finally(() => {
          sendersEmail = ""
        })
    }
  }
</script>

<div class="field label prefix border ">
  <i>email</i>
  <input type="email" on:keydown={logKey} bind:value={sendersEmail} id={key} />
  <label class="secondary transparent" for={key}>{placeholderText}</label>
</div>

<style lang="sass">
// currently this is the only one instance that's affected due to being on yellow background
#order-email:focus
  border-color: var(--secondary)
</style>
