<script lang="ts">
  import Logo from "@/lib/common/logo.svelte"
  import EmailForm from "./EmailForm.svelte"
</script>

<footer class="secondary-container bottom">
  <div class="footer-content-grid main-container">
    <div class="location">
      <a href="/">
        <Logo style={{ style: "width: 160px", wordColor: "fill: #FFF" }} />
      </a>
      <h6>Магазин-склад ООО «ЛАЙМ»</h6>
      <p>191144, Санкт-Петербург, 8-я Советская, 48, лит А, пом 14Н</p>
      <p>
        Складские помещения расположены в Москве (Сигнальный проезд) с
        возможностью самовывоза или адресной доставки через транспортную
        компанию.
      </p>
    </div>
    <nav class="links">
      <h6>Навигация</h6>
      <a href="/about">о компании</a>
      <a href="/promos">акции</a>
      <a href="/contacts">контакты</a>
      <a href="/catalog">прайс</a>
    </nav>
    <div class="help">
      <h6>поддержка</h6>
      <EmailForm key="support-email" />
    </div>
  </div>
</footer>

<style lang="sass">
  .footer-content-grid
    padding-top: 1em
    display: grid
    grid-template-columns: 1.5fr 1fr 1fr
    column-gap: 2em
    & > *
      text-transform: capitalize
      display: flex
      flex-direction: column
      align-items: flex-start
      margin-top: 1em
    .links
      grid-column: 2
</style>
