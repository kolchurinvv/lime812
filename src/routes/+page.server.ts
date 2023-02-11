import { error } from "@sveltejs/kit"
import featuredProducts from "./home/featuredProducts.json"

export const load = (): object => {
  if (!featuredProducts) throw error(404)
  return { featuredProducts }
}
