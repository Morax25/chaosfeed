"use client"

import { useEffect } from "react"
import { createSocket } from "@/lib/socket"
import { useAppStore } from "@/store/useAppStore"

export const useSocketInit = () => {
  const setSocket = useAppStore((s) => s.setSocket)
  const setUser = useAppStore((s) => s.setUser)

  useEffect(() => {
    const socket = createSocket()

    setSocket(socket)

    const handleMe = (user: any) => {
      setUser(user)
      localStorage.setItem("userId", user.userId)
    }

    socket.on("me", handleMe)

    return () => {
      socket.off("me", handleMe)
      socket.disconnect()
    }
  }, [setSocket, setUser])
}