import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"
import SubscribeButton from "./SubscribeButton"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

export default async function SubscriptionPage() {
  const prices = await stripe.prices.list({
    expand: ["data.product"],
    recurring: { interval: "month" },
  })

  return (
    <div className="flex flex-col items-center justify-center mt-6 gap-4 py-12 px-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Membership Plans</h1>
        <p className="text-lg text-muted-foreground">
          Choose the perfect membership plan and enjoy exclusive benefits and
          savings.
        </p>
      </div>
      <div className="flex flex-row gap-6 mt-12 w-full">
        {prices.data.reverse().map((price) => {
          const product = price.product as Stripe.Product
          const planName = product.name.toLowerCase() as
            | "basic"
            | "premium"
            | "ultimate"

          return (
            <CardSubscription
              key={planName}
              planName={planName}
              priceId={price.id}
              interval={price.recurring?.interval}
            />
          )
        })}
      </div>
    </div>
  )
}

type CardSubscriptionProps = {
  planName: "basic" | "premium" | "ultimate"
  priceId: string
  interval?: Stripe.Price.Recurring.Interval
}

const CardSubscription = async ({
  planName,
  priceId,
  interval = "month",
}: CardSubscriptionProps) => {
  const isPopular = planName === "premium"

  return (
    <Card
      className={cn("flex-1", isPopular ? "border-primary shadow-lg pt-0" : "")}
    >
      {isPopular && (
        <div className="bg-primary rounded-t-lg py-1 text-xs font-bold text-center text-primary-foreground">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{plans[planName].name}</CardTitle>
        <CardDescription>{plans[planName].description}</CardDescription>
      </CardHeader>

      <CardContent className="">
        <div>
          <span className="text-4xl font-bold">{plans[planName].price}€</span>
          <span className="text-muted-foreground">/{interval}</span>
        </div>

        <ul className="my-6 space-y-2">
          {Object.entries(featuresList).map(([key, value]) => {
            const isIncluded = plans[planName].features.includes(key)

            return (
              <li key={key} className="flex items-center">
                {isIncluded ? (
                  <>
                    <Check className="text-green-400 mr-2 w-4 h-4" />
                    <span className="font-medium">{value}</span>
                  </>
                ) : (
                  <>
                    <X className="text-muted-foreground mr-2 w-4 h-4" />
                    <span className="text-muted-foreground">{value}</span>
                  </>
                )}
              </li>
            )
          })}
        </ul>
      </CardContent>

      <CardFooter className={!isPopular ? "mt-6" : ""}>
        <SubscribeButton
          variant={isPopular ? "default" : "outline"}
          priceId={priceId}
        />
      </CardFooter>
    </Card>
  )
}

const featuresList = {
  shipping: "Free shipping on all orders",
  earlyAccess: "Early access to new products",
  discounts: "Exclusive member discounts",
  prioritySupport: "Priority customer support",
  freeReturns: "Free returns",
  memberOnlyProducts: "Member-only products",
}

const plans = {
  basic: {
    name: "Basic",
    description: "Essential features for individuals",
    price: "9,99",
    features: ["shipping", "earlyAccess", "discounts"],
  },
  premium: {
    name: "Premium",
    price: "19,99",
    description: "Perfect for enthusiasts",
    features: [
      "shipping",
      "earlyAccess",
      "discounts",
      "prioritySupport",
      "freeReturns",
    ],
  },
  ultimate: {
    name: "Ultimate",
    description: "Complete access to all features",
    price: "29,99",
    features: [
      "shipping",
      "earlyAccess",
      "discounts",
      "prioritySupport",
      "freeReturns",
      "memberOnlyProducts",
    ],
  },
}
