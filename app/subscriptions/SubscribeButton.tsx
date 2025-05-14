"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type SubscribeButtonProps = {
  priceId: string
  variant?: "default" | "outline"
}

export default function SubscribeButton({
  priceId,
  variant,
}: SubscribeButtonProps) {
  const router = useRouter()
  const handleClick = async () => {
    router.push(`/subscriptions/checkout?priceId=${priceId}`)
  }

  return (
    <Button className="w-full" variant={variant} onClick={handleClick}>
      Subscribe
    </Button>
  )
}
