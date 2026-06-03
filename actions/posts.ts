export const fetchPosts = async () => {
  const userId = localStorage.getItem("userId")

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SOCKET_URL}/api/feed${userId ? `?userId=${userId}` : ""}`,
    { cache: "no-store" }
  )

  if (!res.ok) throw new Error("Failed to fetch posts")

  const data = await res.json()
  return data.data
}

export const reportPost = async (reporter:string, postId: string, content: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MODERATION_URL}/report-post`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reporter, postId, content }),
    }
  )

  if (!res.ok) throw new Error("Failed to report post")

  return res.json()
}
