import { c as create_ssr_component, v as validate_component } from './index-78ec5457.js';

const css$1 = {
  code: "header.svelte-1migler{margin-bottom:3em;position:sticky;top:0;z-index:9999;border-bottom:2px solid var(--primary)}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<header class="${"small-padding svelte-1migler"}"><nav class="${"main-container"}"><a href="${"/"}"><img src="${"/home-logo.png"}" alt="${"logo"}" style="${"max-height: 80px"}"></a>
    <div class="${"max"}"></div>
    <a href="${"?"}"><button class="${"transparent no-round upper extra small-elevate"}">О компании</button></a>
    <a href="${"?"}"><button class="${"transparent no-round upper extra small-elevate"}">акции</button></a>
    <a href="${"?"}"><button class="${"transparent no-round upper extra small-elevate"}">контакты</button></a>
    <a href="${"?"}"><button class="${"no-round border upper extra small-elevate y-border"}">прайс</button></a>
    <button class="${"circle transparent"}"><i>light_mode</i></button></nav>
</header>`;
});
const css = {
  code: ".content-grid.svelte-i3yamg.svelte-i3yamg{padding-top:1em;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;column-gap:2em}.content-grid.svelte-i3yamg>.svelte-i3yamg{text-transform:capitalize;display:flex;flex-direction:column;align-items:flex-start;margin-top:1em}.content-grid.svelte-i3yamg .location img.svelte-i3yamg{max-width:100%;object-fit:contain}.content-grid.svelte-i3yamg .links.svelte-i3yamg{grid-column:3}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<footer class="${"secondary bottom"}"><div class="${"content-grid main-container svelte-i3yamg"}"><div class="${"location svelte-i3yamg"}"><img src="${"/logo-w.png"}" alt="${"logo-alt"}" class="${"svelte-i3yamg"}">
      <h6>Магазин-склад ООО «ЛАЙМ»</h6>
      <p>191144, Санкт-Петербург, 8-я Советская, 48, лит А, пом 14Н</p>
      <p>Складские помещения расположены в Москве (Сигнальный проезд) с
        возможностью самовывоза или адресной доставки через транспортную
        компанию.
      </p></div>
    <nav class="${"links svelte-i3yamg"}"><h6>Навигация</h6>
      <a href="${"/"}">о компании</a>
      <a href="${"/"}">акции</a>
      <a href="${"/"}">контакты</a>
      <a href="${"/"}">прайс</a></nav>
    <div class="${"help svelte-i3yamg"}"><h6>поддержка</h6>
      <div class="${"field label prefix border"}"><i>email</i>
        <input type="${"email"}" id="${"support-email"}">
        <label for="${"support-email"}">Свяжитесь с нами</label></div></div></div>
</footer>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
<div class="${"content"}">${slots.default ? slots.default({}) : ``}</div>
${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-75d4d3ef.js.map
