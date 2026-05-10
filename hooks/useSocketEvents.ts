"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export const useSocketEvents = () => {
  const socket = useAppStore((s) => s.socket);
  const upsertPost = useAppStore((s) => s.upsertPost);
  const setUserCount = useAppStore((s) => s.setUserCount);

  useEffect(() => {
    if (!socket) return;

    const handlePostCreated = (post: any) => {
      upsertPost(post);
    };

    const handlePostRemoved = ({ postId }: any) => {
      useAppStore.setState((state) => ({
        feed: state.feed.filter((p) => p.id !== postId),
      }));
    };

    const handleCommentAdded = (comment: any) => {
      useAppStore.setState((state) => ({
        comments: [comment, ...state.comments],
      }));
    };

    const handlePostLiked = ({ postId, likes }: any) => {
      useAppStore.setState((state) => ({
        feed: state.feed.map((p) =>
          p.id === postId ? { ...p, likes } : p
        ),
      }));
    };

    const handleOnlineUsers = (count: number) => {
      setUserCount(count);
    };

    socket.on("post_created", handlePostCreated);
    socket.on("post_removed", handlePostRemoved);
    socket.on("comment_added", handleCommentAdded);
    socket.on("post_liked", handlePostLiked);
    socket.on("online_users", handleOnlineUsers);

    return () => {
      socket.off("post_created", handlePostCreated);
      socket.off("post_removed", handlePostRemoved);
      socket.off("comment_added", handleCommentAdded);
      socket.off("post_liked", handlePostLiked);
      socket.off("online_users", handleOnlineUsers);
    };
  }, [socket, upsertPost, setUserCount]);
};