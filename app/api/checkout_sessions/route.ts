import { NextResponse } from "next/server"
import { headers } from "next/headers"

import { stripe } from "../../../lib/stripe"

export async function POST(req: Request) {
  try {
    const headersList = await headers()
    const origin = headersList.get("origin")
    const { priceId } = await req.json()

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: ["card", "paypal"],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (err) {
    console.error("Stripe checkout error:", err)

    return NextResponse.json(
      { error: "Failed to start checkout." },
      { status: 500 }
    )
  }
}
