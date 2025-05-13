import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { ReturnHomeButton } from "@/components/ui/custom/ReturnHomeButton"
import { AlertCircle } from "lucide-react"

export default function CancelPage() {
  return (
    <div className="container max-w-md mx-auto mt-10 p-4 text-center">
      <Card>
        <CardHeader>
          <div className="mx-auto flex items-center justify-center h-15 w-15 rounded-full bg-amber-100">
            <AlertCircle className="text-amber-400" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Payment Cancelled
          </CardTitle>
          <CardDescription className="text-sm">
            Your payment was not completed. No charges have been made to your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If you encountered any issues during the payment process, please try
            again or contact customer support for assistance.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <ReturnHomeButton />
        </CardFooter>
      </Card>
    </div>
  )
}
