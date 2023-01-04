<script lang="ts">
  import { Swiper, SwiperSlide } from "swiper/svelte"
  import { Navigation, Pagination, Autoplay } from "swiper"

  import "swiper/scss"
  import "swiper/scss/pagination"
  import "swiper/scss/navigation"
  import "@/theme/swiper.scss"
</script>

<Swiper
  spaceBetween={30}
  centeredSlides={true}
  autoplay
  pagination={{
    clickable: true,
  }}
  navigation={true}
  modules={[Autoplay, Pagination, Navigation]}
  class="mySwiper">
  <SwiperSlide>Slide 1</SwiperSlide>
  <SwiperSlide>Slide 2</SwiperSlide>
  <SwiperSlide>Slide 3</SwiperSlide>
  <SwiperSlide>Slide 4</SwiperSlide>
</Swiper>

<style lang="scss">
</style>
