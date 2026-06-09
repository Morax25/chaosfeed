"use client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
const MODERATION_URL = process.env.NEXT_PUBLIC_MODERATION_URL;

export const fetchPosts = async () => {
  const res = await fetch(`${SOCKET_URL}/api/feed`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();
  return data.data;
};

export const fetchPost = async (id: string, userId?: string) => {
  const url = `${SOCKET_URL}/api/feed/${id}${
    userId ? `?userId=${userId}` : ""
  }`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const data = await res.json();
  return data.data;
};

export const reportPost = async (
  reporter: string,
  postId: string,
  content: string
) => {
  const res = await fetch(`${MODERATION_URL}/report-post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reporter,
      postId,
      content,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to report post");
  }

  return res.json();
};

export const getModerationQueue = async () => {
  const res = await fetch(
    `${SOCKET_URL}/api/feed/moderation/queue`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch moderation queue");
  }

  const data = await res.json();
  return data.data;
};

export const deleteModerationPost = async (postId: string) => {
  const res = await fetch(
    `${SOCKET_URL}/api/feed/moderation/queue/${postId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  return res.json();
};
