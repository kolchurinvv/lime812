import { c as create_ssr_component, b as add_attribute, e as escape } from './index-f0420157.js';
import '@emailjs/browser';

const css = {
  code: "#order-email.svelte-jaw0gw:focus{border-color:var(--secondary)}",
  map: null
};
const GetCustomerEmail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { placeholderText = "Ваша почта" } = $$props;
  let { key } = $$props;
  let sendersEmail = "";
  if ($$props.placeholderText === void 0 && $$bindings.placeholderText && placeholderText !== void 0)
    $$bindings.placeholderText(placeholderText);
  if ($$props.key === void 0 && $$bindings.key && key !== void 0)
    $$bindings.key(key);
  $$result.css.add(css);
  return `<div class="${"field label prefix border "}"><i>email</i>
  <input type="${"email"}"${add_attribute("id", key, 0)} class="${"svelte-jaw0gw"}"${add_attribute("value", sendersEmail, 0)}>
  <label class="${"secondary transparent"}"${add_attribute("for", key, 0)}>${escape(placeholderText)}</label>
</div>`;
});

export { GetCustomerEmail as G };
//# sourceMappingURL=GetCustomerEmail-3fea0788.js.map
