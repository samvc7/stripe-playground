import Stripe from "stripe"
import { CheckoutButton } from "./CheckoutButton"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ProductCardProps = {
  stripePrice: Stripe.Price
}

export function ProductCard({ stripePrice }: ProductCardProps) {
  const product = stripePrice.product as Stripe.Product
  return (
    <div>
      <Card className="flex flex-col w-full h-full pt-0">
        <div className="aspect-square overflow-hidden rounded-t-md">
          <Image
            width={300}
            height={300}
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription className="line-clamp-3">
            {product.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <p className="text-xl font-bold">
            {formatPrice(stripePrice.unit_amount, stripePrice.currency)}
          </p>
        </CardContent>

        <CardFooter>
          <CheckoutButton priceId={stripePrice.id} />
        </CardFooter>
      </Card>
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
