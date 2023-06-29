import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
export const mode: Writable<undefined | boolean> = writable(undefined)
