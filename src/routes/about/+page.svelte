<section class="about-grid small-padding">
  <img
    class="small-elevate y-border"
    src="/fill-in-imgs/foto1.jpg"
    alt="transparent floor view" />

  <div class="top-margin">
    <h4>Наша специализация</h4>
    <p>
      Мелкооптовый магазин-склад ООО «ЛАЙМ» – это всё необходимое для
      обустройства электрического теплого пола или обогрева кровельных свесов и
      водосточных систем: нагревательные маты, кабель и комплектующие.
    </p>
    <p>
      Продукция представлена в ассортименте следующими фирмами: Eltrace, Fenix
      Group, Hemstedt, IN-THERM, Unifloor, WarmLife.
    </p>
    <p>
      Компания «ЛАЙМ» является оптовым поставщиком строительных, торговых и
      монтажно-сервисных предприятий. Наша организация принимает в работу
      разовые заявки по обеспечению закупочных контрактов с поставщиками из
      Армении, Китая и Ирана по разным номенклатурным наименованиям.
    </p>
  </div>
  <div class="top-margin">
    <h4>Наши приоритеты</h4>
    <ul>
      <li>
        <div class="row">
          <i style="color: var(--primary)">priority</i>
          <div class="max">Прямые поставки от производителя</div>
        </div>
      </li>
      <li>
        <div class="row">
          <i style="color: var(--primary)">priority</i>
          <div class="max">Собственный склад</div>
        </div>
      </li>
      <li>
        <div class="row">
          <i style="color: var(--primary)">priority</i>
          <div class="max">Стабильная ценовая политика</div>
        </div>
      </li>
      <li>
        <div class="row">
          <i style="color: var(--primary)">priority</i>
          <div class="max">Программа партнерской поддержки</div>
        </div>
      </li>
    </ul>
  </div>
  <img
    class="small-elevate y-border"
    src="/fill-in-imgs/foto7.jpg"
    alt="installation during construction" />
</section>

<style lang="scss">
li {
  list-style-type: none;
}
img {
  max-width: 34em;
  border-radius: 1rem;
}
.about-grid {
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 1em;
  grid-auto-flow: row;
  .top-margin {
    margin-top: 3em;
    h4::after {
      content: '';
      display: inline-block;
      width: 90px;
      height: 2px;
      margin: auto 0 17px 40px;
      background: var(--primary);
    }
  }
}
</style>
