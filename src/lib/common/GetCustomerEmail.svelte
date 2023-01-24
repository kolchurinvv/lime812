<script lang="ts">
  import { onMount } from "svelte"
  import emailjs from "@emailjs/browser"
  export let placeholderText: string = "Ваша почта"
  export let key: string
  let sendersEmail: string = ""
  const logKey = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      emailjs
        .send(
          "service_49mn7mg",
          "template_eqvxrrl",
          {
            from_name: sendersEmail,
            to_name: "Elena",
            message: "i wanna order stuff",
            reply_to: sendersEmail,
          },
          "FY8zGK7A9e9L2XImB"
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text)
          },
          (err) => {
            console.log("FAILED...", err)
          }
        )
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
