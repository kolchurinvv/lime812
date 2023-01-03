<script>
  import Button from "@smui/button"
  let counter = 0
</script>

I'm counting ... {counter}
<Button on:click={() => counter++} variant="raised">Count up</Button>

<style>
  /* button {
    background: green;
    color: #fff;
  } */
</style>
