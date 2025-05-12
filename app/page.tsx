import { stripe } from "@/lib/stripe"
import { CheckoutButton } from "./CheckoutButton"
import Image from "next/image"

export default async function Home() {
  const product = await stripe.products.retrieve(
    process.env.STRIPE_TEST_PRODUCT_ID!
  )
  const price = await stripe.prices.retrieve(process.env.STRIPE_TEST_PRICE_ID!)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <Image
          width={200}
          height={200}
          src={product.images[0]}
          alt="Basic test shirt"
        />
        <div>{formatPrice(price.unit_amount, price.currency)}</div>
        <CheckoutButton priceId={price.id} />
      </main>
    </div>
  )
}
const formatPrice = (
  priceInCents: number | null,
  currency = "eur",
  locale = "de-DE"
) => {
  if (!priceInCents) {
    return null
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(priceInCents / 100)
}
