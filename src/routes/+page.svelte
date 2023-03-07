<script lang="ts">
  import FeaturedProducts from "./home/FeaturedProducts.svelte"
  import OrderModal from "$lib/common/OrderModal.svelte"
  export let data: {
    featuredProducts: [
      | {
          sectionTitle: string
          tabContent: {
            title: string
            items: {
              src: string
              cardTitle: string
              description: string
              SKU: string
              optionalMessage?: string | undefined
            }[]
          }[]
        }
      | undefined
    ]
  }
  let unique: number = 0
  let activeModal: boolean = false
  let subject: string
  let orderItem: {
    src: string
    cardTitle: string
    description: string
    SKU: string
    optionalMessage?: string
  }
  function openModal(item: {
    src: string
    cardTitle: string
    description: string
    SKU: string
    optionalMessage?: string
  }): void {
    const { SKU } = item
    orderItem = item
    activeModal = true
    subject = `Зaказ ${SKU}`
    unique++
  }

  import { Swiper, SwiperSlide } from "swiper/svelte"
  import { Autoplay, Pagination } from "swiper"

  import "swiper/scss"
  import "swiper/scss/pagination"
  import "@/theme/swiper.scss"
  import { onDestroy } from "svelte"
  import EmailForm from "@/lib/common/EmailForm.svelte"

  onDestroy(() => {
    unique = 0
  })
</script>

<section class="jumbo-container main-container">
  <div class="large-padding round small-elevate jumbo-anno-box background">
    <div class="y-border round large-padding jumbo-text">
      ЭЛЕКТРИЧЕСКИЙ ТЕПЛЫЙ ПОЛ
    </div>
    <p>ПРОДАЖА ОТ ПРЯМОГО ИМПОРТЕРА</p>
    <a href="/catalog" class="no-margin small-padding round primary-container">
      прайсы
    </a>
  </div>

  <Swiper
    spaceBetween={30}
    centeredSlides={true}
    pagination
    modules={[Autoplay, Pagination]}
    autoplay={{
      delay: 3500,
      disableOnInteraction: false,
    }}
    class="mySwiper">
    <SwiperSlide>
      <img src="/jumbo-slides/slide-1.png" alt="slide-1" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="/jumbo-slides/slide-2.png" alt="slide-2" />
    </SwiperSlide>
    <!-- <SwiperSlide
      ><img src="/jumbo-slides/slide-3.png" alt="slide-3" /></SwiperSlide> -->
  </Swiper>
</section>
{#each data.featuredProducts as section, i}
  <FeaturedProducts
    on:req:openModal={(payload) => {
      openModal(payload.detail)
    }}
    tabs={section}
    serialNumber={i.toString()} />
{/each}
{#key unique}
  <OrderModal active={activeModal} {subject} item={orderItem} />
{/key}
<section class="primary-container medium-padding wide">
  <div class="how-to-container main-container">
    <h4>Как заказать?</h4>
    <div class="steps">
      <div class="request-container">
        <div class="request">
          <h6>Оставить заявку</h6>
          <p>
            Вы можете оставить свой номер телефона в форме для обратной связи и
            в ближайшее время наши менеджеры обязательно с Вами свяжутся. Либо
            оставьте ваш почтовый адресс, и мы вам обязательно напишем.
          </p>
        </div>
        <EmailForm key="order-email" />
      </div>
    </div>
  </div>
</section>

<style lang="sass">
.jumbo-container
  .jumbo-anno-box
    display: grid
    position: absolute
    bottom: 10%
    z-index: 2
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
