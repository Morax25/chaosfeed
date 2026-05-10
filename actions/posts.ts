export const fetchPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/feed`, {
    cache: "no-store",
  })

  if (!res.ok) throw new Error("Failed to fetch posts")

  const data = await res.json()
  return data.data
}