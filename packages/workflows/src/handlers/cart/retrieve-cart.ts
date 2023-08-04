import { WorkflowArguments } from "../../helper"
import { CartDTO } from "../../types"

// TODO: Figure out a way to handle duplication of this code
// TODO: Figure out a way to handle fields and expand query param.
export const defaultStoreCartRelations = [
  "gift_cards",
  "region",
  "items",
  "items.variant",
  "items.adjustments",
  "payment",
  "shipping_address",
  "billing_address",
  "region.countries",
  "region.payment_providers",
  "shipping_methods",
  "payment_sessions",
  "shipping_methods.shipping_option",
  "discounts",
  "discounts.rule",
]

type HandlerInputData = {
  cart: {
    id?: string
  }
}

enum Aliases {
  CreatedCart = "createdCart",
}

export async function retrieveCart({
  container,
  context,
  data,
}: WorkflowArguments<HandlerInputData>): Promise<CartDTO> {
  const cartService = container.resolve("cartService")
  const entityManager = container.resolve("manager")
  const cartServiceTx = cartService.withTransaction(entityManager)

  return await cartServiceTx.retrieve(data[Aliases.CreatedCart].id, {
    relations: defaultStoreCartRelations,
  })
}

retrieveCart.aliases = Aliases