"use client"

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { fetchClientSecret } from "../actions/stripe"
import { loadStripe } from "@stripe/stripe-js"

type CheckoutSubscriptionProps = {
  priceId: string
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
)

export default function CheckoutSubscription({
  priceId,
}: CheckoutSubscriptionProps) {
  const fetchClientSecretByPriceId = async () => {
    const clientSecret = await fetchClientSecret(priceId)
    if (!clientSecret) {
      throw new Error("Failed to fetch client secret")
    }
    return clientSecret
  }

  return (
    <div id="checkout" className="mt-6">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret: fetchClientSecretByPriceId }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
