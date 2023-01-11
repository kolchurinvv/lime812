<script lang="ts">
  import { Swiper, SwiperSlide } from "swiper/svelte"
  import { Autoplay, Pagination } from "swiper"

  import "swiper/scss"
  import "swiper/scss/pagination"
  import "@/theme/swiper.scss"
  import { onDestroy } from "svelte"

  const timeOuts: number[] = []
  const selectElement = (event: Event) => {
    const element = event.target as HTMLButtonElement
    if (element.parentElement) {
      const siblings = [...element.parentElement.children].filter(
        (elem) => elem !== element
      )
      for (const sibling of siblings) {
        sibling.classList.add("transparent")
      }
    }
    const classes = element.classList
    timeOuts.push(
      window.setTimeout(() => {
        classes.remove("transparent")
      }, 200)
    )
  }
  onDestroy(() => {
    for (const tm of timeOuts) {
      clearTimeout(tm)
    }
  })
</script>

<main>
  <section class="jumbo-container main-container">
    <div class="medium-padding jumbo-anno-box">
      <div class="y-border large-padding jumbo-text">
        ЭЛЕКТРИЧЕСКИЙ ТЕПЛЫЙ ПОЛ
      </div>
      <p>ПРОДАЖА ОТ ПРЯМОГО ИМПОРТЕРА</p>
      <button class="no-margin no-round primary filled">прайсы</button>
    </div>

    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      pagination
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
      class="mySwiper">
      <SwiperSlide
        ><img src="/jumbo-slides/slide-1.png" alt="slide-1" /></SwiperSlide>
      <SwiperSlide
        ><img src="/jumbo-slides/slide-2.png" alt="slide-2" /></SwiperSlide>
      <!-- <SwiperSlide
      ><img src="/jumbo-slides/slide-3.png" alt="slide-3" /></SwiperSlide> -->
    </Swiper>
  </section>
  <section class="background medium-padding">
    <div class="main-container">
      <h4>Теплый пол</h4>
      <nav class="no-space middle-align">
        <button
          on:click={(e) => selectElement(e)}
          class="y-border no-round"
          data-ui="#page1">Кабельный теплый пол в стяжку</button>
        <button
          on:click={(e) => selectElement(e)}
          class="y-border transparent no-round"
          data-ui="#page2">Тонкий теплый пол под плитку</button>
        <button
          on:click={(e) => selectElement(e)}
          class="y-border transparent no-round"
          data-ui="#page3">Нагревательные маты под плитку</button>
        <button
          on:click={(e) => selectElement(e)}
          class="y-border transparent no-round"
          data-ui="#page4">теплый пол под ламинат</button>
      </nav>
      <div class="featured-products">
        <div class="page active right" id="page1">
          <article class="no-padding round">
            <img
              class="responsive small top-round"
              alt="featured product"
              src="/featured-1/eco_pdsv_20.jpg" />
            <div class="padding">
              <h6>In-Therm ECO PDSV 20</h6>
              <p>
                Кабель для теплого пола используются для укладки в стяжку 3-8
                см.
              </p>
              <nav>
                <button class="no-round">Скачать Прайс</button>
              </nav>
            </div>
          </article>
          <article class="no-padding round">
            <img
              class="responsive small top-round"
              alt="featured product"
              src="/featured-1/unifloor15.jpg" />
            <div class="padding">
              <h6>Unifloor 15 Вт/м</h6>
              <p>
                Кабель для теплого пола используются для укладки в стяжку 3-8
                см.
              </p>
              <nav>
                <button class="no-round">Скачать Прайс</button>
              </nav>
            </div>
          </article>
          <article class="no-padding round">
            <img
              class="responsive small top-round"
              alt="featured product"
              src="/featured-1/in-term_adsv_20.jpg" />
            <div class="padding">
              <h6>In-Therm ADSV 20</h6>
              <p>
                Кабель для теплого пола используются для укладки в стяжку 3-8
                см.
              </p>
              <nav>
                <button class="no-round">Скачать Прайс</button>
              </nav>
            </div>
          </article>
          <article class="no-padding round">
            <img
              class="responsive small top-round"
              alt="featured product"
              src="/featured-1/fenix_adsv_18.jpg" />
            <div class="padding">
              <h6>Fenix ADSV 18</h6>
              <p>
                Кабель для теплого пола используются для укладки в стяжку 3-8
                см.
              </p>
              <nav>
                <button class="no-round">Скачать Прайс</button>
              </nav>
            </div>
          </article>
        </div>
        <div class="page right" id="page2">
          <h6>Tab 2</h6>
        </div>
        <div class="page right" id="page3">
          <h6>Tab 3</h6>
        </div>
        <div class="page right" id="page4">
          <h6>Tab 4</h6>
        </div>
      </div>
    </div>
  </section>
  <section class="primary-container medium-padding ">
    <div class="how-to-container main-container">
      <h4>Как заказать?</h4>
      <div class="steps">
        <div class="request-container">
          <div class="request">
            <h6>Оставить заявку</h6>
            <p>
              Вы можете оставить свой номер телефона в форме для обратной связи
              и в ближайшее время наши менеджеры обязательно с Вами свяжутся.
              Либо оставьте ваш почтовый адресс, и мы вам обязательно напишем.
            </p>
          </div>
          <div class="field label prefix border ">
            <i>email</i>
            <input type="email" id="order-email" />
            <label class="secondary transparent" for="order-email"
              >Ваша почта</label>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<style lang="sass">
.jumbo-container
  .jumbo-anno-box
    display: grid
    position: absolute
    bottom: 10%
    z-index: 2
    background-color: #fff
    line-height: 1.1
    letter-spacing: 1.2px
    font-size: 1.4em
    & > *
      text-transform: uppercase
      margin-bottom: 1em
  .jumbo-text
    justify-self: start
    font-weight: 900
section > div
  text-transform: uppercase
  h4::after
    content: ''
    display: inline-block
    width: 90px
    height: 2px
    margin: auto 0 17px 40px
    background: var(--primary)
  nav > button
    position: relative
    z-index: 1
    text-transform: uppercase
    &:hover::after, &:focus::after
      background-image: radial-gradient(circle,var(--primary) 1%,transparent 1%)
      z-index: -1
  .featured-products > *
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
    grid-auto-flow: column
    column-gap: 2em
    article
      margin-top: 16rem
      text-transform: initial
      & > img
        object-fit: contain
.how-to-container
  color: var(--on-primary-alt)
  h4::after
    background: var(--on-primary-alt)
  .steps
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    column-gap: 2em
    .request-container
      grid-column: 2
      #order-email:focus
        border-color: var(--secondary)
      .request
        p
          text-transform: initial
      &::before
        content: ''
        display: inline-block
        background-image: url('/icons/checklist.png')
        background-position: center
        background-repeat: no-repeat
        background-size: contain
        width: 50px
        height: 50px
        position: absolute
        left: -55px
</style>
