<script lang="ts">
  export let isChecked: boolean = false
</script>

<nav>
  <div id="menuToggle">
    <input type="checkbox" bind:checked={isChecked} />
    <span />
    <span />
    <span />
  </div>
</nav>

<style lang="scss" scoped>
  nav {
    justify-content: flex-end;
  }
  #menuToggle {
    z-index: 1;
    -webkit-user-select: none;
    user-select: none;
  }

  #menuToggle input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    cursor: pointer;
    opacity: 0; /* hide this */
    z-index: 2; /* and place it over the hamburger */
    -webkit-touch-callout: none;
  }

  /*
 * Just a quick hamburger
 */
  #menuToggle span {
    display: block;
    top: 5px;
    width: 40px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: var(--primary);
    border-radius: 3px;
    z-index: 1;
    transform-origin: 63.333% 50%;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  }

  /* 
 * Transform all the slices of hamburger
 * into a crossmark.
 */
  #menuToggle input:checked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: var(--tertiary);
  }

  /*
 * But let's hide the --middle-- first one
 */
  #menuToggle input:checked ~ span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  /*
 * Ohyeah and the last one should go the other direction
 */
  #menuToggle input:checked ~ span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
  }
</style>
