import { NextResponse } from "next/server"
import { headers } from "next/headers"

import { stripe } from "../../../lib/stripe"

export async function POST(req: Request) {
  try {
    const headersList = await headers()
    const origin = headersList.get("origin")
    const formData = await req.formData()
    const productId = formData.get("productId")
    console.log("🚀 ~ POST ~ productId:", productId)

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Test Product",
            },
            unit_amount: 1999,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    })

    return NextResponse.redirect(session.url!, 303)
  } catch (err) {
    console.error("Stripe checkout error:", err)

    return NextResponse.json(
      { error: "Failed to start checkout." },
      { status: 500 }
    )
  }
}
