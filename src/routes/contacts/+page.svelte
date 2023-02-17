<script lang="ts">
  import { mode } from "$lib/store/ui"
</script>

<section class="contacts-grid">
  <div>
    <h4>ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «ЛАЙМ»</h4>
    <div class="with-line">
      <span>ИНН: 7842208838</span>
      <br />
      <span>КПП: 784201001</span>
    </div>
  </div>
  <div>
    <h4 class="with-line">Адрес</h4>
    <h6>
      <i>location_on</i>
      191144, РФ, город Санкт-Петербург, улица 8-я Советская, 48, литера А, помещение
      14-H
    </h6>
    <h6>
      <a href="tel:8-800-700-4332">
        <i>phone</i>
        8-800-700-4332
      </a>
    </h6>
  </div>
  <div>
    <p>
      Товар складирован в Москве (Сигнальный проезд). Оплаченный заказ доступно
      забрать самостоятельно (самовывоз) или оформить доставку транспортной
      компанией (услуги доставки не входят в цену товара).
    </p>
    <p>
      Оплатить товар можно по банковским реквизитам организации после
      подтверждения заказа. Покупатель может заплатить как физическое лицо или
      как юридическое с получением всех отчетных финансовых документов. При
      обнаружении производственного брака, подтвержденного документально,
      производится обмен товара или возврат денежных средств в соответствии с
      действующим законодательством РФ.
    </p>
    <ul class="socials">
      <li>
        <a
          class="medium-elevate round"
          href="mailto:plant812lime@gmail.com?subject=Запрос Обратной Связи">
          <i>alternate_email</i>
          <div class="tooltip tertiary-container small-elevate left">
            plant812lime@gmail.com
          </div>
        </a>
      </li>
      <li>
        <a class="medium-elevate round" href="https://vk.com/public217958875">
          <img src="/icons/vk.svg" alt="vk logo" />
          <div class="tooltip tertiary-container small-elevate left">
            https://vk.com/public217958875
          </div>
        </a>
      </li>
      <li>
        <a class="medium-elevate round" href="https://t.me/LimeCompany812">
          <img src="/icons/telegram.svg" alt="telegram logo" />
          <div class="tooltip tertiary-container small-elevate left">
            https://t.me/LimeCompany812
          </div>
        </a>
      </li>
      <li>
        <a class="medium-elevate round" href="tel:8-800-700-4332">
          <i>phone</i>
          <div class="tooltip tertiary-container small-elevate left">
            8-800-700-4332
          </div>
        </a>
      </li>
    </ul>
  </div>
  <iframe
    class:dark-map={$mode}
    class="round small-elevate y-border"
    title="location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1998.844463347586!2d30.374978337534746!3d59.9347230239013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46963195fbc31ab5%3A0x5078bf29fd779338!2s8-Ya%20Sovetskaya%20Ulitsa%2C%2048%2C%20Sankt-Peterburg%2C%20Russia%2C%20191036!5e0!3m2!1sen!2scz!4v1675203306891!5m2!1sen!2scz"
    width="600"
    height="450"
    style="border:0;"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade" />
</section>

<style lang="sass">
.contacts-grid
  display: grid
  grid-template-columns: 1fr 1fr
  column-gap: 1em
  padding-bottom: 1em
  .socials
    position: absolute
    bottom: 0
    right: 0
    li
      list-style-type: none
      margin-top: 5px
    img, i
      width: 40px
      height: 40px
      font-size: 40px
    .tooltip.left
      left:-5px

  .with-line::after
    content: ''
    display: inline-block
    width: 90px
    height: 2px
    margin: auto 0 17px 40px
    background: var(--primary)
  .dark-map
    filter: invert(82%) contrast(83%)
</style>
