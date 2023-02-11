<script lang="ts">
  import GetCustomerEmail from "./GetCustomerEmail.svelte"
</script>

<footer class="secondary-container bottom">
  <div class="footer-content-grid main-container">
    <div class="location">
      <img src="/logo-w.png" alt="logo-alt" />
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
      <GetCustomerEmail key="support-email" />
    </div>
  </div>
</footer>

<style lang="sass">
  .footer-content-grid
    padding-top: 1em
    display: grid
    grid-template-columns: 1.5fr 1fr 1fr 1fr
    column-gap: 2em
    & > *
      text-transform: capitalize
      display: flex
      flex-direction: column
      align-items: flex-start
      margin-top: 1em
    .location
      img
        max-width: 100%
        object-fit: contain
    .links
      grid-column: 3
</style>
