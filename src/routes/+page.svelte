<script lang="ts">
  import { Swiper, SwiperSlide } from "swiper/svelte"
  import { Autoplay, Pagination } from "swiper"

  import "swiper/scss"
  import "swiper/scss/pagination"
  import "@/theme/swiper.scss"
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
  <section class="primary medium-padding ">
    <div class="how-to-container main-container">
      <h4>Как заказать?</h4>
      <div class="steps">
        <div class="request-container">
          <div class="request">
            <h6>Оставить заявку</h6>
            <p>
              Вы можете оставить свой номер телефона в форме для обратной связи
              и в ближайшее время наши менеджеры обязательно с Вами свяжутся.
              Либо выберите интересующий Вас товар и добавьте его в корзину,
              оформив заказ на сайте.
            </p>
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
.how-to-container
  color: var(--on-primary-alt)
  text-transform: uppercase
  h4::after
    content: ''
    display: inline-block
    width: 90px
    height: 2px
    margin: auto 0 17px 40px
    background: var(--on-primary-alt)
  .steps
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    column-gap: 2em
    .request-container
      grid-column: 2
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
