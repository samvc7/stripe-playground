"use client"

import { Button } from "@/components/ui/button"

export function CheckoutForm() {
  return (
    <form action="/api/checkout_sessions" method="POST">
      <Button type="submit">Checkout</Button>
    </form>
  )
}
