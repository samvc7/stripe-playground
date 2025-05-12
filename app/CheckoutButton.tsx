"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function CheckoutButton({ priceId }: { priceId: string }) {
  const router = useRouter()

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      body: JSON.stringify({ priceId }),
    })

    const data = await res.json()
    if (data.url) {
      router.push(data.url)
    } else {
      console.error("Checkout failed:", data.error)
    }
  }

  return <Button onClick={handleCheckout}>Checkout</Button>
}
