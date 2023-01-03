<script lang="ts">
  let counter = 0
  const clicker = () => {
    counter++
  }
</script>

<p class="test">
  I'm counting ... {counter}
</p>
<button on:click={clicker}>Count up</button>

<style lang="sass">
.test
  background: red
</style>
