import { stripe } from "@/lib/stripe"
import { ProductCard } from "./_components/ProductCard"
import Stripe from "stripe"

export default async function Home() {
  const prices = await stripe.prices.list({
    expand: ["data.product"],
    type: "one_time",
  })

  return (
    <div className="min-h-screen p-6 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="max">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Shop Collection</h1>
          <h2 className=" text-muted-foreground">
            Discover our curated selection of premium products
          </h2>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prices.data.map((price) => {
            const product = price.product as Stripe.Product
            return <ProductCard key={product.name} stripePrice={price} />
          })}
        </section>
      </main>
    </div>
  )
}
