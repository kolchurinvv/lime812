# Oddities First

## `./build`

What the hell is it doing here? Well, my current VPS only has 2 GB of RAM 🙃 So every time I try to build it there - it fails miserably. My machine has 8 times that. It's one of those cases where the ☁️ isn't all powerfull (yet)

---

## `./node_modules/swiper/svelte/swiper-svelte.d.ts`

Oh yes, we're doing it! we're changing dependency code without even creating our own fork coz we're that -> 🤪

```typescript
4 // @ts-ignore
5 // interface SwiperProps extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['div']> {}
6 // interface SwiperProps extends SwiperOptions {}
7 // ref this issue https://github.com/nolimits4web/swiper/issues/5571
8 interface SwiperProps extends SwiperOptions, svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['div']> {}
```

---

## VPS `git` config

Basically, I didn't feel like installing `svn` on the server just to download the `./build` directory, so [this](https://stackoverflow.com/a/61470611/19712974) **excellent** answer saved my 🥓

---

## `./nginx`

Didn't know a better place to put it. Just some configs I'm testing out and didn't want to lose

---

## We're [Baking](https://github.com/oven-sh/bun#bun) It!

Took me a bit to setup, but for a static site (for now) - works great!
