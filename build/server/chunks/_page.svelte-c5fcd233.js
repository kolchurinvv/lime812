import { c as create_ssr_component, v as validate_component, d as each$1, o as onDestroy, e as escape, f as add_attribute, h as compute_rest_props, i as createEventDispatcher, s as setContext, j as spread, k as escape_attribute_value, l as escape_object, p as is_void, g as getContext, t as tick } from './index-e6cef8e1.js';

/**
 * SSR Window 4.0.2
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2021, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: December 13, 2021
 */
/* eslint-disable no-param-reassign */
function isObject$2(obj) {
    return (obj !== null &&
        typeof obj === 'object' &&
        'constructor' in obj &&
        obj.constructor === Object);
}
function extend$2(target = {}, src = {}) {
    Object.keys(src).forEach((key) => {
        if (typeof target[key] === 'undefined')
            target[key] = src[key];
        else if (isObject$2(src[key]) &&
            isObject$2(target[key]) &&
            Object.keys(src[key]).length > 0) {
            extend$2(target[key], src[key]);
        }
    });
}

const ssrDocument = {
    body: {},
    addEventListener() { },
    removeEventListener() { },
    activeElement: {
        blur() { },
        nodeName: '',
    },
    querySelector() {
        return null;
    },
    querySelectorAll() {
        return [];
    },
    getElementById() {
        return null;
    },
    createEvent() {
        return {
            initEvent() { },
        };
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() { },
            getElementsByTagName() {
                return [];
            },
        };
    },
    createElementNS() {
        return {};
    },
    importNode() {
        return null;
    },
    location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: '',
    },
};
function getDocument() {
    const doc = typeof document !== 'undefined' ? document : {};
    extend$2(doc, ssrDocument);
    return doc;
}

const ssrWindow = {
    document: ssrDocument,
    navigator: {
        userAgent: '',
    },
    location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: '',
    },
    history: {
        replaceState() { },
        pushState() { },
        go() { },
        back() { },
    },
    CustomEvent: function CustomEvent() {
        return this;
    },
    addEventListener() { },
    removeEventListener() { },
    getComputedStyle() {
        return {
            getPropertyValue() {
                return '';
            },
        };
    },
    Image() { },
    Date() { },
    screen: {},
    setTimeout() { },
    clearTimeout() { },
    matchMedia() {
        return {};
    },
    requestAnimationFrame(callback) {
        if (typeof setTimeout === 'undefined') {
            callback();
            return null;
        }
        return setTimeout(callback, 0);
    },
    cancelAnimationFrame(id) {
        if (typeof setTimeout === 'undefined') {
            return;
        }
        clearTimeout(id);
    },
};
function getWindow() {
    const win = typeof window !== 'undefined' ? window : {};
    extend$2(win, ssrWindow);
    return win;
}

/**
 * Dom7 4.0.4
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * https://framework7.io/docs/dom7.html
 *
 * Copyright 2022, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: January 11, 2022
 */

/* eslint-disable no-proto */
function makeReactive(obj) {
  const proto = obj.__proto__;
  Object.defineProperty(obj, '__proto__', {
    get() {
      return proto;
    },

    set(value) {
      proto.__proto__ = value;
    }

  });
}

class Dom7 extends Array {
  constructor(items) {
    if (typeof items === 'number') {
      super(items);
    } else {
      super(...(items || []));
      makeReactive(this);
    }
  }

}

function arrayFlat(arr = []) {
  const res = [];
  arr.forEach(el => {
    if (Array.isArray(el)) {
      res.push(...arrayFlat(el));
    } else {
      res.push(el);
    }
  });
  return res;
}
function arrayFilter(arr, callback) {
  return Array.prototype.filter.call(arr, callback);
}
function arrayUnique(arr) {
  const uniqueArray = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
  }

  return uniqueArray;
}

// eslint-disable-next-line

function qsa(selector, context) {
  if (typeof selector !== 'string') {
    return [selector];
  }

  const a = [];
  const res = context.querySelectorAll(selector);

  for (let i = 0; i < res.length; i += 1) {
    a.push(res[i]);
  }

  return a;
}

function $(selector, context) {
  const window = getWindow();
  const document = getDocument();
  let arr = [];

  if (!context && selector instanceof Dom7) {
    return selector;
  }

  if (!selector) {
    return new Dom7(arr);
  }

  if (typeof selector === 'string') {
    const html = selector.trim();

    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
      let toCreate = 'div';
      if (html.indexOf('<li') === 0) toCreate = 'ul';
      if (html.indexOf('<tr') === 0) toCreate = 'tbody';
      if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
      if (html.indexOf('<tbody') === 0) toCreate = 'table';
      if (html.indexOf('<option') === 0) toCreate = 'select';
      const tempParent = document.createElement(toCreate);
      tempParent.innerHTML = html;

      for (let i = 0; i < tempParent.childNodes.length; i += 1) {
        arr.push(tempParent.childNodes[i]);
      }
    } else {
      arr = qsa(selector.trim(), context || document);
    } // arr = qsa(selector, document);

  } else if (selector.nodeType || selector === window || selector === document) {
    arr.push(selector);
  } else if (Array.isArray(selector)) {
    if (selector instanceof Dom7) return selector;
    arr = selector;
  }

  return new Dom7(arrayUnique(arr));
}

$.fn = Dom7.prototype;

// eslint-disable-next-line

function addClass(...classes) {
  const classNames = arrayFlat(classes.map(c => c.split(' ')));
  this.forEach(el => {
    el.classList.add(...classNames);
  });
  return this;
}

function removeClass(...classes) {
  const classNames = arrayFlat(classes.map(c => c.split(' ')));
  this.forEach(el => {
    el.classList.remove(...classNames);
  });
  return this;
}

function toggleClass(...classes) {
  const classNames = arrayFlat(classes.map(c => c.split(' ')));
  this.forEach(el => {
    classNames.forEach(className => {
      el.classList.toggle(className);
    });
  });
}

function hasClass(...classes) {
  const classNames = arrayFlat(classes.map(c => c.split(' ')));
  return arrayFilter(this, el => {
    return classNames.filter(className => el.classList.contains(className)).length > 0;
  }).length > 0;
}

function attr(attrs, value) {
  if (arguments.length === 1 && typeof attrs === 'string') {
    // Get attr
    if (this[0]) return this[0].getAttribute(attrs);
    return undefined;
  } // Set attrs


  for (let i = 0; i < this.length; i += 1) {
    if (arguments.length === 2) {
      // String
      this[i].setAttribute(attrs, value);
    } else {
      // Object
      for (const attrName in attrs) {
        this[i][attrName] = attrs[attrName];
        this[i].setAttribute(attrName, attrs[attrName]);
      }
    }
  }

  return this;
}

function removeAttr(attr) {
  for (let i = 0; i < this.length; i += 1) {
    this[i].removeAttribute(attr);
  }

  return this;
}

function transform(transform) {
  for (let i = 0; i < this.length; i += 1) {
    this[i].style.transform = transform;
  }

  return this;
}

function transition$1(duration) {
  for (let i = 0; i < this.length; i += 1) {
    this[i].style.transitionDuration = typeof duration !== 'string' ? `${duration}ms` : duration;
  }

  return this;
}

function on(...args) {
  let [eventType, targetSelector, listener, capture] = args;

  if (typeof args[1] === 'function') {
    [eventType, listener, capture] = args;
    targetSelector = undefined;
  }

  if (!capture) capture = false;

  function handleLiveEvent(e) {
    const target = e.target;
    if (!target) return;
    const eventData = e.target.dom7EventData || [];

    if (eventData.indexOf(e) < 0) {
      eventData.unshift(e);
    }

    if ($(target).is(targetSelector)) listener.apply(target, eventData);else {
      const parents = $(target).parents(); // eslint-disable-line

      for (let k = 0; k < parents.length; k += 1) {
        if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
      }
    }
  }

  function handleEvent(e) {
    const eventData = e && e.target ? e.target.dom7EventData || [] : [];

    if (eventData.indexOf(e) < 0) {
      eventData.unshift(e);
    }

    listener.apply(this, eventData);
  }

  const events = eventType.split(' ');
  let j;

  for (let i = 0; i < this.length; i += 1) {
    const el = this[i];

    if (!targetSelector) {
      for (j = 0; j < events.length; j += 1) {
        const event = events[j];
        if (!el.dom7Listeners) el.dom7Listeners = {};
        if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
        el.dom7Listeners[event].push({
          listener,
          proxyListener: handleEvent
        });
        el.addEventListener(event, handleEvent, capture);
      }
    } else {
      // Live events
      for (j = 0; j < events.length; j += 1) {
        const event = events[j];
        if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
        if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
        el.dom7LiveListeners[event].push({
          listener,
          proxyListener: handleLiveEvent
        });
        el.addEventListener(event, handleLiveEvent, capture);
      }
    }
  }

  return this;
}

function off(...args) {
  let [eventType, targetSelector, listener, capture] = args;

  if (typeof args[1] === 'function') {
    [eventType, listener, capture] = args;
    targetSelector = undefined;
  }

  if (!capture) capture = false;
  const events = eventType.split(' ');

  for (let i = 0; i < events.length; i += 1) {
    const event = events[i];

    for (let j = 0; j < this.length; j += 1) {
      const el = this[j];
      let handlers;

      if (!targetSelector && el.dom7Listeners) {
        handlers = el.dom7Listeners[event];
      } else if (targetSelector && el.dom7LiveListeners) {
        handlers = el.dom7LiveListeners[event];
      }

      if (handlers && handlers.length) {
        for (let k = handlers.length - 1; k >= 0; k -= 1) {
          const handler = handlers[k];

          if (listener && handler.listener === listener) {
            el.removeEventListener(event, handler.proxyListener, capture);
            handlers.splice(k, 1);
          } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
            el.removeEventListener(event, handler.proxyListener, capture);
            handlers.splice(k, 1);
          } else if (!listener) {
            el.removeEventListener(event, handler.proxyListener, capture);
            handlers.splice(k, 1);
          }
        }
      }
    }
  }

  return this;
}

function trigger(...args) {
  const window = getWindow();
  const events = args[0].split(' ');
  const eventData = args[1];

  for (let i = 0; i < events.length; i += 1) {
    const event = events[i];

    for (let j = 0; j < this.length; j += 1) {
      const el = this[j];

      if (window.CustomEvent) {
        const evt = new window.CustomEvent(event, {
          detail: eventData,
          bubbles: true,
          cancelable: true
        });
        el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }
  }

  return this;
}

function transitionEnd$1(callback) {
  const dom = this;

  function fireCallBack(e) {
    if (e.target !== this) return;
    callback.call(this, e);
    dom.off('transitionend', fireCallBack);
  }

  if (callback) {
    dom.on('transitionend', fireCallBack);
  }

  return this;
}

function outerWidth(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      const styles = this.styles();
      return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
    }

    return this[0].offsetWidth;
  }

  return null;
}

function outerHeight(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      const styles = this.styles();
      return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
    }

    return this[0].offsetHeight;
  }

  return null;
}

function offset() {
  if (this.length > 0) {
    const window = getWindow();
    const document = getDocument();
    const el = this[0];
    const box = el.getBoundingClientRect();
    const body = document.body;
    const clientTop = el.clientTop || body.clientTop || 0;
    const clientLeft = el.clientLeft || body.clientLeft || 0;
    const scrollTop = el === window ? window.scrollY : el.scrollTop;
    const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
    return {
      top: box.top + scrollTop - clientTop,
      left: box.left + scrollLeft - clientLeft
    };
  }

  return null;
}

function styles() {
  const window = getWindow();
  if (this[0]) return window.getComputedStyle(this[0], null);
  return {};
}

function css$2(props, value) {
  const window = getWindow();
  let i;

  if (arguments.length === 1) {
    if (typeof props === 'string') {
      // .css('width')
      if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
    } else {
      // .css({ width: '100px' })
      for (i = 0; i < this.length; i += 1) {
        for (const prop in props) {
          this[i].style[prop] = props[prop];
        }
      }

      return this;
    }
  }

  if (arguments.length === 2 && typeof props === 'string') {
    // .css('width', '100px')
    for (i = 0; i < this.length; i += 1) {
      this[i].style[props] = value;
    }

    return this;
  }

  return this;
}

function each(callback) {
  if (!callback) return this;
  this.forEach((el, index) => {
    callback.apply(el, [el, index]);
  });
  return this;
}

function filter(callback) {
  const result = arrayFilter(this, callback);
  return $(result);
}

function html(html) {
  if (typeof html === 'undefined') {
    return this[0] ? this[0].innerHTML : null;
  }

  for (let i = 0; i < this.length; i += 1) {
    this[i].innerHTML = html;
  }

  return this;
}

function text(text) {
  if (typeof text === 'undefined') {
    return this[0] ? this[0].textContent.trim() : null;
  }

  for (let i = 0; i < this.length; i += 1) {
    this[i].textContent = text;
  }

  return this;
}

function is(selector) {
  const window = getWindow();
  const document = getDocument();
  const el = this[0];
  let compareWith;
  let i;
  if (!el || typeof selector === 'undefined') return false;

  if (typeof selector === 'string') {
    if (el.matches) return el.matches(selector);
    if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
    if (el.msMatchesSelector) return el.msMatchesSelector(selector);
    compareWith = $(selector);

    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) return true;
    }

    return false;
  }

  if (selector === document) {
    return el === document;
  }

  if (selector === window) {
    return el === window;
  }

  if (selector.nodeType || selector instanceof Dom7) {
    compareWith = selector.nodeType ? [selector] : selector;

    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) return true;
    }

    return false;
  }

  return false;
}

function index() {
  let child = this[0];
  let i;

  if (child) {
    i = 0; // eslint-disable-next-line

    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) i += 1;
    }

    return i;
  }

  return undefined;
}

function eq(index) {
  if (typeof index === 'undefined') return this;
  const length = this.length;

  if (index > length - 1) {
    return $([]);
  }

  if (index < 0) {
    const returnIndex = length + index;
    if (returnIndex < 0) return $([]);
    return $([this[returnIndex]]);
  }

  return $([this[index]]);
}

function append(...els) {
  let newChild;
  const document = getDocument();

  for (let k = 0; k < els.length; k += 1) {
    newChild = els[k];

    for (let i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newChild;

        while (tempDiv.firstChild) {
          this[i].appendChild(tempDiv.firstChild);
        }
      } else if (newChild instanceof Dom7) {
        for (let j = 0; j < newChild.length; j += 1) {
          this[i].appendChild(newChild[j]);
        }
      } else {
        this[i].appendChild(newChild);
      }
    }
  }

  return this;
}

function prepend(newChild) {
  const document = getDocument();
  let i;
  let j;

  for (i = 0; i < this.length; i += 1) {
    if (typeof newChild === 'string') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = newChild;

      for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
        this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
      }
    } else if (newChild instanceof Dom7) {
      for (j = 0; j < newChild.length; j += 1) {
        this[i].insertBefore(newChild[j], this[i].childNodes[0]);
      }
    } else {
      this[i].insertBefore(newChild, this[i].childNodes[0]);
    }
  }

  return this;
}

function next(selector) {
  if (this.length > 0) {
    if (selector) {
      if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
        return $([this[0].nextElementSibling]);
      }

      return $([]);
    }

    if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
    return $([]);
  }

  return $([]);
}

function nextAll(selector) {
  const nextEls = [];
  let el = this[0];
  if (!el) return $([]);

  while (el.nextElementSibling) {
    const next = el.nextElementSibling; // eslint-disable-line

    if (selector) {
      if ($(next).is(selector)) nextEls.push(next);
    } else nextEls.push(next);

    el = next;
  }

  return $(nextEls);
}

function prev(selector) {
  if (this.length > 0) {
    const el = this[0];

    if (selector) {
      if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
        return $([el.previousElementSibling]);
      }

      return $([]);
    }

    if (el.previousElementSibling) return $([el.previousElementSibling]);
    return $([]);
  }

  return $([]);
}

function prevAll(selector) {
  const prevEls = [];
  let el = this[0];
  if (!el) return $([]);

  while (el.previousElementSibling) {
    const prev = el.previousElementSibling; // eslint-disable-line

    if (selector) {
      if ($(prev).is(selector)) prevEls.push(prev);
    } else prevEls.push(prev);

    el = prev;
  }

  return $(prevEls);
}

function parent(selector) {
  const parents = []; // eslint-disable-line

  for (let i = 0; i < this.length; i += 1) {
    if (this[i].parentNode !== null) {
      if (selector) {
        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
      } else {
        parents.push(this[i].parentNode);
      }
    }
  }

  return $(parents);
}

function parents(selector) {
  const parents = []; // eslint-disable-line

  for (let i = 0; i < this.length; i += 1) {
    let parent = this[i].parentNode; // eslint-disable-line

    while (parent) {
      if (selector) {
        if ($(parent).is(selector)) parents.push(parent);
      } else {
        parents.push(parent);
      }

      parent = parent.parentNode;
    }
  }

  return $(parents);
}

function closest(selector) {
  let closest = this; // eslint-disable-line

  if (typeof selector === 'undefined') {
    return $([]);
  }

  if (!closest.is(selector)) {
    closest = closest.parents(selector).eq(0);
  }

  return closest;
}

function find(selector) {
  const foundElements = [];

  for (let i = 0; i < this.length; i += 1) {
    const found = this[i].querySelectorAll(selector);

    for (let j = 0; j < found.length; j += 1) {
      foundElements.push(found[j]);
    }
  }

  return $(foundElements);
}

function children(selector) {
  const children = []; // eslint-disable-line

  for (let i = 0; i < this.length; i += 1) {
    const childNodes = this[i].children;

    for (let j = 0; j < childNodes.length; j += 1) {
      if (!selector || $(childNodes[j]).is(selector)) {
        children.push(childNodes[j]);
      }
    }
  }

  return $(children);
}

function remove() {
  for (let i = 0; i < this.length; i += 1) {
    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
  }

  return this;
}

const css$1 = {
  code: 'section.svelte-1glpec4.svelte-1glpec4.svelte-1glpec4:nth-child(2n-2){background-color:var(--background)}section.svelte-1glpec4>div.svelte-1glpec4.svelte-1glpec4{text-transform:uppercase}section.svelte-1glpec4>div h4.svelte-1glpec4.svelte-1glpec4::after{content:"";display:inline-block;width:90px;height:2px;margin:auto 0 17px 40px;background:var(--primary)}section.svelte-1glpec4>div nav.svelte-1glpec4.svelte-1glpec4{width:100%}section.svelte-1glpec4>div nav.svelte-1glpec4>button.svelte-1glpec4{position:relative;z-index:1;text-transform:uppercase}section.svelte-1glpec4>div nav.svelte-1glpec4>button.svelte-1glpec4:hover::after,section.svelte-1glpec4>div nav.svelte-1glpec4>button.svelte-1glpec4:focus::after{background-image:radial-gradient(circle, var(--primary) 1%, transparent 1%);z-index:-1}section.svelte-1glpec4>div nav.svelte-1glpec4>.tab-title.svelte-1glpec4{flex-grow:1}section.svelte-1glpec4>div .featured-products.svelte-1glpec4>.svelte-1glpec4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;grid-auto-flow:column;column-gap:2em}section.svelte-1glpec4>div .featured-products>* article.svelte-1glpec4.svelte-1glpec4{margin-top:16rem;text-transform:initial;min-width:210px}section.svelte-1glpec4>div .featured-products>* article.svelte-1glpec4>img.svelte-1glpec4{object-fit:contain}',
  map: null
};
const FeaturedProducts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { serialNumber } = $$props;
  let { tabs = { sectionTitle: "", tabContent: [] } } = $$props;
  const timeOuts = [];
  onDestroy(() => {
    for (const tm of timeOuts) {
      clearTimeout(tm);
    }
  });
  if ($$props.serialNumber === void 0 && $$bindings.serialNumber && serialNumber !== void 0)
    $$bindings.serialNumber(serialNumber);
  if ($$props.tabs === void 0 && $$bindings.tabs && tabs !== void 0)
    $$bindings.tabs(tabs);
  $$result.css.add(css$1);
  return `<section class="${"medium-padding svelte-1glpec4"}"><div class="${"main-container svelte-1glpec4"}"><h4 class="${"svelte-1glpec4"}">${escape(tabs.sectionTitle)}</h4>
    <nav class="${"no-space svelte-1glpec4"}">${each$1(tabs.tabContent, (tab, index2) => {
    return `<button class="${"y-border no-round transparent tab-title primary filled svelte-1glpec4"}" data-ui="${"#page" + escape(index2, true) + escape(serialNumber, true)}">${escape(tab.title)}</button>`;
  })}</nav>
    <div class="${"featured-products svelte-1glpec4"}">${each$1(tabs.tabContent, (tab, index2) => {
    return `<div class="${"page right svelte-1glpec4"}" id="${"page" + escape(index2, true) + escape(serialNumber, true)}">${each$1(tab.items, (item) => {
      return `<article class="${"no-padding no-round svelte-1glpec4"}"><img class="${"responsive small no-round svelte-1glpec4"}" alt="${"featured product"}"${add_attribute("src", item.src, 0)}>
              <div class="${"padding"}"><h6>${escape(item.cardTitle)}</h6>
                <p>${escape(item.description)}</p>
                <nav class="${"svelte-1glpec4"}"><button class="${"no-round svelte-1glpec4"}">Скачать Прайс</button>
                </nav></div>
            </article>`;
    })}
        </div>`;
  })}</div></div>
</section>`;
});
const featuredProducts = [
  {
    sectionTitle: "теплый пол",
    tabContent: [
      {
        title: "Кабельный теплый пол в стяжку",
        items: [
          {
            src: "/in-floor_heating/tab-1/eco_pdsv_20.jpg",
            cardTitle: "In-Term ECO PDSV 20",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/in-floor_heating/tab-1/unifloor15.jpg",
            cardTitle: "Unifloor 15 Вт/м",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/in-floor_heating/tab-1/in-term_adsv_20.jpg",
            cardTitle: "In-Therm ADSV 20",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/in-floor_heating/tab-1/fenix_adsv_18.jpg",
            cardTitle: "Fenix ADSV 18",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          }
        ]
      },
      {
        title: "Тонкий теплый пол под плитку",
        items: [
          {
            src: "/in-floor_heating/tab-2/hemstedt_dr.jpg",
            cardTitle: "Hemstedt DR",
            description: "Нагревательные маты используются, когда необходимо минимально поднять уровень пола или для быстрого обогрева пола."
          },
          {
            src: "/in-floor_heating/tab-2/Fenix_ADSV_10.JPG",
            cardTitle: "Fenix ADSV 10",
            description: "Тонкий кабель для укладки под плитку. Монтаж производится на готовую стяжку под напольное покрытие в клеевой раствор или самовыравнивающую смесь. "
          },
          {
            src: "/in-floor_heating/tab-2/Fenix_ADSA_12.JPG",
            cardTitle: "Fenix ADSA 12",
            description: "Ультратонкий нагревательный кабель ADSA для укладки в плиточный клей для плитки или самовыравнивающую смесь."
          }
        ]
      },
      {
        title: "Нагревательные маты под плитку",
        items: [
          {
            src: "/in-floor_heating/tab-3/unifloor.jpg",
            cardTitle: "Unifloor",
            description: "Нагревательные маты используются, когда необходимо минимально поднять уровень пола или для быстрого обогрева пола."
          },
          {
            src: "/in-floor_heating/tab-3/in-thermeco.jpg",
            cardTitle: "In-Therm ECO",
            description: "Рекомендуем использование продукции Fenix и IN-THERM для укладки в плиточный клей"
          },
          {
            src: "/in-floor_heating/tab-3/in-therm_ldts.jpg",
            cardTitle: "In-Therm LDTS",
            description: "Нагревательные маты используются, когда необходимо минимально поднять уровень пола или для быстрого обогрева пола."
          },
          {
            src: "/in-floor_heating/tab-3/fenix_ldts.jpg",
            cardTitle: "Fenix LDTS",
            description: "Рекомендуем использование продукции Fenix и IN-THERM для укладки в плиточный клей"
          }
        ]
      },
      {
        title: "теплый пол под ламинат",
        items: [
          {
            src: "/in-floor_heating/tab-4/in-therm_t.png",
            cardTitle: "In-Term T",
            description: "Нагревательная пленка состоит из нагревательного элемента (графита, параллельные черные полосы) и питающих медных шин для подвода питания. "
          },
          {
            src: "/in-floor_heating/tab-4/in-therm_mh.png",
            cardTitle: "In-Term MH",
            description: "Нагревательная пленка состоит из нагревательного элемента (графита, параллельные черные полосы) и питающих медных шин для подвода питания. "
          },
          {
            src: "/in-floor_heating/tab-4/in-term_afmat.jpg",
            cardTitle: "In-Therm AFMAT",
            description: "Алюминиевые маты используются для укладки под ламинат, паркетную доску и толстый ковролин (от 3 мм)."
          },
          {
            src: "/in-floor_heating/tab-4/in-therm_aen.jpg",
            cardTitle: "In-Term AEN",
            description: "Нагревательная пленка состоит из нагревательного элемента (графита, параллельные черные полосы) и питающих медных шин для подвода питания. "
          }
        ]
      }
    ]
  },
  {
    sectionTitle: "Термостаты",
    tabContent: [
      {
        title: "Аналоговые термостаты для теплого пола",
        items: [
          {
            src: "/thermostats/tab-1/eberle_rtr-e_61221.JPG",
            cardTitle: "Eberle RTR-E 6121",
            description: ""
          },
          {
            src: "/thermostats/tab-1/in-therm_rtc_70.JPG",
            cardTitle: "In-therm RTC 70",
            description: ""
          },
          {
            src: "/thermostats/tab-1/eberle_fre_525-31.JPG",
            cardTitle: "Eberle FRE 525-31",
            description: ""
          },
          {
            src: "/thermostats/tab-1/eberle_f2a_50.JPG",
            cardTitle: "Eberle F2A-50",
            description: ""
          }
        ]
      },
      {
        title: "Программируемые термостаты для теплого пола",
        items: [
          {
            src: "/featured-1/eco_pdsv_20.jpg",
            cardTitle: "In-Term ECO PDSV 20",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/unifloor15.jpg",
            cardTitle: "Unifloor 15 Вт/м",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/in-term_adsv_20.jpg",
            cardTitle: "In-Therm ADSV 20",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/fenix_adsv_18.jpg",
            cardTitle: "Fenix ADSV 18",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          }
        ]
      },
      {
        title: "Термостаты для наружного обогрева",
        items: [
          {
            src: "/featured-1/eco_pdsv_20.jpg",
            cardTitle: "In-Term ECO PDSV 20",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/unifloor15.jpg",
            cardTitle: "Unifloor 15 Вт/м",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/in-term_adsv_20.jpg",
            cardTitle: "In-Therm ADSV 20",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/fenix_adsv_18.jpg",
            cardTitle: "Fenix ADSV 18",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          }
        ]
      }
    ]
  },
  {
    sectionTitle: " Наружный обогрев",
    tabContent: [
      {
        title: "Обогрев водостоков",
        items: [
          {
            src: "/featured-1/eco_pdsv_20.jpg",
            cardTitle: "In-Term ECO PDSV 20",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/unifloor15.jpg",
            cardTitle: "Unifloor 15 Вт/м",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/in-term_adsv_20.jpg",
            cardTitle: "In-Therm ADSV 20",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/fenix_adsv_18.jpg",
            cardTitle: "Fenix ADSV 18",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          }
        ]
      },
      {
        title: "Обогрев труб",
        items: [
          {
            src: "/featured-1/eco_pdsv_20.jpg",
            cardTitle: "In-Term ECO PDSV 20",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/unifloor15.jpg",
            cardTitle: "Unifloor 15 Вт/м",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/in-term_adsv_20.jpg",
            cardTitle: "In-Therm ADSV 20",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/fenix_adsv_18.jpg",
            cardTitle: "Fenix ADSV 18",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          }
        ]
      },
      {
        title: "Обогрев наружных площадей",
        items: [
          {
            src: "/featured-1/eco_pdsv_20.jpg",
            cardTitle: "In-Term ECO PDSV 20",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/unifloor15.jpg",
            cardTitle: "Unifloor 15 Вт/м",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/in-term_adsv_20.jpg",
            cardTitle: "In-Therm ADSV 20",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          },
          {
            src: "/featured-1/fenix_adsv_18.jpg",
            cardTitle: "Fenix ADSV 18",
            description: "Кабель для теплого пола используются для укладки в стяжку 3-8 см."
          }
        ]
      }
    ]
  }
];
const Methods = {
  addClass,
  removeClass,
  hasClass,
  toggleClass,
  attr,
  removeAttr,
  transform,
  transition: transition$1,
  on,
  off,
  trigger,
  transitionEnd: transitionEnd$1,
  outerWidth,
  outerHeight,
  styles,
  offset,
  css: css$2,
  each: each,
  html,
  text,
  is,
  index,
  eq,
  append,
  prepend,
  next,
  nextAll,
  prev,
  prevAll,
  parent,
  parents,
  closest,
  find,
  children,
  filter,
  remove
};
Object.keys(Methods).forEach((methodName) => {
  Object.defineProperty($.fn, methodName, {
    value: Methods[methodName],
    writable: true
  });
});
function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch (e) {
    }
    try {
      delete object[key];
    } catch (e) {
    }
  });
}
function nextTick(callback, delay = 0) {
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle$1(el) {
  const window2 = getWindow();
  let style;
  if (window2.getComputedStyle) {
    style = window2.getComputedStyle(el, null);
  }
  if (!style && el.currentStyle) {
    style = el.currentStyle;
  }
  if (!style) {
    style = el.style;
  }
  return style;
}
function getTranslate(el, axis = "x") {
  const window2 = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle$1(el);
  if (window2.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(",").length > 6) {
      curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
    }
    transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
    matrix = transformMatrix.toString().split(",");
  }
  if (axis === "x") {
    if (window2.WebKitCSSMatrix)
      curTransform = transformMatrix.m41;
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[12]);
    else
      curTransform = parseFloat(matrix[4]);
  }
  if (axis === "y") {
    if (window2.WebKitCSSMatrix)
      curTransform = transformMatrix.m42;
    else if (matrix.length === 16)
      curTransform = parseFloat(matrix[13]);
    else
      curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject$1(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function isNode(node) {
  if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend$1(...args) {
  const to = Object(args[0]);
  const noExtend = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < args.length; i += 1) {
    const nextSource = args[i];
    if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== void 0 && desc.enumerable) {
          if (isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend$1(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject$1(to[nextKey]) && isObject$1(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend$1(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll({
  swiper: swiper2,
  targetPosition,
  side
}) {
  const window2 = getWindow();
  const startPosition = -swiper2.translate;
  let startTime = null;
  let time;
  const duration = swiper2.params.speed;
  swiper2.wrapperEl.style.scrollSnapType = "none";
  window2.cancelAnimationFrame(swiper2.cssModeFrameID);
  const dir = targetPosition > startPosition ? "next" : "prev";
  const isOutOfBound = (current, target) => {
    return dir === "next" && current >= target || dir === "prev" && current <= target;
  };
  const animate = () => {
    time = new Date().getTime();
    if (startTime === null) {
      startTime = time;
    }
    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper2.wrapperEl.scrollTo({
      [side]: currentPosition
    });
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper2.wrapperEl.style.overflow = "hidden";
      swiper2.wrapperEl.style.scrollSnapType = "";
      setTimeout(() => {
        swiper2.wrapperEl.style.overflow = "";
        swiper2.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      });
      window2.cancelAnimationFrame(swiper2.cssModeFrameID);
      return;
    }
    swiper2.cssModeFrameID = window2.requestAnimationFrame(animate);
  };
  animate();
}
let support;
function calcSupport() {
  const window2 = getWindow();
  const document = getDocument();
  return {
    smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
    touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document instanceof window2.DocumentTouch),
    passiveListener: function checkPassiveListener() {
      let supportsPassive = false;
      try {
        const opts = Object.defineProperty({}, "passive", {
          get() {
            supportsPassive = true;
          }
        });
        window2.addEventListener("testPassiveListener", null, opts);
      } catch (e) {
      }
      return supportsPassive;
    }(),
    gestures: function checkGestures() {
      return "ongesturestart" in window2;
    }()
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}
let deviceCached;
function calcDevice({
  userAgent
} = {}) {
  const support2 = getSupport();
  const window2 = getWindow();
  const platform = window2.navigator.platform;
  const ua = userAgent || window2.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window2.screen.width;
  const screenHeight = window2.screen.height;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === "Win32";
  let macos = platform === "MacIntel";
  const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    if (!ipad)
      ipad = [0, 1, "13_0_0"];
    macos = false;
  }
  if (android && !windows) {
    device.os = "android";
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = "ios";
    device.ios = true;
  }
  return device;
}
function getDevice(overrides = {}) {
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}
let browser;
function calcBrowser() {
  const window2 = getWindow();
  function isSafari() {
    const ua = window2.navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
  }
  return {
    isSafari: isSafari(),
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent)
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}
function Resize({
  swiper: swiper2,
  on: on2,
  emit
}) {
  const window2 = getWindow();
  let observer = null;
  let animationFrame = null;
  const resizeHandler = () => {
    if (!swiper2 || swiper2.destroyed || !swiper2.initialized)
      return;
    emit("beforeResize");
    emit("resize");
  };
  const createObserver = () => {
    if (!swiper2 || swiper2.destroyed || !swiper2.initialized)
      return;
    observer = new ResizeObserver((entries) => {
      animationFrame = window2.requestAnimationFrame(() => {
        const {
          width,
          height
        } = swiper2;
        let newWidth = width;
        let newHeight = height;
        entries.forEach(({
          contentBoxSize,
          contentRect,
          target
        }) => {
          if (target && target !== swiper2.el)
            return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper2.el);
  };
  const removeObserver = () => {
    if (animationFrame) {
      window2.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper2.el) {
      observer.unobserve(swiper2.el);
      observer = null;
    }
  };
  const orientationChangeHandler = () => {
    if (!swiper2 || swiper2.destroyed || !swiper2.initialized)
      return;
    emit("orientationchange");
  };
  on2("init", () => {
    if (swiper2.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
      createObserver();
      return;
    }
    window2.addEventListener("resize", resizeHandler);
    window2.addEventListener("orientationchange", orientationChangeHandler);
  });
  on2("destroy", () => {
    removeObserver();
    window2.removeEventListener("resize", resizeHandler);
    window2.removeEventListener("orientationchange", orientationChangeHandler);
  });
}
function Observer({
  swiper: swiper2,
  extendParams,
  on: on2,
  emit
}) {
  const observers = [];
  const window2 = getWindow();
  const attach = (target, options = {}) => {
    const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
    const observer = new ObserverFunc((mutations) => {
      if (mutations.length === 1) {
        emit("observerUpdate", mutations[0]);
        return;
      }
      const observerUpdate = function observerUpdate2() {
        emit("observerUpdate", mutations[0]);
      };
      if (window2.requestAnimationFrame) {
        window2.requestAnimationFrame(observerUpdate);
      } else {
        window2.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === "undefined" ? true : options.attributes,
      childList: typeof options.childList === "undefined" ? true : options.childList,
      characterData: typeof options.characterData === "undefined" ? true : options.characterData
    });
    observers.push(observer);
  };
  const init = () => {
    if (!swiper2.params.observer)
      return;
    if (swiper2.params.observeParents) {
      const containerParents = swiper2.$el.parents();
      for (let i = 0; i < containerParents.length; i += 1) {
        attach(containerParents[i]);
      }
    }
    attach(swiper2.$el[0], {
      childList: swiper2.params.observeSlideChildren
    });
    attach(swiper2.$wrapperEl[0], {
      attributes: false
    });
  };
  const destroy = () => {
    observers.forEach((observer) => {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on2("init", init);
  on2("destroy", destroy);
}
const eventsEmitter = {
  on(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (typeof handler !== "function")
      return self;
    const method = priority ? "unshift" : "push";
    events2.split(" ").forEach((event) => {
      if (!self.eventsListeners[event])
        self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },
  once(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (typeof handler !== "function")
      return self;
    function onceHandler(...args) {
      self.off(events2, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events2, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (typeof handler !== "function")
      return self;
    const method = priority ? "unshift" : "push";
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny(handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsAnyListeners)
      return self;
    const index2 = self.eventsAnyListeners.indexOf(handler);
    if (index2 >= 0) {
      self.eventsAnyListeners.splice(index2, 1);
    }
    return self;
  },
  off(events2, handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsListeners)
      return self;
    events2.split(" ").forEach((event) => {
      if (typeof handler === "undefined") {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler, index2) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event].splice(index2, 1);
          }
        });
      }
    });
    return self;
  },
  emit(...args) {
    const self = this;
    if (!self.eventsListeners || self.destroyed)
      return self;
    if (!self.eventsListeners)
      return self;
    let events2;
    let data;
    let context;
    if (typeof args[0] === "string" || Array.isArray(args[0])) {
      events2 = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events2 = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
    eventsArray.forEach((event) => {
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach((eventHandler) => {
          eventHandler.apply(context, [event, ...data]);
        });
      }
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler) => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
};
function updateSize() {
  const swiper2 = this;
  let width;
  let height;
  const $el = swiper2.$el;
  if (typeof swiper2.params.width !== "undefined" && swiper2.params.width !== null) {
    width = swiper2.params.width;
  } else {
    width = $el[0].clientWidth;
  }
  if (typeof swiper2.params.height !== "undefined" && swiper2.params.height !== null) {
    height = swiper2.params.height;
  } else {
    height = $el[0].clientHeight;
  }
  if (width === 0 && swiper2.isHorizontal() || height === 0 && swiper2.isVertical()) {
    return;
  }
  width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
  height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
  if (Number.isNaN(width))
    width = 0;
  if (Number.isNaN(height))
    height = 0;
  Object.assign(swiper2, {
    width,
    height,
    size: swiper2.isHorizontal() ? width : height
  });
}
function updateSlides() {
  const swiper2 = this;
  function getDirectionLabel(property) {
    if (swiper2.isHorizontal()) {
      return property;
    }
    return {
      "width": "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      "marginRight": "marginBottom"
    }[property];
  }
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
  }
  const params = swiper2.params;
  const {
    $wrapperEl,
    size: swiperSize,
    rtlTranslate: rtl,
    wrongRTL
  } = swiper2;
  const isVirtual = swiper2.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? swiper2.virtual.slides.length : swiper2.slides.length;
  const slides = $wrapperEl.children(`.${swiper2.params.slideClass}`);
  const slidesLength = isVirtual ? swiper2.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === "function") {
    offsetBefore = params.slidesOffsetBefore.call(swiper2);
  }
  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === "function") {
    offsetAfter = params.slidesOffsetAfter.call(swiper2);
  }
  const previousSnapGridLength = swiper2.snapGrid.length;
  const previousSlidesGridLength = swiper2.slidesGrid.length;
  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index2 = 0;
  if (typeof swiperSize === "undefined") {
    return;
  }
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
  }
  swiper2.virtualSize = -spaceBetween;
  if (rtl)
    slides.css({
      marginLeft: "",
      marginBottom: "",
      marginTop: ""
    });
  else
    slides.css({
      marginRight: "",
      marginBottom: "",
      marginTop: ""
    });
  if (params.centeredSlides && params.cssMode) {
    setCSSProperty(swiper2.wrapperEl, "--swiper-centered-offset-before", "");
    setCSSProperty(swiper2.wrapperEl, "--swiper-centered-offset-after", "");
  }
  const gridEnabled = params.grid && params.grid.rows > 1 && swiper2.grid;
  if (gridEnabled) {
    swiper2.grid.initSlides(slidesLength);
  }
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
    return typeof params.breakpoints[key].slidesPerView !== "undefined";
  }).length > 0;
  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    const slide2 = slides.eq(i);
    if (gridEnabled) {
      swiper2.grid.updateSlide(i, slide2, slidesLength, getDirectionLabel);
    }
    if (slide2.css("display") === "none")
      continue;
    if (params.slidesPerView === "auto") {
      if (shouldResetSlideSize) {
        slides[i].style[getDirectionLabel("width")] = ``;
      }
      const slideStyles = getComputedStyle(slide2[0]);
      const currentTransform = slide2[0].style.transform;
      const currentWebKitTransform = slide2[0].style.webkitTransform;
      if (currentTransform) {
        slide2[0].style.transform = "none";
      }
      if (currentWebKitTransform) {
        slide2[0].style.webkitTransform = "none";
      }
      if (params.roundLengths) {
        slideSize = swiper2.isHorizontal() ? slide2.outerWidth(true) : slide2.outerHeight(true);
      } else {
        const width = getDirectionPropertyValue(slideStyles, "width");
        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
        const boxSizing = slideStyles.getPropertyValue("box-sizing");
        if (boxSizing && boxSizing === "border-box") {
          slideSize = width + marginLeft + marginRight;
        } else {
          const {
            clientWidth,
            offsetWidth
          } = slide2[0];
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide2[0].style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide2[0].style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths)
        slideSize = Math.floor(slideSize);
      if (slides[i]) {
        slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
      }
    }
    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0)
        slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1e3)
        slidePosition = 0;
      if (params.roundLengths)
        slidePosition = Math.floor(slidePosition);
      if (index2 % params.slidesPerGroup === 0)
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths)
        slidePosition = Math.floor(slidePosition);
      if ((index2 - Math.min(swiper2.params.slidesPerGroupSkip, index2)) % swiper2.params.slidesPerGroup === 0)
        snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper2.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index2 += 1;
  }
  swiper2.virtualSize = Math.max(swiper2.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
    $wrapperEl.css({
      width: `${swiper2.virtualSize + params.spaceBetween}px`
    });
  }
  if (params.setWrapperSize) {
    $wrapperEl.css({
      [getDirectionLabel("width")]: `${swiper2.virtualSize + params.spaceBetween}px`
    });
  }
  if (gridEnabled) {
    swiper2.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  }
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      if (params.roundLengths)
        slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i] <= swiper2.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper2.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper2.virtualSize - swiperSize);
    }
  }
  if (snapGrid.length === 0)
    snapGrid = [0];
  if (params.spaceBetween !== 0) {
    const key = swiper2.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
    slides.filter((_, slideIndex) => {
      if (!params.cssMode)
        return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).css({
      [key]: `${spaceBetween}px`
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    const maxSnap = allSlidesSize - swiperSize;
    snapGrid = snapGrid.map((snap) => {
      if (snap < 0)
        return -offsetBefore;
      if (snap > maxSnap)
        return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    if (allSlidesSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper2, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(swiper2.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
    setCSSProperty(swiper2.wrapperEl, "--swiper-centered-offset-after", `${swiper2.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper2.snapGrid[0];
    const addToSlidesGrid = -swiper2.slidesGrid[0];
    swiper2.snapGrid = swiper2.snapGrid.map((v) => v + addToSnapGrid);
    swiper2.slidesGrid = swiper2.slidesGrid.map((v) => v + addToSlidesGrid);
  }
  if (slidesLength !== previousSlidesLength) {
    swiper2.emit("slidesLengthChange");
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper2.params.watchOverflow)
      swiper2.checkOverflow();
    swiper2.emit("snapGridLengthChange");
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper2.emit("slidesGridLengthChange");
  }
  if (params.watchSlidesProgress) {
    swiper2.updateSlidesOffset();
  }
  if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = swiper2.$el.hasClass(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded)
        swiper2.$el.addClass(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper2.$el.removeClass(backFaceHiddenClass);
    }
  }
}
function updateAutoHeight(speed) {
  const swiper2 = this;
  const activeSlides = [];
  const isVirtual = swiper2.virtual && swiper2.params.virtual.enabled;
  let newHeight = 0;
  let i;
  if (typeof speed === "number") {
    swiper2.setTransition(speed);
  } else if (speed === true) {
    swiper2.setTransition(swiper2.params.speed);
  }
  const getSlideByIndex = (index2) => {
    if (isVirtual) {
      return swiper2.slides.filter((el) => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index2)[0];
    }
    return swiper2.slides.eq(index2)[0];
  };
  if (swiper2.params.slidesPerView !== "auto" && swiper2.params.slidesPerView > 1) {
    if (swiper2.params.centeredSlides) {
      (swiper2.visibleSlides || $([])).each((slide2) => {
        activeSlides.push(slide2);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper2.params.slidesPerView); i += 1) {
        const index2 = swiper2.activeIndex + i;
        if (index2 > swiper2.slides.length && !isVirtual)
          break;
        activeSlides.push(getSlideByIndex(index2));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper2.activeIndex));
  }
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== "undefined") {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }
  if (newHeight || newHeight === 0)
    swiper2.$wrapperEl.css("height", `${newHeight}px`);
}
function updateSlidesOffset() {
  const swiper2 = this;
  const slides = swiper2.slides;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = swiper2.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
  }
}
function updateSlidesProgress(translate2 = this && this.translate || 0) {
  const swiper2 = this;
  const params = swiper2.params;
  const {
    slides,
    rtlTranslate: rtl,
    snapGrid
  } = swiper2;
  if (slides.length === 0)
    return;
  if (typeof slides[0].swiperSlideOffset === "undefined")
    swiper2.updateSlidesOffset();
  let offsetCenter = -translate2;
  if (rtl)
    offsetCenter = translate2;
  slides.removeClass(params.slideVisibleClass);
  swiper2.visibleSlidesIndexes = [];
  swiper2.visibleSlides = [];
  for (let i = 0; i < slides.length; i += 1) {
    const slide2 = slides[i];
    let slideOffset = slide2.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper2.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + params.spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper2.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + params.spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper2.slidesSizesGrid[i];
    const isVisible = slideBefore >= 0 && slideBefore < swiper2.size - 1 || slideAfter > 1 && slideAfter <= swiper2.size || slideBefore <= 0 && slideAfter >= swiper2.size;
    if (isVisible) {
      swiper2.visibleSlides.push(slide2);
      swiper2.visibleSlidesIndexes.push(i);
      slides.eq(i).addClass(params.slideVisibleClass);
    }
    slide2.progress = rtl ? -slideProgress : slideProgress;
    slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
  swiper2.visibleSlides = $(swiper2.visibleSlides);
}
function updateProgress(translate2) {
  const swiper2 = this;
  if (typeof translate2 === "undefined") {
    const multiplier = swiper2.rtlTranslate ? -1 : 1;
    translate2 = swiper2 && swiper2.translate && swiper2.translate * multiplier || 0;
  }
  const params = swiper2.params;
  const translatesDiff = swiper2.maxTranslate() - swiper2.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd
  } = swiper2;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate2 - swiper2.minTranslate()) / translatesDiff;
    isBeginning = progress <= 0;
    isEnd = progress >= 1;
  }
  Object.assign(swiper2, {
    progress,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
    swiper2.updateSlidesProgress(translate2);
  if (isBeginning && !wasBeginning) {
    swiper2.emit("reachBeginning toEdge");
  }
  if (isEnd && !wasEnd) {
    swiper2.emit("reachEnd toEdge");
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper2.emit("fromEdge");
  }
  swiper2.emit("progress", progress);
}
function updateSlidesClasses() {
  const swiper2 = this;
  const {
    slides,
    params,
    $wrapperEl,
    activeIndex,
    realIndex
  } = swiper2;
  const isVirtual = swiper2.virtual && params.virtual.enabled;
  slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
  let activeSlide;
  if (isVirtual) {
    activeSlide = swiper2.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
  } else {
    activeSlide = slides.eq(activeIndex);
  }
  activeSlide.addClass(params.slideActiveClass);
  if (params.loop) {
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
    } else {
      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
    }
  }
  let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
  if (params.loop && nextSlide.length === 0) {
    nextSlide = slides.eq(0);
    nextSlide.addClass(params.slideNextClass);
  }
  let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
  if (params.loop && prevSlide.length === 0) {
    prevSlide = slides.eq(-1);
    prevSlide.addClass(params.slidePrevClass);
  }
  if (params.loop) {
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
    } else {
      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
    }
    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
    } else {
      $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
    }
  }
  swiper2.emitSlidesClasses();
}
function updateActiveIndex(newActiveIndex) {
  const swiper2 = this;
  const translate2 = swiper2.rtlTranslate ? swiper2.translate : -swiper2.translate;
  const {
    slidesGrid,
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper2;
  let activeIndex = newActiveIndex;
  let snapIndex;
  if (typeof activeIndex === "undefined") {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
          activeIndex = i;
        } else if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate2 >= slidesGrid[i]) {
        activeIndex = i;
      }
    }
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === "undefined")
        activeIndex = 0;
    }
  }
  if (snapGrid.indexOf(translate2) >= 0) {
    snapIndex = snapGrid.indexOf(translate2);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper2.snapIndex = snapIndex;
      swiper2.emit("snapIndexChange");
    }
    return;
  }
  const realIndex = parseInt(swiper2.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
  Object.assign(swiper2, {
    snapIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  swiper2.emit("activeIndexChange");
  swiper2.emit("snapIndexChange");
  if (previousRealIndex !== realIndex) {
    swiper2.emit("realIndexChange");
  }
  if (swiper2.initialized || swiper2.params.runCallbacksOnInit) {
    swiper2.emit("slideChange");
  }
}
function updateClickedSlide(e) {
  const swiper2 = this;
  const params = swiper2.params;
  const slide2 = $(e).closest(`.${params.slideClass}`)[0];
  let slideFound = false;
  let slideIndex;
  if (slide2) {
    for (let i = 0; i < swiper2.slides.length; i += 1) {
      if (swiper2.slides[i] === slide2) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide2 && slideFound) {
    swiper2.clickedSlide = slide2;
    if (swiper2.virtual && swiper2.params.virtual.enabled) {
      swiper2.clickedIndex = parseInt($(slide2).attr("data-swiper-slide-index"), 10);
    } else {
      swiper2.clickedIndex = slideIndex;
    }
  } else {
    swiper2.clickedSlide = void 0;
    swiper2.clickedIndex = void 0;
    return;
  }
  if (params.slideToClickedSlide && swiper2.clickedIndex !== void 0 && swiper2.clickedIndex !== swiper2.activeIndex) {
    swiper2.slideToClickedSlide();
  }
}
const update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};
function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
  const swiper2 = this;
  const {
    params,
    rtlTranslate: rtl,
    translate: translate2,
    $wrapperEl
  } = swiper2;
  if (params.virtualTranslate) {
    return rtl ? -translate2 : translate2;
  }
  if (params.cssMode) {
    return translate2;
  }
  let currentTranslate = getTranslate($wrapperEl[0], axis);
  if (rtl)
    currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}
function setTranslate(translate2, byController) {
  const swiper2 = this;
  const {
    rtlTranslate: rtl,
    params,
    $wrapperEl,
    wrapperEl,
    progress
  } = swiper2;
  let x = 0;
  let y = 0;
  const z = 0;
  if (swiper2.isHorizontal()) {
    x = rtl ? -translate2 : translate2;
  } else {
    y = translate2;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  if (params.cssMode) {
    wrapperEl[swiper2.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper2.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
  }
  swiper2.previousTranslate = swiper2.translate;
  swiper2.translate = swiper2.isHorizontal() ? x : y;
  let newProgress;
  const translatesDiff = swiper2.maxTranslate() - swiper2.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate2 - swiper2.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper2.updateProgress(translate2);
  }
  swiper2.emit("setTranslate", swiper2.translate, byController);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(translate2 = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
  const swiper2 = this;
  const {
    params,
    wrapperEl
  } = swiper2;
  if (swiper2.animating && params.preventInteractionOnTransition) {
    return false;
  }
  const minTranslate2 = swiper2.minTranslate();
  const maxTranslate2 = swiper2.maxTranslate();
  let newTranslate;
  if (translateBounds && translate2 > minTranslate2)
    newTranslate = minTranslate2;
  else if (translateBounds && translate2 < maxTranslate2)
    newTranslate = maxTranslate2;
  else
    newTranslate = translate2;
  swiper2.updateProgress(newTranslate);
  if (params.cssMode) {
    const isH = swiper2.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
    } else {
      if (!swiper2.support.smoothScroll) {
        animateCSSModeScroll({
          swiper: swiper2,
          targetPosition: -newTranslate,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: -newTranslate,
        behavior: "smooth"
      });
    }
    return true;
  }
  if (speed === 0) {
    swiper2.setTransition(0);
    swiper2.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper2.emit("beforeTransitionStart", speed, internal);
      swiper2.emit("transitionEnd");
    }
  } else {
    swiper2.setTransition(speed);
    swiper2.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper2.emit("beforeTransitionStart", speed, internal);
      swiper2.emit("transitionStart");
    }
    if (!swiper2.animating) {
      swiper2.animating = true;
      if (!swiper2.onTranslateToWrapperTransitionEnd) {
        swiper2.onTranslateToWrapperTransitionEnd = function transitionEnd2(e) {
          if (!swiper2 || swiper2.destroyed)
            return;
          if (e.target !== this)
            return;
          swiper2.$wrapperEl[0].removeEventListener("transitionend", swiper2.onTranslateToWrapperTransitionEnd);
          swiper2.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper2.onTranslateToWrapperTransitionEnd);
          swiper2.onTranslateToWrapperTransitionEnd = null;
          delete swiper2.onTranslateToWrapperTransitionEnd;
          if (runCallbacks) {
            swiper2.emit("transitionEnd");
          }
        };
      }
      swiper2.$wrapperEl[0].addEventListener("transitionend", swiper2.onTranslateToWrapperTransitionEnd);
      swiper2.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper2.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}
const translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};
function setTransition(duration, byController) {
  const swiper2 = this;
  if (!swiper2.params.cssMode) {
    swiper2.$wrapperEl.transition(duration);
  }
  swiper2.emit("setTransition", duration, byController);
}
function transitionEmit({
  swiper: swiper2,
  runCallbacks,
  direction,
  step
}) {
  const {
    activeIndex,
    previousIndex
  } = swiper2;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex)
      dir = "next";
    else if (activeIndex < previousIndex)
      dir = "prev";
    else
      dir = "reset";
  }
  swiper2.emit(`transition${step}`);
  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === "reset") {
      swiper2.emit(`slideResetTransition${step}`);
      return;
    }
    swiper2.emit(`slideChangeTransition${step}`);
    if (dir === "next") {
      swiper2.emit(`slideNextTransition${step}`);
    } else {
      swiper2.emit(`slidePrevTransition${step}`);
    }
  }
}
function transitionStart(runCallbacks = true, direction) {
  const swiper2 = this;
  const {
    params
  } = swiper2;
  if (params.cssMode)
    return;
  if (params.autoHeight) {
    swiper2.updateAutoHeight();
  }
  transitionEmit({
    swiper: swiper2,
    runCallbacks,
    direction,
    step: "Start"
  });
}
function transitionEnd(runCallbacks = true, direction) {
  const swiper2 = this;
  const {
    params
  } = swiper2;
  swiper2.animating = false;
  if (params.cssMode)
    return;
  swiper2.setTransition(0);
  transitionEmit({
    swiper: swiper2,
    runCallbacks,
    direction,
    step: "End"
  });
}
const transition = {
  setTransition,
  transitionStart,
  transitionEnd
};
function slideTo(index2 = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
  if (typeof index2 !== "number" && typeof index2 !== "string") {
    throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index2}] given.`);
  }
  if (typeof index2 === "string") {
    const indexAsNumber = parseInt(index2, 10);
    const isValidNumber = isFinite(indexAsNumber);
    if (!isValidNumber) {
      throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index2}] given.`);
    }
    index2 = indexAsNumber;
  }
  const swiper2 = this;
  let slideIndex = index2;
  if (slideIndex < 0)
    slideIndex = 0;
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = swiper2;
  if (swiper2.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
    return false;
  }
  const skip = Math.min(swiper2.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper2.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length)
    snapIndex = snapGrid.length - 1;
  const translate2 = -snapGrid[snapIndex];
  if (params.normalizeSlideIndex) {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate2 * 100);
      const normalizedGrid = Math.floor(slidesGrid[i] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  if (swiper2.initialized && slideIndex !== activeIndex) {
    if (!swiper2.allowSlideNext && translate2 < swiper2.translate && translate2 < swiper2.minTranslate()) {
      return false;
    }
    if (!swiper2.allowSlidePrev && translate2 > swiper2.translate && translate2 > swiper2.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex)
        return false;
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper2.emit("beforeSlideChangeStart");
  }
  swiper2.updateProgress(translate2);
  let direction;
  if (slideIndex > activeIndex)
    direction = "next";
  else if (slideIndex < activeIndex)
    direction = "prev";
  else
    direction = "reset";
  if (rtl && -translate2 === swiper2.translate || !rtl && translate2 === swiper2.translate) {
    swiper2.updateActiveIndex(slideIndex);
    if (params.autoHeight) {
      swiper2.updateAutoHeight();
    }
    swiper2.updateSlidesClasses();
    if (params.effect !== "slide") {
      swiper2.setTranslate(translate2);
    }
    if (direction !== "reset") {
      swiper2.transitionStart(runCallbacks, direction);
      swiper2.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = swiper2.isHorizontal();
    const t = rtl ? translate2 : -translate2;
    if (speed === 0) {
      const isVirtual = swiper2.virtual && swiper2.params.virtual.enabled;
      if (isVirtual) {
        swiper2.wrapperEl.style.scrollSnapType = "none";
        swiper2._immediateVirtual = true;
      }
      wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper2.wrapperEl.style.scrollSnapType = "";
          swiper2._swiperImmediateVirtual = false;
        });
      }
    } else {
      if (!swiper2.support.smoothScroll) {
        animateCSSModeScroll({
          swiper: swiper2,
          targetPosition: t,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: t,
        behavior: "smooth"
      });
    }
    return true;
  }
  swiper2.setTransition(speed);
  swiper2.setTranslate(translate2);
  swiper2.updateActiveIndex(slideIndex);
  swiper2.updateSlidesClasses();
  swiper2.emit("beforeTransitionStart", speed, internal);
  swiper2.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper2.transitionEnd(runCallbacks, direction);
  } else if (!swiper2.animating) {
    swiper2.animating = true;
    if (!swiper2.onSlideToWrapperTransitionEnd) {
      swiper2.onSlideToWrapperTransitionEnd = function transitionEnd2(e) {
        if (!swiper2 || swiper2.destroyed)
          return;
        if (e.target !== this)
          return;
        swiper2.$wrapperEl[0].removeEventListener("transitionend", swiper2.onSlideToWrapperTransitionEnd);
        swiper2.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper2.onSlideToWrapperTransitionEnd);
        swiper2.onSlideToWrapperTransitionEnd = null;
        delete swiper2.onSlideToWrapperTransitionEnd;
        swiper2.transitionEnd(runCallbacks, direction);
      };
    }
    swiper2.$wrapperEl[0].addEventListener("transitionend", swiper2.onSlideToWrapperTransitionEnd);
    swiper2.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper2.onSlideToWrapperTransitionEnd);
  }
  return true;
}
function slideToLoop(index2 = 0, speed = this.params.speed, runCallbacks = true, internal) {
  if (typeof index2 === "string") {
    const indexAsNumber = parseInt(index2, 10);
    const isValidNumber = isFinite(indexAsNumber);
    if (!isValidNumber) {
      throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index2}] given.`);
    }
    index2 = indexAsNumber;
  }
  const swiper2 = this;
  let newIndex = index2;
  if (swiper2.params.loop) {
    newIndex += swiper2.loopedSlides;
  }
  return swiper2.slideTo(newIndex, speed, runCallbacks, internal);
}
function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper2 = this;
  const {
    animating,
    enabled,
    params
  } = swiper2;
  if (!enabled)
    return swiper2;
  let perGroup = params.slidesPerGroup;
  if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper2.slidesPerViewDynamic("current", true), 1);
  }
  const increment = swiper2.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  if (params.loop) {
    if (animating && params.loopPreventsSlide)
      return false;
    swiper2.loopFix();
    swiper2._clientLeft = swiper2.$wrapperEl[0].clientLeft;
  }
  if (params.rewind && swiper2.isEnd) {
    return swiper2.slideTo(0, speed, runCallbacks, internal);
  }
  return swiper2.slideTo(swiper2.activeIndex + increment, speed, runCallbacks, internal);
}
function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper2 = this;
  const {
    params,
    animating,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled
  } = swiper2;
  if (!enabled)
    return swiper2;
  if (params.loop) {
    if (animating && params.loopPreventsSlide)
      return false;
    swiper2.loopFix();
    swiper2._clientLeft = swiper2.$wrapperEl[0].clientLeft;
  }
  const translate2 = rtlTranslate ? swiper2.translate : -swiper2.translate;
  function normalize(val) {
    if (val < 0)
      return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate2);
  const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === "undefined" && params.cssMode) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== "undefined") {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  let prevIndex = 0;
  if (typeof prevSnap !== "undefined") {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0)
      prevIndex = swiper2.activeIndex - 1;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper2.slidesPerViewDynamic("previous", true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper2.isBeginning) {
    const lastIndex = swiper2.params.virtual && swiper2.params.virtual.enabled && swiper2.virtual ? swiper2.virtual.slides.length - 1 : swiper2.slides.length - 1;
    return swiper2.slideTo(lastIndex, speed, runCallbacks, internal);
  }
  return swiper2.slideTo(prevIndex, speed, runCallbacks, internal);
}
function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper2 = this;
  return swiper2.slideTo(swiper2.activeIndex, speed, runCallbacks, internal);
}
function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = 0.5) {
  const swiper2 = this;
  let index2 = swiper2.activeIndex;
  const skip = Math.min(swiper2.params.slidesPerGroupSkip, index2);
  const snapIndex = skip + Math.floor((index2 - skip) / swiper2.params.slidesPerGroup);
  const translate2 = swiper2.rtlTranslate ? swiper2.translate : -swiper2.translate;
  if (translate2 >= swiper2.snapGrid[snapIndex]) {
    const currentSnap = swiper2.snapGrid[snapIndex];
    const nextSnap = swiper2.snapGrid[snapIndex + 1];
    if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
      index2 += swiper2.params.slidesPerGroup;
    }
  } else {
    const prevSnap = swiper2.snapGrid[snapIndex - 1];
    const currentSnap = swiper2.snapGrid[snapIndex];
    if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index2 -= swiper2.params.slidesPerGroup;
    }
  }
  index2 = Math.max(index2, 0);
  index2 = Math.min(index2, swiper2.slidesGrid.length - 1);
  return swiper2.slideTo(index2, speed, runCallbacks, internal);
}
function slideToClickedSlide() {
  const swiper2 = this;
  const {
    params,
    $wrapperEl
  } = swiper2;
  const slidesPerView = params.slidesPerView === "auto" ? swiper2.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper2.clickedIndex;
  let realIndex;
  if (params.loop) {
    if (swiper2.animating)
      return;
    realIndex = parseInt($(swiper2.clickedSlide).attr("data-swiper-slide-index"), 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper2.loopedSlides - slidesPerView / 2 || slideToIndex > swiper2.slides.length - swiper2.loopedSlides + slidesPerView / 2) {
        swiper2.loopFix();
        slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
        nextTick(() => {
          swiper2.slideTo(slideToIndex);
        });
      } else {
        swiper2.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper2.slides.length - slidesPerView) {
      swiper2.loopFix();
      slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
      nextTick(() => {
        swiper2.slideTo(slideToIndex);
      });
    } else {
      swiper2.slideTo(slideToIndex);
    }
  } else {
    swiper2.slideTo(slideToIndex);
  }
}
const slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};
function loopCreate() {
  const swiper2 = this;
  const document = getDocument();
  const {
    params,
    $wrapperEl
  } = swiper2;
  const $selector = $wrapperEl.children().length > 0 ? $($wrapperEl.children()[0].parentNode) : $wrapperEl;
  $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
  let slides = $selector.children(`.${params.slideClass}`);
  if (params.loopFillGroupWithBlank) {
    const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
    if (blankSlidesNum !== params.slidesPerGroup) {
      for (let i = 0; i < blankSlidesNum; i += 1) {
        const blankNode = $(document.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
        $selector.append(blankNode);
      }
      slides = $selector.children(`.${params.slideClass}`);
    }
  }
  if (params.slidesPerView === "auto" && !params.loopedSlides)
    params.loopedSlides = slides.length;
  swiper2.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
  swiper2.loopedSlides += params.loopAdditionalSlides;
  if (swiper2.loopedSlides > slides.length && swiper2.params.loopedSlidesLimit) {
    swiper2.loopedSlides = slides.length;
  }
  const prependSlides = [];
  const appendSlides = [];
  slides.each((el, index2) => {
    const slide2 = $(el);
    slide2.attr("data-swiper-slide-index", index2);
  });
  for (let i = 0; i < swiper2.loopedSlides; i += 1) {
    const index2 = i - Math.floor(i / slides.length) * slides.length;
    appendSlides.push(slides.eq(index2)[0]);
    prependSlides.unshift(slides.eq(slides.length - index2 - 1)[0]);
  }
  for (let i = 0; i < appendSlides.length; i += 1) {
    $selector.append($(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
  for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
    $selector.prepend($(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
}
function loopFix() {
  const swiper2 = this;
  swiper2.emit("beforeLoopFix");
  const {
    activeIndex,
    slides,
    loopedSlides,
    allowSlidePrev,
    allowSlideNext,
    snapGrid,
    rtlTranslate: rtl
  } = swiper2;
  let newIndex;
  swiper2.allowSlidePrev = true;
  swiper2.allowSlideNext = true;
  const snapTranslate = -snapGrid[activeIndex];
  const diff = snapTranslate - swiper2.getTranslate();
  if (activeIndex < loopedSlides) {
    newIndex = slides.length - loopedSlides * 3 + activeIndex;
    newIndex += loopedSlides;
    const slideChanged = swiper2.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      swiper2.setTranslate((rtl ? -swiper2.translate : swiper2.translate) - diff);
    }
  } else if (activeIndex >= slides.length - loopedSlides) {
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;
    const slideChanged = swiper2.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      swiper2.setTranslate((rtl ? -swiper2.translate : swiper2.translate) - diff);
    }
  }
  swiper2.allowSlidePrev = allowSlidePrev;
  swiper2.allowSlideNext = allowSlideNext;
  swiper2.emit("loopFix");
}
function loopDestroy() {
  const swiper2 = this;
  const {
    $wrapperEl,
    params,
    slides
  } = swiper2;
  $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
  slides.removeAttr("data-swiper-slide-index");
}
const loop = {
  loopCreate,
  loopFix,
  loopDestroy
};
function setGrabCursor(moving) {
  const swiper2 = this;
  if (swiper2.support.touch || !swiper2.params.simulateTouch || swiper2.params.watchOverflow && swiper2.isLocked || swiper2.params.cssMode)
    return;
  const el = swiper2.params.touchEventsTarget === "container" ? swiper2.el : swiper2.wrapperEl;
  el.style.cursor = "move";
  el.style.cursor = moving ? "grabbing" : "grab";
}
function unsetGrabCursor() {
  const swiper2 = this;
  if (swiper2.support.touch || swiper2.params.watchOverflow && swiper2.isLocked || swiper2.params.cssMode) {
    return;
  }
  swiper2[swiper2.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
}
const grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};
function closestElement(selector, base = this) {
  function __closestFrom(el) {
    if (!el || el === getDocument() || el === getWindow())
      return null;
    if (el.assignedSlot)
      el = el.assignedSlot;
    const found = el.closest(selector);
    if (!found && !el.getRootNode) {
      return null;
    }
    return found || __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}
function onTouchStart(event) {
  const swiper2 = this;
  const document = getDocument();
  const window2 = getWindow();
  const data = swiper2.touchEventsData;
  const {
    params,
    touches,
    enabled
  } = swiper2;
  if (!enabled)
    return;
  if (swiper2.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper2.animating && params.cssMode && params.loop) {
    swiper2.loopFix();
  }
  let e = event;
  if (e.originalEvent)
    e = e.originalEvent;
  let $targetEl = $(e.target);
  if (params.touchEventsTarget === "wrapper") {
    if (!$targetEl.closest(swiper2.wrapperEl).length)
      return;
  }
  data.isTouchEvent = e.type === "touchstart";
  if (!data.isTouchEvent && "which" in e && e.which === 3)
    return;
  if (!data.isTouchEvent && "button" in e && e.button > 0)
    return;
  if (data.isTouched && data.isMoved)
    return;
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
  const eventPath = event.composedPath ? event.composedPath() : event.path;
  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
    $targetEl = $(eventPath[0]);
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e.target && e.target.shadowRoot);
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
    swiper2.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!$targetEl.closest(params.swipeHandler)[0])
      return;
  }
  touches.currentX = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
  touches.currentY = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;
  const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === "prevent") {
      event.preventDefault();
    } else {
      return;
    }
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: void 0,
    startMoving: void 0
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = now();
  swiper2.allowClick = true;
  swiper2.updateSize();
  swiper2.swipeDirection = void 0;
  if (params.threshold > 0)
    data.allowThresholdMove = false;
  if (e.type !== "touchstart") {
    let preventDefault = true;
    if ($targetEl.is(data.focusableElements)) {
      preventDefault = false;
      if ($targetEl[0].nodeName === "SELECT") {
        data.isTouched = false;
      }
    }
    if (document.activeElement && $(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) {
      document.activeElement.blur();
    }
    const shouldPreventDefault = preventDefault && swiper2.allowTouchMove && params.touchStartPreventDefault;
    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
      e.preventDefault();
    }
  }
  if (swiper2.params.freeMode && swiper2.params.freeMode.enabled && swiper2.freeMode && swiper2.animating && !params.cssMode) {
    swiper2.freeMode.onTouchStart();
  }
  swiper2.emit("touchStart", e);
}
function onTouchMove(event) {
  const document = getDocument();
  const swiper2 = this;
  const data = swiper2.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    enabled
  } = swiper2;
  if (!enabled)
    return;
  let e = event;
  if (e.originalEvent)
    e = e.originalEvent;
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper2.emit("touchMoveOpposite", e);
    }
    return;
  }
  if (data.isTouchEvent && e.type !== "touchmove")
    return;
  const targetTouch = e.type === "touchmove" && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
  const pageX = e.type === "touchmove" ? targetTouch.pageX : e.pageX;
  const pageY = e.type === "touchmove" ? targetTouch.pageY : e.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper2.allowTouchMove) {
    if (!$(e.target).is(data.focusableElements)) {
      swiper2.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = now();
    }
    return;
  }
  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
    if (swiper2.isVertical()) {
      if (pageY < touches.startY && swiper2.translate <= swiper2.maxTranslate() || pageY > touches.startY && swiper2.translate >= swiper2.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper2.translate <= swiper2.maxTranslate() || pageX > touches.startX && swiper2.translate >= swiper2.minTranslate()) {
      return;
    }
  }
  if (data.isTouchEvent && document.activeElement) {
    if (e.target === document.activeElement && $(e.target).is(data.focusableElements)) {
      data.isMoved = true;
      swiper2.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper2.emit("touchMove", e);
  }
  if (e.targetTouches && e.targetTouches.length > 1)
    return;
  touches.currentX = pageX;
  touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper2.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper2.params.threshold)
    return;
  if (typeof data.isScrolling === "undefined") {
    let touchAngle;
    if (swiper2.isHorizontal() && touches.currentY === touches.startY || swiper2.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper2.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper2.emit("touchMoveOpposite", e);
  }
  if (typeof data.startMoving === "undefined") {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper2.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  if (!data.isMoved) {
    if (params.loop && !params.cssMode) {
      swiper2.loopFix();
    }
    data.startTranslate = swiper2.getTranslate();
    swiper2.setTransition(0);
    if (swiper2.animating) {
      swiper2.$wrapperEl.trigger("webkitTransitionEnd transitionend");
    }
    data.allowMomentumBounce = false;
    if (params.grabCursor && (swiper2.allowSlideNext === true || swiper2.allowSlidePrev === true)) {
      swiper2.setGrabCursor(true);
    }
    swiper2.emit("sliderFirstMove", e);
  }
  swiper2.emit("sliderMove", e);
  data.isMoved = true;
  let diff = swiper2.isHorizontal() ? diffX : diffY;
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl)
    diff = -diff;
  swiper2.swipeDirection = diff > 0 ? "prev" : "next";
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0 && data.currentTranslate > swiper2.minTranslate()) {
    disableParentSwiper = false;
    if (params.resistance)
      data.currentTranslate = swiper2.minTranslate() - 1 + (-swiper2.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
  } else if (diff < 0 && data.currentTranslate < swiper2.maxTranslate()) {
    disableParentSwiper = false;
    if (params.resistance)
      data.currentTranslate = swiper2.maxTranslate() + 1 - (swiper2.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }
  if (!swiper2.allowSlideNext && swiper2.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper2.allowSlidePrev && swiper2.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper2.allowSlidePrev && !swiper2.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper2.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode)
    return;
  if (params.freeMode && params.freeMode.enabled && swiper2.freeMode || params.watchSlidesProgress) {
    swiper2.updateActiveIndex();
    swiper2.updateSlidesClasses();
  }
  if (swiper2.params.freeMode && params.freeMode.enabled && swiper2.freeMode) {
    swiper2.freeMode.onTouchMove();
  }
  swiper2.updateProgress(data.currentTranslate);
  swiper2.setTranslate(data.currentTranslate);
}
function onTouchEnd(event) {
  const swiper2 = this;
  const data = swiper2.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper2;
  if (!enabled)
    return;
  let e = event;
  if (e.originalEvent)
    e = e.originalEvent;
  if (data.allowTouchCallbacks) {
    swiper2.emit("touchEnd", e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper2.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper2.allowSlideNext === true || swiper2.allowSlidePrev === true)) {
    swiper2.setGrabCursor(false);
  }
  const touchEndTime = now();
  const timeDiff = touchEndTime - data.touchStartTime;
  if (swiper2.allowClick) {
    const pathTree = e.path || e.composedPath && e.composedPath();
    swiper2.updateClickedSlide(pathTree && pathTree[0] || e.target);
    swiper2.emit("tap click", e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper2.emit("doubleTap doubleClick", e);
    }
  }
  data.lastClickTime = now();
  nextTick(() => {
    if (!swiper2.destroyed)
      swiper2.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper2.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  let currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper2.translate : -swiper2.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (swiper2.params.freeMode && params.freeMode.enabled) {
    swiper2.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }
  let stopIndex = 0;
  let groupSize = swiper2.slidesSizesGrid[0];
  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment2 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + increment2] !== "undefined") {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) {
        stopIndex = i;
        groupSize = slidesGrid[i + increment2] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  let rewindFirstIndex = null;
  let rewindLastIndex = null;
  if (params.rewind) {
    if (swiper2.isBeginning) {
      rewindLastIndex = swiper2.params.virtual && swiper2.params.virtual.enabled && swiper2.virtual ? swiper2.virtual.slides.length - 1 : swiper2.slides.length - 1;
    } else if (swiper2.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    if (!params.longSwipes) {
      swiper2.slideTo(swiper2.activeIndex);
      return;
    }
    if (swiper2.swipeDirection === "next") {
      if (ratio >= params.longSwipesRatio)
        swiper2.slideTo(params.rewind && swiper2.isEnd ? rewindFirstIndex : stopIndex + increment);
      else
        swiper2.slideTo(stopIndex);
    }
    if (swiper2.swipeDirection === "prev") {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper2.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper2.slideTo(rewindLastIndex);
      } else {
        swiper2.slideTo(stopIndex);
      }
    }
  } else {
    if (!params.shortSwipes) {
      swiper2.slideTo(swiper2.activeIndex);
      return;
    }
    const isNavButtonTarget = swiper2.navigation && (e.target === swiper2.navigation.nextEl || e.target === swiper2.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper2.swipeDirection === "next") {
        swiper2.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper2.swipeDirection === "prev") {
        swiper2.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === swiper2.navigation.nextEl) {
      swiper2.slideTo(stopIndex + increment);
    } else {
      swiper2.slideTo(stopIndex);
    }
  }
}
function onResize() {
  const swiper2 = this;
  const {
    params,
    el
  } = swiper2;
  if (el && el.offsetWidth === 0)
    return;
  if (params.breakpoints) {
    swiper2.setBreakpoint();
  }
  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper2;
  swiper2.allowSlideNext = true;
  swiper2.allowSlidePrev = true;
  swiper2.updateSize();
  swiper2.updateSlides();
  swiper2.updateSlidesClasses();
  if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper2.isEnd && !swiper2.isBeginning && !swiper2.params.centeredSlides) {
    swiper2.slideTo(swiper2.slides.length - 1, 0, false, true);
  } else {
    swiper2.slideTo(swiper2.activeIndex, 0, false, true);
  }
  if (swiper2.autoplay && swiper2.autoplay.running && swiper2.autoplay.paused) {
    swiper2.autoplay.run();
  }
  swiper2.allowSlidePrev = allowSlidePrev;
  swiper2.allowSlideNext = allowSlideNext;
  if (swiper2.params.watchOverflow && snapGrid !== swiper2.snapGrid) {
    swiper2.checkOverflow();
  }
}
function onClick(e) {
  const swiper2 = this;
  if (!swiper2.enabled)
    return;
  if (!swiper2.allowClick) {
    if (swiper2.params.preventClicks)
      e.preventDefault();
    if (swiper2.params.preventClicksPropagation && swiper2.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}
function onScroll() {
  const swiper2 = this;
  const {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper2;
  if (!enabled)
    return;
  swiper2.previousTranslate = swiper2.translate;
  if (swiper2.isHorizontal()) {
    swiper2.translate = -wrapperEl.scrollLeft;
  } else {
    swiper2.translate = -wrapperEl.scrollTop;
  }
  if (swiper2.translate === 0)
    swiper2.translate = 0;
  swiper2.updateActiveIndex();
  swiper2.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper2.maxTranslate() - swiper2.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper2.translate - swiper2.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper2.progress) {
    swiper2.updateProgress(rtlTranslate ? -swiper2.translate : swiper2.translate);
  }
  swiper2.emit("setTranslate", swiper2.translate, false);
}
let dummyEventAttached = false;
function dummyEventListener() {
}
const events = (swiper2, method) => {
  const document = getDocument();
  const {
    params,
    touchEvents,
    el,
    wrapperEl,
    device,
    support: support2
  } = swiper2;
  const capture = !!params.nested;
  const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
  const swiperMethod = method;
  if (!support2.touch) {
    el[domMethod](touchEvents.start, swiper2.onTouchStart, false);
    document[domMethod](touchEvents.move, swiper2.onTouchMove, capture);
    document[domMethod](touchEvents.end, swiper2.onTouchEnd, false);
  } else {
    const passiveListener = touchEvents.start === "touchstart" && support2.passiveListener && params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    el[domMethod](touchEvents.start, swiper2.onTouchStart, passiveListener);
    el[domMethod](touchEvents.move, swiper2.onTouchMove, support2.passiveListener ? {
      passive: false,
      capture
    } : capture);
    el[domMethod](touchEvents.end, swiper2.onTouchEnd, passiveListener);
    if (touchEvents.cancel) {
      el[domMethod](touchEvents.cancel, swiper2.onTouchEnd, passiveListener);
    }
  }
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]("click", swiper2.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]("scroll", swiper2.onScroll);
  }
  if (params.updateOnWindowResize) {
    swiper2[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
  } else {
    swiper2[swiperMethod]("observerUpdate", onResize, true);
  }
};
function attachEvents() {
  const swiper2 = this;
  const document = getDocument();
  const {
    params,
    support: support2
  } = swiper2;
  swiper2.onTouchStart = onTouchStart.bind(swiper2);
  swiper2.onTouchMove = onTouchMove.bind(swiper2);
  swiper2.onTouchEnd = onTouchEnd.bind(swiper2);
  if (params.cssMode) {
    swiper2.onScroll = onScroll.bind(swiper2);
  }
  swiper2.onClick = onClick.bind(swiper2);
  if (support2.touch && !dummyEventAttached) {
    document.addEventListener("touchstart", dummyEventListener);
    dummyEventAttached = true;
  }
  events(swiper2, "on");
}
function detachEvents() {
  const swiper2 = this;
  events(swiper2, "off");
}
const events$1 = {
  attachEvents,
  detachEvents
};
const isGridEnabled = (swiper2, params) => {
  return swiper2.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  const swiper2 = this;
  const {
    activeIndex,
    initialized,
    loopedSlides = 0,
    params,
    $el
  } = swiper2;
  const breakpoints2 = params.breakpoints;
  if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
    return;
  const breakpoint = swiper2.getBreakpoint(breakpoints2, swiper2.params.breakpointsBase, swiper2.el);
  if (!breakpoint || swiper2.currentBreakpoint === breakpoint)
    return;
  const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
  const breakpointParams = breakpointOnlyParams || swiper2.originalParams;
  const wasMultiRow = isGridEnabled(swiper2, params);
  const isMultiRow = isGridEnabled(swiper2, breakpointParams);
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
    swiper2.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    $el.addClass(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
      $el.addClass(`${params.containerModifierClass}grid-column`);
    }
    swiper2.emitContainerClasses();
  }
  ["navigation", "pagination", "scrollbar"].forEach((prop) => {
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      swiper2[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      swiper2[prop].enable();
    }
  });
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  if (directionChanged && initialized) {
    swiper2.changeDirection();
  }
  extend$1(swiper2.params, breakpointParams);
  const isEnabled = swiper2.params.enabled;
  Object.assign(swiper2, {
    allowTouchMove: swiper2.params.allowTouchMove,
    allowSlideNext: swiper2.params.allowSlideNext,
    allowSlidePrev: swiper2.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper2.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper2.enable();
  }
  swiper2.currentBreakpoint = breakpoint;
  swiper2.emit("_beforeBreakpoint", breakpointParams);
  if (needsReLoop && initialized) {
    swiper2.loopDestroy();
    swiper2.loopCreate();
    swiper2.updateSlides();
    swiper2.slideTo(activeIndex - loopedSlides + swiper2.loopedSlides, 0, false);
  }
  swiper2.emit("breakpoint", breakpointParams);
}
function getBreakpoint(breakpoints2, base = "window", containerEl) {
  if (!breakpoints2 || base === "container" && !containerEl)
    return void 0;
  let breakpoint = false;
  const window2 = getWindow();
  const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints2).map((point) => {
    if (typeof point === "string" && point.indexOf("@") === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return {
        value,
        point
      };
    }
    return {
      value: point,
      point
    };
  });
  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  for (let i = 0; i < points.length; i += 1) {
    const {
      point,
      value
    } = points[i];
    if (base === "window") {
      if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || "max";
}
const breakpoints = {
  setBreakpoint,
  getBreakpoint
};
function prepareClasses(entries, prefix) {
  const resultClasses = [];
  entries.forEach((item) => {
    if (typeof item === "object") {
      Object.keys(item).forEach((classNames) => {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === "string") {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  const swiper2 = this;
  const {
    classNames,
    params,
    rtl,
    $el,
    device,
    support: support2
  } = swiper2;
  const suffixes = prepareClasses(["initialized", params.direction, {
    "pointer-events": !support2.touch
  }, {
    "free-mode": swiper2.params.freeMode && params.freeMode.enabled
  }, {
    "autoheight": params.autoHeight
  }, {
    "rtl": rtl
  }, {
    "grid": params.grid && params.grid.rows > 1
  }, {
    "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
  }, {
    "android": device.android
  }, {
    "ios": device.ios
  }, {
    "css-mode": params.cssMode
  }, {
    "centered": params.cssMode && params.centeredSlides
  }, {
    "watch-progress": params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push(...suffixes);
  $el.addClass([...classNames].join(" "));
  swiper2.emitContainerClasses();
}
function removeClasses() {
  const swiper2 = this;
  const {
    $el,
    classNames
  } = swiper2;
  $el.removeClass(classNames.join(" "));
  swiper2.emitContainerClasses();
}
const classes = {
  addClasses,
  removeClasses
};
function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
  const window2 = getWindow();
  let image;
  function onReady() {
    if (callback)
      callback();
  }
  const isPicture = $(imageEl).parent("picture")[0];
  if (!isPicture && (!imageEl.complete || !checkForComplete)) {
    if (src) {
      image = new window2.Image();
      image.onload = onReady;
      image.onerror = onReady;
      if (sizes) {
        image.sizes = sizes;
      }
      if (srcset) {
        image.srcset = srcset;
      }
      if (src) {
        image.src = src;
      }
    } else {
      onReady();
    }
  } else {
    onReady();
  }
}
function preloadImages() {
  const swiper2 = this;
  swiper2.imagesToLoad = swiper2.$el.find("img");
  function onReady() {
    if (typeof swiper2 === "undefined" || swiper2 === null || !swiper2 || swiper2.destroyed)
      return;
    if (swiper2.imagesLoaded !== void 0)
      swiper2.imagesLoaded += 1;
    if (swiper2.imagesLoaded === swiper2.imagesToLoad.length) {
      if (swiper2.params.updateOnImagesReady)
        swiper2.update();
      swiper2.emit("imagesReady");
    }
  }
  for (let i = 0; i < swiper2.imagesToLoad.length; i += 1) {
    const imageEl = swiper2.imagesToLoad[i];
    swiper2.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
  }
}
const images = {
  loadImage,
  preloadImages
};
function checkOverflow() {
  const swiper2 = this;
  const {
    isLocked: wasLocked,
    params
  } = swiper2;
  const {
    slidesOffsetBefore
  } = params;
  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper2.slides.length - 1;
    const lastSlideRightEdge = swiper2.slidesGrid[lastSlideIndex] + swiper2.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper2.isLocked = swiper2.size > lastSlideRightEdge;
  } else {
    swiper2.isLocked = swiper2.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper2.allowSlideNext = !swiper2.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper2.allowSlidePrev = !swiper2.isLocked;
  }
  if (wasLocked && wasLocked !== swiper2.isLocked) {
    swiper2.isEnd = false;
  }
  if (wasLocked !== swiper2.isLocked) {
    swiper2.emit(swiper2.isLocked ? "lock" : "unlock");
  }
}
const checkOverflow$1 = {
  checkOverflow
};
const defaults = {
  init: true,
  direction: "horizontal",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  enabled: true,
  focusableElements: "input, select, option, textarea, button, video, label",
  width: null,
  height: null,
  preventInteractionOnTransition: false,
  userAgent: null,
  url: null,
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  autoHeight: false,
  setWrapperSize: false,
  virtualTranslate: false,
  effect: "slide",
  breakpoints: void 0,
  breakpointsBase: "window",
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  watchOverflow: true,
  roundLengths: false,
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 0,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  uniqueNavElements: true,
  resistance: true,
  resistanceRatio: 0.85,
  watchSlidesProgress: false,
  grabCursor: false,
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  preloadImages: true,
  updateOnImagesReady: true,
  loop: false,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopedSlidesLimit: true,
  loopFillGroupWithBlank: false,
  loopPreventsSlide: true,
  rewind: false,
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  noSwiping: true,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  containerModifierClass: "swiper-",
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-invisible-blank",
  slideActiveClass: "swiper-slide-active",
  slideDuplicateActiveClass: "swiper-slide-duplicate-active",
  slideVisibleClass: "swiper-slide-visible",
  slideDuplicateClass: "swiper-slide-duplicate",
  slideNextClass: "swiper-slide-next",
  slideDuplicateNextClass: "swiper-slide-duplicate-next",
  slidePrevClass: "swiper-slide-prev",
  slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
  wrapperClass: "swiper-wrapper",
  runCallbacksOnInit: true,
  _emitClasses: false
};
function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj = {}) {
    const moduleParamName = Object.keys(obj)[0];
    const moduleParams = obj[moduleParamName];
    if (typeof moduleParams !== "object" || moduleParams === null) {
      extend$1(allModulesParams, obj);
      return;
    }
    if (["navigation", "pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
      params[moduleParamName] = {
        auto: true
      };
    }
    if (!(moduleParamName in params && "enabled" in moduleParams)) {
      extend$1(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName])
      params[moduleParamName] = {
        enabled: false
      };
    extend$1(allModulesParams, obj);
  };
}
const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes,
  images
};
const extendedDefaults = {};
class Swiper {
  constructor(...args) {
    let el;
    let params;
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
      params = args[0];
    } else {
      [el, params] = args;
    }
    if (!params)
      params = {};
    params = extend$1({}, params);
    if (el && !params.el)
      params.el = el;
    if (params.el && $(params.el).length > 1) {
      const swipers = [];
      $(params.el).each((containerEl) => {
        const newParams = extend$1({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
      });
      return swipers;
    }
    const swiper2 = this;
    swiper2.__swiper__ = true;
    swiper2.support = getSupport();
    swiper2.device = getDevice({
      userAgent: params.userAgent
    });
    swiper2.browser = getBrowser();
    swiper2.eventsListeners = {};
    swiper2.eventsAnyListeners = [];
    swiper2.modules = [...swiper2.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      swiper2.modules.push(...params.modules);
    }
    const allModulesParams = {};
    swiper2.modules.forEach((mod) => {
      mod({
        swiper: swiper2,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: swiper2.on.bind(swiper2),
        once: swiper2.once.bind(swiper2),
        off: swiper2.off.bind(swiper2),
        emit: swiper2.emit.bind(swiper2)
      });
    });
    const swiperParams = extend$1({}, defaults, allModulesParams);
    swiper2.params = extend$1({}, swiperParams, extendedDefaults, params);
    swiper2.originalParams = extend$1({}, swiper2.params);
    swiper2.passedParams = extend$1({}, params);
    if (swiper2.params && swiper2.params.on) {
      Object.keys(swiper2.params.on).forEach((eventName) => {
        swiper2.on(eventName, swiper2.params.on[eventName]);
      });
    }
    if (swiper2.params && swiper2.params.onAny) {
      swiper2.onAny(swiper2.params.onAny);
    }
    swiper2.$ = $;
    Object.assign(swiper2, {
      enabled: swiper2.params.enabled,
      el,
      classNames: [],
      slides: $(),
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      isHorizontal() {
        return swiper2.params.direction === "horizontal";
      },
      isVertical() {
        return swiper2.params.direction === "vertical";
      },
      activeIndex: 0,
      realIndex: 0,
      isBeginning: true,
      isEnd: false,
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      allowSlideNext: swiper2.params.allowSlideNext,
      allowSlidePrev: swiper2.params.allowSlidePrev,
      touchEvents: function touchEvents() {
        const touch = ["touchstart", "touchmove", "touchend", "touchcancel"];
        const desktop = ["pointerdown", "pointermove", "pointerup"];
        swiper2.touchEventsTouch = {
          start: touch[0],
          move: touch[1],
          end: touch[2],
          cancel: touch[3]
        };
        swiper2.touchEventsDesktop = {
          start: desktop[0],
          move: desktop[1],
          end: desktop[2]
        };
        return swiper2.support.touch || !swiper2.params.simulateTouch ? swiper2.touchEventsTouch : swiper2.touchEventsDesktop;
      }(),
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        focusableElements: swiper2.params.focusableElements,
        lastClickTime: now(),
        clickTimeout: void 0,
        velocities: [],
        allowMomentumBounce: void 0,
        isTouchEvent: void 0,
        startMoving: void 0
      },
      allowClick: true,
      allowTouchMove: swiper2.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper2.emit("_swiper");
    if (swiper2.params.init) {
      swiper2.init();
    }
    return swiper2;
  }
  enable() {
    const swiper2 = this;
    if (swiper2.enabled)
      return;
    swiper2.enabled = true;
    if (swiper2.params.grabCursor) {
      swiper2.setGrabCursor();
    }
    swiper2.emit("enable");
  }
  disable() {
    const swiper2 = this;
    if (!swiper2.enabled)
      return;
    swiper2.enabled = false;
    if (swiper2.params.grabCursor) {
      swiper2.unsetGrabCursor();
    }
    swiper2.emit("disable");
  }
  setProgress(progress, speed) {
    const swiper2 = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = swiper2.minTranslate();
    const max = swiper2.maxTranslate();
    const current = (max - min) * progress + min;
    swiper2.translateTo(current, typeof speed === "undefined" ? 0 : speed);
    swiper2.updateActiveIndex();
    swiper2.updateSlidesClasses();
  }
  emitContainerClasses() {
    const swiper2 = this;
    if (!swiper2.params._emitClasses || !swiper2.el)
      return;
    const cls = swiper2.el.className.split(" ").filter((className) => {
      return className.indexOf("swiper") === 0 || className.indexOf(swiper2.params.containerModifierClass) === 0;
    });
    swiper2.emit("_containerClasses", cls.join(" "));
  }
  getSlideClasses(slideEl) {
    const swiper2 = this;
    if (swiper2.destroyed)
      return "";
    return slideEl.className.split(" ").filter((className) => {
      return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper2.params.slideClass) === 0;
    }).join(" ");
  }
  emitSlidesClasses() {
    const swiper2 = this;
    if (!swiper2.params._emitClasses || !swiper2.el)
      return;
    const updates = [];
    swiper2.slides.each((slideEl) => {
      const classNames = swiper2.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      });
      swiper2.emit("_slideClass", slideEl, classNames);
    });
    swiper2.emit("_slideClasses", updates);
  }
  slidesPerViewDynamic(view = "current", exact = false) {
    const swiper2 = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper2;
    let spv = 1;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex].swiperSlideSize;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize)
            breakLoop = true;
        }
      }
    } else {
      if (view === "current") {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }
  update() {
    const swiper2 = this;
    if (!swiper2 || swiper2.destroyed)
      return;
    const {
      snapGrid,
      params
    } = swiper2;
    if (params.breakpoints) {
      swiper2.setBreakpoint();
    }
    swiper2.updateSize();
    swiper2.updateSlides();
    swiper2.updateProgress();
    swiper2.updateSlidesClasses();
    function setTranslate2() {
      const translateValue = swiper2.rtlTranslate ? swiper2.translate * -1 : swiper2.translate;
      const newTranslate = Math.min(Math.max(translateValue, swiper2.maxTranslate()), swiper2.minTranslate());
      swiper2.setTranslate(newTranslate);
      swiper2.updateActiveIndex();
      swiper2.updateSlidesClasses();
    }
    let translated;
    if (swiper2.params.freeMode && swiper2.params.freeMode.enabled) {
      setTranslate2();
      if (swiper2.params.autoHeight) {
        swiper2.updateAutoHeight();
      }
    } else {
      if ((swiper2.params.slidesPerView === "auto" || swiper2.params.slidesPerView > 1) && swiper2.isEnd && !swiper2.params.centeredSlides) {
        translated = swiper2.slideTo(swiper2.slides.length - 1, 0, false, true);
      } else {
        translated = swiper2.slideTo(swiper2.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate2();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper2.snapGrid) {
      swiper2.checkOverflow();
    }
    swiper2.emit("update");
  }
  changeDirection(newDirection, needUpdate = true) {
    const swiper2 = this;
    const currentDirection = swiper2.params.direction;
    if (!newDirection) {
      newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
    }
    if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
      return swiper2;
    }
    swiper2.$el.removeClass(`${swiper2.params.containerModifierClass}${currentDirection}`).addClass(`${swiper2.params.containerModifierClass}${newDirection}`);
    swiper2.emitContainerClasses();
    swiper2.params.direction = newDirection;
    swiper2.slides.each((slideEl) => {
      if (newDirection === "vertical") {
        slideEl.style.width = "";
      } else {
        slideEl.style.height = "";
      }
    });
    swiper2.emit("changeDirection");
    if (needUpdate)
      swiper2.update();
    return swiper2;
  }
  changeLanguageDirection(direction) {
    const swiper2 = this;
    if (swiper2.rtl && direction === "rtl" || !swiper2.rtl && direction === "ltr")
      return;
    swiper2.rtl = direction === "rtl";
    swiper2.rtlTranslate = swiper2.params.direction === "horizontal" && swiper2.rtl;
    if (swiper2.rtl) {
      swiper2.$el.addClass(`${swiper2.params.containerModifierClass}rtl`);
      swiper2.el.dir = "rtl";
    } else {
      swiper2.$el.removeClass(`${swiper2.params.containerModifierClass}rtl`);
      swiper2.el.dir = "ltr";
    }
    swiper2.update();
  }
  mount(el) {
    const swiper2 = this;
    if (swiper2.mounted)
      return true;
    const $el = $(el || swiper2.params.el);
    el = $el[0];
    if (!el) {
      return false;
    }
    el.swiper = swiper2;
    const getWrapperSelector = () => {
      return `.${(swiper2.params.wrapperClass || "").trim().split(" ").join(".")}`;
    };
    const getWrapper = () => {
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        const res = $(el.shadowRoot.querySelector(getWrapperSelector()));
        res.children = (options) => $el.children(options);
        return res;
      }
      if (!$el.children) {
        return $($el).children(getWrapperSelector());
      }
      return $el.children(getWrapperSelector());
    };
    let $wrapperEl = getWrapper();
    if ($wrapperEl.length === 0 && swiper2.params.createElements) {
      const document = getDocument();
      const wrapper = document.createElement("div");
      $wrapperEl = $(wrapper);
      wrapper.className = swiper2.params.wrapperClass;
      $el.append(wrapper);
      $el.children(`.${swiper2.params.slideClass}`).each((slideEl) => {
        $wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper2, {
      $el,
      el,
      $wrapperEl,
      wrapperEl: $wrapperEl[0],
      mounted: true,
      rtl: el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl",
      rtlTranslate: swiper2.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || $el.css("direction") === "rtl"),
      wrongRTL: $wrapperEl.css("display") === "-webkit-box"
    });
    return true;
  }
  init(el) {
    const swiper2 = this;
    if (swiper2.initialized)
      return swiper2;
    const mounted = swiper2.mount(el);
    if (mounted === false)
      return swiper2;
    swiper2.emit("beforeInit");
    if (swiper2.params.breakpoints) {
      swiper2.setBreakpoint();
    }
    swiper2.addClasses();
    if (swiper2.params.loop) {
      swiper2.loopCreate();
    }
    swiper2.updateSize();
    swiper2.updateSlides();
    if (swiper2.params.watchOverflow) {
      swiper2.checkOverflow();
    }
    if (swiper2.params.grabCursor && swiper2.enabled) {
      swiper2.setGrabCursor();
    }
    if (swiper2.params.preloadImages) {
      swiper2.preloadImages();
    }
    if (swiper2.params.loop) {
      swiper2.slideTo(swiper2.params.initialSlide + swiper2.loopedSlides, 0, swiper2.params.runCallbacksOnInit, false, true);
    } else {
      swiper2.slideTo(swiper2.params.initialSlide, 0, swiper2.params.runCallbacksOnInit, false, true);
    }
    swiper2.attachEvents();
    swiper2.initialized = true;
    swiper2.emit("init");
    swiper2.emit("afterInit");
    return swiper2;
  }
  destroy(deleteInstance = true, cleanStyles = true) {
    const swiper2 = this;
    const {
      params,
      $el,
      $wrapperEl,
      slides
    } = swiper2;
    if (typeof swiper2.params === "undefined" || swiper2.destroyed) {
      return null;
    }
    swiper2.emit("beforeDestroy");
    swiper2.initialized = false;
    swiper2.detachEvents();
    if (params.loop) {
      swiper2.loopDestroy();
    }
    if (cleanStyles) {
      swiper2.removeClasses();
      $el.removeAttr("style");
      $wrapperEl.removeAttr("style");
      if (slides && slides.length) {
        slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
      }
    }
    swiper2.emit("destroy");
    Object.keys(swiper2.eventsListeners).forEach((eventName) => {
      swiper2.off(eventName);
    });
    if (deleteInstance !== false) {
      swiper2.$el[0].swiper = null;
      deleteProps(swiper2);
    }
    swiper2.destroyed = true;
    return null;
  }
  static extendDefaults(newDefaults) {
    extend$1(extendedDefaults, newDefaults);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(mod) {
    if (!Swiper.prototype.__modules__)
      Swiper.prototype.__modules__ = [];
    const modules = Swiper.prototype.__modules__;
    if (typeof mod === "function" && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }
  static use(module) {
    if (Array.isArray(module)) {
      module.forEach((m) => Swiper.installModule(m));
      return Swiper;
    }
    Swiper.installModule(module);
    return Swiper;
  }
}
Object.keys(prototypes).forEach((prototypeGroup) => {
  Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([Resize, Observer]);
function createElementIfNotDefined(swiper2, originalParams, params, checkProps) {
  const document = getDocument();
  if (swiper2.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        let element = swiper2.$el.children(`.${checkProps[key]}`)[0];
        if (!element) {
          element = document.createElement("div");
          element.className = checkProps[key];
          swiper2.$el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}
function classesToSelector(classes2 = "") {
  return `.${classes2.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
}
function Pagination({
  swiper: swiper2,
  extendParams,
  on: on2,
  emit
}) {
  const pfx = "swiper-pagination";
  extendParams({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: "bullets",
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: (number) => number,
      formatFractionTotal: (number) => number,
      bulletClass: `${pfx}-bullet`,
      bulletActiveClass: `${pfx}-bullet-active`,
      modifierClass: `${pfx}-`,
      currentClass: `${pfx}-current`,
      totalClass: `${pfx}-total`,
      hiddenClass: `${pfx}-hidden`,
      progressbarFillClass: `${pfx}-progressbar-fill`,
      progressbarOppositeClass: `${pfx}-progressbar-opposite`,
      clickableClass: `${pfx}-clickable`,
      lockClass: `${pfx}-lock`,
      horizontalClass: `${pfx}-horizontal`,
      verticalClass: `${pfx}-vertical`,
      paginationDisabledClass: `${pfx}-disabled`
    }
  });
  swiper2.pagination = {
    el: null,
    $el: null,
    bullets: []
  };
  let bulletSize;
  let dynamicBulletIndex = 0;
  function isPaginationDisabled() {
    return !swiper2.params.pagination.el || !swiper2.pagination.el || !swiper2.pagination.$el || swiper2.pagination.$el.length === 0;
  }
  function setSideBullets($bulletEl, position) {
    const {
      bulletActiveClass
    } = swiper2.params.pagination;
    $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
  }
  function update2() {
    const rtl = swiper2.rtl;
    const params = swiper2.params.pagination;
    if (isPaginationDisabled())
      return;
    const slidesLength = swiper2.virtual && swiper2.params.virtual.enabled ? swiper2.virtual.slides.length : swiper2.slides.length;
    const $el = swiper2.pagination.$el;
    let current;
    const total = swiper2.params.loop ? Math.ceil((slidesLength - swiper2.loopedSlides * 2) / swiper2.params.slidesPerGroup) : swiper2.snapGrid.length;
    if (swiper2.params.loop) {
      current = Math.ceil((swiper2.activeIndex - swiper2.loopedSlides) / swiper2.params.slidesPerGroup);
      if (current > slidesLength - 1 - swiper2.loopedSlides * 2) {
        current -= slidesLength - swiper2.loopedSlides * 2;
      }
      if (current > total - 1)
        current -= total;
      if (current < 0 && swiper2.params.paginationType !== "bullets")
        current = total + current;
    } else if (typeof swiper2.snapIndex !== "undefined") {
      current = swiper2.snapIndex;
    } else {
      current = swiper2.activeIndex || 0;
    }
    if (params.type === "bullets" && swiper2.pagination.bullets && swiper2.pagination.bullets.length > 0) {
      const bullets = swiper2.pagination.bullets;
      let firstIndex;
      let lastIndex;
      let midIndex;
      if (params.dynamicBullets) {
        bulletSize = bullets.eq(0)[swiper2.isHorizontal() ? "outerWidth" : "outerHeight"](true);
        $el.css(swiper2.isHorizontal() ? "width" : "height", `${bulletSize * (params.dynamicMainBullets + 4)}px`);
        if (params.dynamicMainBullets > 1 && swiper2.previousIndex !== void 0) {
          dynamicBulletIndex += current - (swiper2.previousIndex - swiper2.loopedSlides || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => `${params.bulletActiveClass}${suffix}`).join(" "));
      if ($el.length > 1) {
        bullets.each((bullet) => {
          const $bullet = $(bullet);
          const bulletIndex = $bullet.index();
          if (bulletIndex === current) {
            $bullet.addClass(params.bulletActiveClass);
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              $bullet.addClass(`${params.bulletActiveClass}-main`);
            }
            if (bulletIndex === firstIndex) {
              setSideBullets($bullet, "prev");
            }
            if (bulletIndex === lastIndex) {
              setSideBullets($bullet, "next");
            }
          }
        });
      } else {
        const $bullet = bullets.eq(current);
        const bulletIndex = $bullet.index();
        $bullet.addClass(params.bulletActiveClass);
        if (params.dynamicBullets) {
          const $firstDisplayedBullet = bullets.eq(firstIndex);
          const $lastDisplayedBullet = bullets.eq(lastIndex);
          for (let i = firstIndex; i <= lastIndex; i += 1) {
            bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
          }
          if (swiper2.params.loop) {
            if (bulletIndex >= bullets.length) {
              for (let i = params.dynamicMainBullets; i >= 0; i -= 1) {
                bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
              }
              bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
            } else {
              setSideBullets($firstDisplayedBullet, "prev");
              setSideBullets($lastDisplayedBullet, "next");
            }
          } else {
            setSideBullets($firstDisplayedBullet, "prev");
            setSideBullets($lastDisplayedBullet, "next");
          }
        }
      }
      if (params.dynamicBullets) {
        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        const offsetProp = rtl ? "right" : "left";
        bullets.css(swiper2.isHorizontal() ? offsetProp : "top", `${bulletsOffset}px`);
      }
    }
    if (params.type === "fraction") {
      $el.find(classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
      $el.find(classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
    }
    if (params.type === "progressbar") {
      let progressbarDirection;
      if (params.progressbarOpposite) {
        progressbarDirection = swiper2.isHorizontal() ? "vertical" : "horizontal";
      } else {
        progressbarDirection = swiper2.isHorizontal() ? "horizontal" : "vertical";
      }
      const scale = (current + 1) / total;
      let scaleX = 1;
      let scaleY = 1;
      if (progressbarDirection === "horizontal") {
        scaleX = scale;
      } else {
        scaleY = scale;
      }
      $el.find(classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper2.params.speed);
    }
    if (params.type === "custom" && params.renderCustom) {
      $el.html(params.renderCustom(swiper2, current + 1, total));
      emit("paginationRender", $el[0]);
    } else {
      emit("paginationUpdate", $el[0]);
    }
    if (swiper2.params.watchOverflow && swiper2.enabled) {
      $el[swiper2.isLocked ? "addClass" : "removeClass"](params.lockClass);
    }
  }
  function render() {
    const params = swiper2.params.pagination;
    if (isPaginationDisabled())
      return;
    const slidesLength = swiper2.virtual && swiper2.params.virtual.enabled ? swiper2.virtual.slides.length : swiper2.slides.length;
    const $el = swiper2.pagination.$el;
    let paginationHTML = "";
    if (params.type === "bullets") {
      let numberOfBullets = swiper2.params.loop ? Math.ceil((slidesLength - swiper2.loopedSlides * 2) / swiper2.params.slidesPerGroup) : swiper2.snapGrid.length;
      if (swiper2.params.freeMode && swiper2.params.freeMode.enabled && !swiper2.params.loop && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (let i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper2, i, params.bulletClass);
        } else {
          paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
        }
      }
      $el.html(paginationHTML);
      swiper2.pagination.bullets = $el.find(classesToSelector(params.bulletClass));
    }
    if (params.type === "fraction") {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper2, params.currentClass, params.totalClass);
      } else {
        paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`;
      }
      $el.html(paginationHTML);
    }
    if (params.type === "progressbar") {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper2, params.progressbarFillClass);
      } else {
        paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
      }
      $el.html(paginationHTML);
    }
    if (params.type !== "custom") {
      emit("paginationRender", swiper2.pagination.$el[0]);
    }
  }
  function init() {
    swiper2.params.pagination = createElementIfNotDefined(swiper2, swiper2.originalParams.pagination, swiper2.params.pagination, {
      el: "swiper-pagination"
    });
    const params = swiper2.params.pagination;
    if (!params.el)
      return;
    let $el = $(params.el);
    if ($el.length === 0)
      return;
    if (swiper2.params.uniqueNavElements && typeof params.el === "string" && $el.length > 1) {
      $el = swiper2.$el.find(params.el);
      if ($el.length > 1) {
        $el = $el.filter((el) => {
          if ($(el).parents(".swiper")[0] !== swiper2.el)
            return false;
          return true;
        });
      }
    }
    if (params.type === "bullets" && params.clickable) {
      $el.addClass(params.clickableClass);
    }
    $el.addClass(params.modifierClass + params.type);
    $el.addClass(swiper2.isHorizontal() ? params.horizontalClass : params.verticalClass);
    if (params.type === "bullets" && params.dynamicBullets) {
      $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
      dynamicBulletIndex = 0;
      if (params.dynamicMainBullets < 1) {
        params.dynamicMainBullets = 1;
      }
    }
    if (params.type === "progressbar" && params.progressbarOpposite) {
      $el.addClass(params.progressbarOppositeClass);
    }
    if (params.clickable) {
      $el.on("click", classesToSelector(params.bulletClass), function onClick2(e) {
        e.preventDefault();
        let index2 = $(this).index() * swiper2.params.slidesPerGroup;
        if (swiper2.params.loop)
          index2 += swiper2.loopedSlides;
        swiper2.slideTo(index2);
      });
    }
    Object.assign(swiper2.pagination, {
      $el,
      el: $el[0]
    });
    if (!swiper2.enabled) {
      $el.addClass(params.lockClass);
    }
  }
  function destroy() {
    const params = swiper2.params.pagination;
    if (isPaginationDisabled())
      return;
    const $el = swiper2.pagination.$el;
    $el.removeClass(params.hiddenClass);
    $el.removeClass(params.modifierClass + params.type);
    $el.removeClass(swiper2.isHorizontal() ? params.horizontalClass : params.verticalClass);
    if (swiper2.pagination.bullets && swiper2.pagination.bullets.removeClass)
      swiper2.pagination.bullets.removeClass(params.bulletActiveClass);
    if (params.clickable) {
      $el.off("click", classesToSelector(params.bulletClass));
    }
  }
  on2("init", () => {
    if (swiper2.params.pagination.enabled === false) {
      disable();
    } else {
      init();
      render();
      update2();
    }
  });
  on2("activeIndexChange", () => {
    if (swiper2.params.loop) {
      update2();
    } else if (typeof swiper2.snapIndex === "undefined") {
      update2();
    }
  });
  on2("snapIndexChange", () => {
    if (!swiper2.params.loop) {
      update2();
    }
  });
  on2("slidesLengthChange", () => {
    if (swiper2.params.loop) {
      render();
      update2();
    }
  });
  on2("snapGridLengthChange", () => {
    if (!swiper2.params.loop) {
      render();
      update2();
    }
  });
  on2("destroy", () => {
    destroy();
  });
  on2("enable disable", () => {
    const {
      $el
    } = swiper2.pagination;
    if ($el) {
      $el[swiper2.enabled ? "removeClass" : "addClass"](swiper2.params.pagination.lockClass);
    }
  });
  on2("lock unlock", () => {
    update2();
  });
  on2("click", (_s, e) => {
    const targetEl = e.target;
    const {
      $el
    } = swiper2.pagination;
    if (swiper2.params.pagination.el && swiper2.params.pagination.hideOnClick && $el && $el.length > 0 && !$(targetEl).hasClass(swiper2.params.pagination.bulletClass)) {
      if (swiper2.navigation && (swiper2.navigation.nextEl && targetEl === swiper2.navigation.nextEl || swiper2.navigation.prevEl && targetEl === swiper2.navigation.prevEl))
        return;
      const isHidden = $el.hasClass(swiper2.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit("paginationShow");
      } else {
        emit("paginationHide");
      }
      $el.toggleClass(swiper2.params.pagination.hiddenClass);
    }
  });
  const enable = () => {
    swiper2.$el.removeClass(swiper2.params.pagination.paginationDisabledClass);
    if (swiper2.pagination.$el) {
      swiper2.pagination.$el.removeClass(swiper2.params.pagination.paginationDisabledClass);
    }
    init();
    render();
    update2();
  };
  const disable = () => {
    swiper2.$el.addClass(swiper2.params.pagination.paginationDisabledClass);
    if (swiper2.pagination.$el) {
      swiper2.pagination.$el.addClass(swiper2.params.pagination.paginationDisabledClass);
    }
    destroy();
  };
  Object.assign(swiper2.pagination, {
    enable,
    disable,
    render,
    update: update2,
    init,
    destroy
  });
}
function Autoplay({
  swiper: swiper2,
  extendParams,
  on: on2,
  emit
}) {
  let timeout;
  swiper2.autoplay = {
    running: false,
    paused: false
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3e3,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  function run() {
    if (!swiper2.size) {
      swiper2.autoplay.running = false;
      swiper2.autoplay.paused = false;
      return;
    }
    const $activeSlideEl = swiper2.slides.eq(swiper2.activeIndex);
    let delay = swiper2.params.autoplay.delay;
    if ($activeSlideEl.attr("data-swiper-autoplay")) {
      delay = $activeSlideEl.attr("data-swiper-autoplay") || swiper2.params.autoplay.delay;
    }
    clearTimeout(timeout);
    timeout = nextTick(() => {
      let autoplayResult;
      if (swiper2.params.autoplay.reverseDirection) {
        if (swiper2.params.loop) {
          swiper2.loopFix();
          autoplayResult = swiper2.slidePrev(swiper2.params.speed, true, true);
          emit("autoplay");
        } else if (!swiper2.isBeginning) {
          autoplayResult = swiper2.slidePrev(swiper2.params.speed, true, true);
          emit("autoplay");
        } else if (!swiper2.params.autoplay.stopOnLastSlide) {
          autoplayResult = swiper2.slideTo(swiper2.slides.length - 1, swiper2.params.speed, true, true);
          emit("autoplay");
        } else {
          stop();
        }
      } else if (swiper2.params.loop) {
        swiper2.loopFix();
        autoplayResult = swiper2.slideNext(swiper2.params.speed, true, true);
        emit("autoplay");
      } else if (!swiper2.isEnd) {
        autoplayResult = swiper2.slideNext(swiper2.params.speed, true, true);
        emit("autoplay");
      } else if (!swiper2.params.autoplay.stopOnLastSlide) {
        autoplayResult = swiper2.slideTo(0, swiper2.params.speed, true, true);
        emit("autoplay");
      } else {
        stop();
      }
      if (swiper2.params.cssMode && swiper2.autoplay.running)
        run();
      else if (autoplayResult === false) {
        run();
      }
    }, delay);
  }
  function start() {
    if (typeof timeout !== "undefined")
      return false;
    if (swiper2.autoplay.running)
      return false;
    swiper2.autoplay.running = true;
    emit("autoplayStart");
    run();
    return true;
  }
  function stop() {
    if (!swiper2.autoplay.running)
      return false;
    if (typeof timeout === "undefined")
      return false;
    if (timeout) {
      clearTimeout(timeout);
      timeout = void 0;
    }
    swiper2.autoplay.running = false;
    emit("autoplayStop");
    return true;
  }
  function pause(speed) {
    if (!swiper2.autoplay.running)
      return;
    if (swiper2.autoplay.paused)
      return;
    if (timeout)
      clearTimeout(timeout);
    swiper2.autoplay.paused = true;
    if (speed === 0 || !swiper2.params.autoplay.waitForTransition) {
      swiper2.autoplay.paused = false;
      run();
    } else {
      ["transitionend", "webkitTransitionEnd"].forEach((event) => {
        swiper2.$wrapperEl[0].addEventListener(event, onTransitionEnd);
      });
    }
  }
  function onVisibilityChange() {
    const document = getDocument();
    if (document.visibilityState === "hidden" && swiper2.autoplay.running) {
      pause();
    }
    if (document.visibilityState === "visible" && swiper2.autoplay.paused) {
      run();
      swiper2.autoplay.paused = false;
    }
  }
  function onTransitionEnd(e) {
    if (!swiper2 || swiper2.destroyed || !swiper2.$wrapperEl)
      return;
    if (e.target !== swiper2.$wrapperEl[0])
      return;
    ["transitionend", "webkitTransitionEnd"].forEach((event) => {
      swiper2.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
    swiper2.autoplay.paused = false;
    if (!swiper2.autoplay.running) {
      stop();
    } else {
      run();
    }
  }
  function onMouseEnter() {
    if (swiper2.params.autoplay.disableOnInteraction) {
      stop();
    } else {
      emit("autoplayPause");
      pause();
    }
    ["transitionend", "webkitTransitionEnd"].forEach((event) => {
      swiper2.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
  }
  function onMouseLeave() {
    if (swiper2.params.autoplay.disableOnInteraction) {
      return;
    }
    swiper2.autoplay.paused = false;
    emit("autoplayResume");
    run();
  }
  function attachMouseEvents() {
    if (swiper2.params.autoplay.pauseOnMouseEnter) {
      swiper2.$el.on("mouseenter", onMouseEnter);
      swiper2.$el.on("mouseleave", onMouseLeave);
    }
  }
  function detachMouseEvents() {
    swiper2.$el.off("mouseenter", onMouseEnter);
    swiper2.$el.off("mouseleave", onMouseLeave);
  }
  on2("init", () => {
    if (swiper2.params.autoplay.enabled) {
      start();
      const document = getDocument();
      document.addEventListener("visibilitychange", onVisibilityChange);
      attachMouseEvents();
    }
  });
  on2("beforeTransitionStart", (_s, speed, internal) => {
    if (swiper2.autoplay.running) {
      if (internal || !swiper2.params.autoplay.disableOnInteraction) {
        swiper2.autoplay.pause(speed);
      } else {
        stop();
      }
    }
  });
  on2("sliderFirstMove", () => {
    if (swiper2.autoplay.running) {
      if (swiper2.params.autoplay.disableOnInteraction) {
        stop();
      } else {
        pause();
      }
    }
  });
  on2("touchEnd", () => {
    if (swiper2.params.cssMode && swiper2.autoplay.paused && !swiper2.params.autoplay.disableOnInteraction) {
      run();
    }
  });
  on2("destroy", () => {
    detachMouseEvents();
    if (swiper2.autoplay.running) {
      stop();
    }
    const document = getDocument();
    document.removeEventListener("visibilitychange", onVisibilityChange);
  });
  Object.assign(swiper2.autoplay, {
    pause,
    run,
    start,
    stop
  });
}
function isObject(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function extend(target, src) {
  const noExtend = ["__proto__", "constructor", "prototype"];
  Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
    if (typeof target[key] === "undefined")
      target[key] = src[key];
    else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      if (src[key].__swiper__)
        target[key] = src[key];
      else
        extend(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}
function needsNavigation(params = {}) {
  return params.navigation && typeof params.navigation.nextEl === "undefined" && typeof params.navigation.prevEl === "undefined";
}
function needsPagination(params = {}) {
  return params.pagination && typeof params.pagination.el === "undefined";
}
function needsScrollbar(params = {}) {
  return params.scrollbar && typeof params.scrollbar.el === "undefined";
}
function uniqueClasses(classNames = "") {
  const classes2 = classNames.split(" ").map((c) => c.trim()).filter((c) => !!c);
  const unique = [];
  classes2.forEach((c) => {
    if (unique.indexOf(c) < 0)
      unique.push(c);
  });
  return unique.join(" ");
}
const paramsList = [
  "modules",
  "init",
  "_direction",
  "touchEventsTarget",
  "initialSlide",
  "_speed",
  "cssMode",
  "updateOnWindowResize",
  "resizeObserver",
  "nested",
  "focusableElements",
  "_enabled",
  "_width",
  "_height",
  "preventInteractionOnTransition",
  "userAgent",
  "url",
  "_edgeSwipeDetection",
  "_edgeSwipeThreshold",
  "_freeMode",
  "_autoHeight",
  "setWrapperSize",
  "virtualTranslate",
  "_effect",
  "breakpoints",
  "_spaceBetween",
  "_slidesPerView",
  "maxBackfaceHiddenSlides",
  "_grid",
  "_slidesPerGroup",
  "_slidesPerGroupSkip",
  "_slidesPerGroupAuto",
  "_centeredSlides",
  "_centeredSlidesBounds",
  "_slidesOffsetBefore",
  "_slidesOffsetAfter",
  "normalizeSlideIndex",
  "_centerInsufficientSlides",
  "_watchOverflow",
  "roundLengths",
  "touchRatio",
  "touchAngle",
  "simulateTouch",
  "_shortSwipes",
  "_longSwipes",
  "longSwipesRatio",
  "longSwipesMs",
  "_followFinger",
  "allowTouchMove",
  "_threshold",
  "touchMoveStopPropagation",
  "touchStartPreventDefault",
  "touchStartForcePreventDefault",
  "touchReleaseOnEdges",
  "uniqueNavElements",
  "_resistance",
  "_resistanceRatio",
  "_watchSlidesProgress",
  "_grabCursor",
  "preventClicks",
  "preventClicksPropagation",
  "_slideToClickedSlide",
  "_preloadImages",
  "updateOnImagesReady",
  "_loop",
  "_loopAdditionalSlides",
  "_loopedSlides",
  "_loopedSlidesLimit",
  "_loopFillGroupWithBlank",
  "loopPreventsSlide",
  "_rewind",
  "_allowSlidePrev",
  "_allowSlideNext",
  "_swipeHandler",
  "_noSwiping",
  "noSwipingClass",
  "noSwipingSelector",
  "passiveListeners",
  "containerModifierClass",
  "slideClass",
  "slideBlankClass",
  "slideActiveClass",
  "slideDuplicateActiveClass",
  "slideVisibleClass",
  "slideDuplicateClass",
  "slideNextClass",
  "slideDuplicateNextClass",
  "slidePrevClass",
  "slideDuplicatePrevClass",
  "wrapperClass",
  "runCallbacksOnInit",
  "observer",
  "observeParents",
  "observeSlideChildren",
  "a11y",
  "_autoplay",
  "_controller",
  "coverflowEffect",
  "cubeEffect",
  "fadeEffect",
  "flipEffect",
  "creativeEffect",
  "cardsEffect",
  "hashNavigation",
  "history",
  "keyboard",
  "lazy",
  "mousewheel",
  "_navigation",
  "_pagination",
  "parallax",
  "_scrollbar",
  "_thumbs",
  "virtual",
  "zoom"
];
function getParams(obj = {}, splitEvents = true) {
  const params = {
    on: {}
  };
  const events2 = {};
  const passedParams = {};
  extend(params, Swiper.defaults);
  extend(params, Swiper.extendedDefaults);
  params._emitClasses = true;
  params.init = false;
  const rest = {};
  const allowedParams = paramsList.map((key) => key.replace(/_/, ""));
  const plainObj = Object.assign({}, obj);
  Object.keys(plainObj).forEach((key) => {
    if (typeof obj[key] === "undefined")
      return;
    if (allowedParams.indexOf(key) >= 0) {
      if (isObject(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        extend(params[key], obj[key]);
        extend(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === "function") {
      if (splitEvents) {
        events2[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
      } else {
        params.on[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
      }
    } else {
      rest[key] = obj[key];
    }
  });
  ["navigation", "pagination", "scrollbar"].forEach((key) => {
    if (params[key] === true)
      params[key] = {};
    if (params[key] === false)
      delete params[key];
  });
  return {
    params,
    passedParams,
    rest,
    events: events2
  };
}
const Swiper_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "tag", "wrapperTag", "swiper"]);
  const dispatch = createEventDispatcher();
  let { class: className = void 0 } = $$props;
  let { tag = "div" } = $$props;
  let { wrapperTag = "div" } = $$props;
  let containerClasses = "swiper";
  let swiperInstance = null;
  let paramsData;
  let swiperParams;
  let restProps;
  let swiperEl = null;
  let prevEl = null;
  let nextEl = null;
  let scrollbarEl = null;
  let paginationEl = null;
  let virtualData = { slides: [] };
  function swiper2() {
    return swiperInstance;
  }
  const setVirtualData = (data) => {
    virtualData = data;
    tick().then(() => {
      swiperInstance.$wrapperEl.children(".swiper-slide").each((el) => {
        if (el.onSwiper)
          el.onSwiper(swiperInstance);
      });
      swiperInstance.updateSlides();
      swiperInstance.updateProgress();
      swiperInstance.updateSlidesClasses();
      if (swiperInstance.lazy && swiperInstance.params.lazy.enabled) {
        swiperInstance.lazy.load();
      }
    });
  };
  const calcParams = () => {
    paramsData = getParams($$restProps);
    swiperParams = paramsData.params;
    paramsData.passedParams;
    restProps = paramsData.rest;
  };
  calcParams();
  const onBeforeBreakpoint = () => {
  };
  swiperParams.onAny = (event, ...args) => {
    dispatch(event, args);
  };
  Object.assign(swiperParams.on, {
    _beforeBreakpoint: onBeforeBreakpoint,
    _containerClasses(_swiper, classes2) {
      containerClasses = classes2;
    }
  });
  swiperInstance = new Swiper(swiperParams);
  setContext("swiper", swiperInstance);
  if (swiperInstance.virtual && swiperInstance.params.virtual.enabled) {
    const extendWith = {
      cache: false,
      renderExternal: (data) => {
        setVirtualData(data);
        if (swiperParams.virtual && swiperParams.virtual.renderExternal) {
          swiperParams.virtual.renderExternal(data);
        }
      },
      renderExternalUpdate: false
    };
    extend(swiperInstance.params.virtual, extendWith);
    extend(swiperInstance.originalParams.virtual, extendWith);
  }
  onDestroy(() => {
    if (typeof window !== "undefined" && swiperInstance && !swiperInstance.destroyed) {
      swiperInstance.destroy(true, false);
    }
  });
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.wrapperTag === void 0 && $$bindings.wrapperTag && wrapperTag !== void 0)
    $$bindings.wrapperTag(wrapperTag);
  if ($$props.swiper === void 0 && $$bindings.swiper && swiper2 !== void 0)
    $$bindings.swiper(swiper2);
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        {
          class: escape_attribute_value(uniqueClasses(`${containerClasses}${className ? ` ${className}` : ""}`))
        },
        escape_object(restProps)
      ],
      {}
    )}${add_attribute("this", swiperEl, 0)}>${is_void(tag$1) ? "" : `${slots["container-start"] ? slots["container-start"]({ virtualData }) : ``}
  ${((tag2) => {
      return tag2 ? `<${wrapperTag} class="${"swiper-wrapper"}">${is_void(tag2) ? "" : `${slots["wrapper-start"] ? slots["wrapper-start"]({ virtualData }) : ``}
    ${slots.default ? slots.default({ virtualData }) : ``}
    ${slots["wrapper-end"] ? slots["wrapper-end"]({ virtualData }) : ``}`}${is_void(tag2) ? "" : `</${tag2}>`}` : "";
    })(wrapperTag)}
  ${needsNavigation(swiperParams) ? `<div class="${"swiper-button-prev"}"${add_attribute("this", prevEl, 0)}></div>
    <div class="${"swiper-button-next"}"${add_attribute("this", nextEl, 0)}></div>` : ``}
  ${needsScrollbar(swiperParams) ? `<div class="${"swiper-scrollbar"}"${add_attribute("this", scrollbarEl, 0)}></div>` : ``}
  ${needsPagination(swiperParams) ? `<div class="${"swiper-pagination"}"${add_attribute("this", paginationEl, 0)}></div>` : ``}
  ${slots["container-end"] ? slots["container-end"]({ virtualData }) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`;
});
const Swiper_slide = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let slideData;
  let $$restProps = compute_rest_props($$props, ["zoom", "virtualIndex", "class"]);
  let { zoom = void 0 } = $$props;
  let { virtualIndex = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  let slideEl = null;
  let slideClasses = "swiper-slide";
  let swiper2 = getContext("swiper");
  const updateClasses = (_, el, classNames) => {
    if (el === slideEl) {
      slideClasses = classNames;
    }
  };
  const detachEvent = () => {
    if (!swiper2)
      return;
    swiper2.off("_slideClass", updateClasses);
  };
  onDestroy(() => {
    if (!swiper2)
      return;
    detachEvent();
  });
  if ($$props.zoom === void 0 && $$bindings.zoom && zoom !== void 0)
    $$bindings.zoom(zoom);
  if ($$props.virtualIndex === void 0 && $$bindings.virtualIndex && virtualIndex !== void 0)
    $$bindings.virtualIndex(virtualIndex);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  slideData = {
    isActive: slideClasses.indexOf("swiper-slide-active") >= 0 || slideClasses.indexOf("swiper-slide-duplicate-active") >= 0,
    isVisible: slideClasses.indexOf("swiper-slide-visible") >= 0,
    isDuplicate: slideClasses.indexOf("swiper-slide-duplicate") >= 0,
    isPrev: slideClasses.indexOf("swiper-slide-prev") >= 0 || slideClasses.indexOf("swiper-slide-duplicate-prev") >= 0,
    isNext: slideClasses.indexOf("swiper-slide-next") >= 0 || slideClasses.indexOf("swiper-slide-duplicate-next") >= 0
  };
  return `<div${spread(
    [
      {
        class: escape_attribute_value(uniqueClasses(`${slideClasses}${className ? ` ${className}` : ""}`))
      },
      {
        "data-swiper-slide-index": escape_attribute_value(virtualIndex)
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", slideEl, 0)}>${zoom ? `<div class="${"swiper-zoom-container"}"${add_attribute("data-swiper-zoom", typeof zoom === "number" ? zoom : void 0, 0)}>${slots.default ? slots.default({ data: slideData }) : ``}</div>` : `${slots.default ? slots.default({ data: slideData }) : ``}`}</div>`;
});
const css = {
  code: '.jumbo-container.svelte-1hi14hz .jumbo-anno-box.svelte-1hi14hz.svelte-1hi14hz{display:grid;position:absolute;bottom:10%;z-index:2;line-height:1.1;letter-spacing:1.2px;font-size:1.4em}.jumbo-container.svelte-1hi14hz .jumbo-anno-box.svelte-1hi14hz>.svelte-1hi14hz{text-transform:uppercase;margin-bottom:1em}.jumbo-container.svelte-1hi14hz .jumbo-text.svelte-1hi14hz.svelte-1hi14hz{justify-self:start;font-weight:900}.how-to-container.svelte-1hi14hz.svelte-1hi14hz.svelte-1hi14hz{color:var(--on-primary-alt);text-transform:uppercase}.how-to-container.svelte-1hi14hz h4.svelte-1hi14hz.svelte-1hi14hz::after{content:"";display:inline-block;width:90px;height:2px;margin:auto 0 17px 40px;background:var(--on-primary-alt)}.how-to-container.svelte-1hi14hz .steps.svelte-1hi14hz.svelte-1hi14hz{display:grid;grid-template-columns:1fr 1fr 1fr;column-gap:2em}.how-to-container.svelte-1hi14hz .steps .request-container.svelte-1hi14hz.svelte-1hi14hz{grid-column:2}.how-to-container.svelte-1hi14hz .steps .request-container #order-email.svelte-1hi14hz.svelte-1hi14hz:focus{border-color:var(--secondary)}.how-to-container.svelte-1hi14hz .steps .request-container .request p.svelte-1hi14hz.svelte-1hi14hz{text-transform:initial}.how-to-container.svelte-1hi14hz .steps .request-container.svelte-1hi14hz.svelte-1hi14hz::before{content:"";display:inline-block;background-image:url("/icons/checklist.png");background-position:center;background-repeat:no-repeat;background-size:contain;width:50px;height:50px;position:absolute;left:-55px}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section class="${"jumbo-container main-container svelte-1hi14hz"}"><div class="${"medium-padding jumbo-anno-box background svelte-1hi14hz"}"><div class="${"y-border large-padding jumbo-text svelte-1hi14hz"}">ЭЛЕКТРИЧЕСКИЙ ТЕПЛЫЙ ПОЛ
    </div>
    <p class="${"svelte-1hi14hz"}">ПРОДАЖА ОТ ПРЯМОГО ИМПОРТЕРА</p>
    <button class="${"no-margin no-round primary-container svelte-1hi14hz"}">прайсы</button></div>

  ${validate_component(Swiper_1, "Swiper").$$render(
    $$result,
    {
      spaceBetween: 30,
      centeredSlides: true,
      pagination: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      modules: [Autoplay, Pagination],
      class: "mySwiper"
    },
    {},
    {
      default: () => {
        return `${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
          default: () => {
            return `<img src="${"/jumbo-slides/slide-1.png"}" alt="${"slide-1"}">`;
          }
        })}
    ${validate_component(Swiper_slide, "SwiperSlide").$$render($$result, {}, {}, {
          default: () => {
            return `<img src="${"/jumbo-slides/slide-2.png"}" alt="${"slide-2"}">`;
          }
        })}
    `;
      }
    }
  )}</section>
${each$1(featuredProducts, (section, i) => {
    return `${validate_component(FeaturedProducts, "FeaturedProducts").$$render(
      $$result,
      {
        tabs: section,
        serialNumber: i.toLocaleString()
      },
      {},
      {}
    )}`;
  })}
<section class="${"primary-container medium-padding "}"><div class="${"how-to-container main-container svelte-1hi14hz"}"><h4 class="${"svelte-1hi14hz"}">Как заказать?</h4>
    <div class="${"steps svelte-1hi14hz"}"><div class="${"request-container svelte-1hi14hz"}"><div class="${"request"}"><h6>Оставить заявку</h6>
          <p class="${"svelte-1hi14hz"}">Вы можете оставить свой номер телефона в форме для обратной связи и
            в ближайшее время наши менеджеры обязательно с Вами свяжутся. Либо
            оставьте ваш почтовый адресс, и мы вам обязательно напишем.
          </p></div>
        <div class="${"field label prefix border "}"><i>email</i>
          <input type="${"email"}" id="${"order-email"}" class="${"svelte-1hi14hz"}">
          <label class="${"secondary transparent"}" for="${"order-email"}">Ваша почта</label></div></div></div></div>
</section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-c5fcd233.js.map
