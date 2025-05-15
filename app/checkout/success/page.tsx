import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ReturnHomeButton } from "@/components/ui/custom/ReturnHomeButton"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { format } from "date-fns"

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error("Invalid session ID")
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  })

  if (session.status === "open") {
    return redirect("/")
  }

  if (session.status === "complete") {
    return (
      <div className="container max-w-md mx-auto mt-10 p-4 text-center">
        <Card>
          <CardHeader>
            <div className="mx-auto flex items-center justify-center h-15 w-15 rounded-full bg-green-100">
              <CheckCircle className="text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Payment Successful
            </CardTitle>
            <CardDescription className="text-sm">
              Thank you for your purchase!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-6">
              <div className="mb-2 text-sm font-medium">Order Details</div>
              <div className="text-sm text-muted-foreground">
                <p>Order #: 1234567890</p>
                {/* <p>Item: {session.payment_intent}</p> */}
                <p>
                  Date: {format(new Date().toLocaleDateString(), "dd.MM.yy")}
                </p>
                <p>Email: {session.customer_details?.email}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address with all
              the details of your purchase.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <ReturnHomeButton />
          </CardFooter>
        </Card>
      </div>
    )
  }
}
