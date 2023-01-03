<script lang="ts">
  import Button from "@smui/button"
  let counter = 0
  const clicker = () => {
    counter++
  }
</script>

<template lang="pug">
p I'm counting ... {counter}
Button(on:click="{clicker}" variant="raised") Count up
</template>

<style lang="sass">
p
  background: green
</style>
