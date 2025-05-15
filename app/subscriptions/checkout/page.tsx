import CheckoutSubscription from "./CheckoutSubscription"

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ priceId: string }>
}) {
  const { priceId } = await searchParams

  if (!priceId) {
    throw new Error("Price ID is required")
  }

  return <CheckoutSubscription priceId={priceId} />
}
