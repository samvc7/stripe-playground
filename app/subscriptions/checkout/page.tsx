"use client"

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { fetchClientSecret } from "../actions/stripe"
import { useSearchParams } from "next/navigation"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
)

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const priceId = searchParams.get("priceId")

  if (!priceId) {
    throw new Error("Price ID is required")
  }
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
