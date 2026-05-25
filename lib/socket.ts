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

  return socket
}
