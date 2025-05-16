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
import { addMonths, format } from "date-fns"
import { CheckCircle } from "lucide-react"
import { redirect } from "next/navigation"

export default async function ReturnPage({
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

  const todayFormatted = format(new Date(), "dd.MM.yyyy")

  const nextBilling = format(addMonths(new Date(), 1), "dd.MM.yyyy")

  if (session.status === "complete") {
    return (
      <main className="flex items-center justify-center mt-10 text-center">
        <Card className="max-w-lg gap-6">
          <CardHeader>
            <div className="mx-auto flex items-center justify-center h-15 w-15 rounded-full bg-green-100">
              <CheckCircle className="text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">
              <h1>Subscription Activated!</h1>
            </CardTitle>

            <CardDescription>
              Thank you for subscribing. Your membership is now active.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-6">
              <div className="mb-2 text-sm font-medium">
                Subscription Details
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Subscription ID: SUB-123456789</p>
                <p>Start Date: {todayFormatted}</p>
                <p>Next Billing Date: {nextBilling}</p>
                <p>Email: {session.customer_details?.email}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent with all the details of your
              subscription. You now have access to all the benefits of your
              membership plan.
            </p>
          </CardContent>

          <CardFooter>
            <ReturnHomeButton />
          </CardFooter>
        </Card>
      </main>
    )
  }
}
