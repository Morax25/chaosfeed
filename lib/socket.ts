import { io } from "socket.io-client"

export const createSocket = () => {
  const userId = localStorage.getItem("userId")

  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    auth: {
      userId: userId || null,
    },
    transports: ["websocket"],
    reconnection: true,
    timeout: 10000,
  })

  socket.on("connect", () => {
    console.log("socket connected:", socket.id)
  })

  socket.on("connect_error", (err) => {
    console.log("socket connect error:", err.message)
  })

  return socket
}