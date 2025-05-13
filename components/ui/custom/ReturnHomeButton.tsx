import { Button } from "../button"
import { Home } from "lucide-react"
import Link from "next/link"

export const ReturnHomeButton = () => {
  return (
    <Button asChild>
      <Link href="/" className="w-full">
        <Home className="h-4 w-4" />
        Return to Home
      </Link>
    </Button>
  )
}
