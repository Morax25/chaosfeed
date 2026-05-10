"use client"

import { useSocketInit } from "@/hooks/useSocketInit"
import { useSocketEvents } from "@/hooks/useSocketEvents"

type Props = {
  children: React.ReactNode
}

export const RealtimeProvider = ({ children }: Props) => {
  useSocketInit()
  useSocketEvents()

  return <>{children}</>
}