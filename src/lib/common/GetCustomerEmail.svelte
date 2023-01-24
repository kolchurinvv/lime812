<script lang="ts">
  export let placeholderText: string = "Ваша почта"
  export let key: string
</script>

<div class="field label prefix border ">
  <i>email</i>
  <input type="email" id={key} />
  <label class="secondary transparent" for={key}>{placeholderText}</label>
</div>

<style lang="sass">
// currently this is the only one instance that's affected due to being on yellow background
#order-email:focus
  border-color: var(--secondary)
</style>
