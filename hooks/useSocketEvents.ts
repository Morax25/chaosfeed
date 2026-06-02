"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export const useSocketEvents = () => {
  const socket = useAppStore((s) => s.socket);
  const upsertPost = useAppStore((s) => s.upsertPost);
  const setUserCount = useAppStore((s) => s.setUserCount);
  const setComments = useAppStore((s) => s.setComments);
  const addComment = useAppStore((s) => s.addComment);
  const updatePostCommentCount = useAppStore((s) => s.updatePostCommentCount);

  useEffect(() => {
    if (!socket) return;

    const handlePostCreated = (post: any) => {
      upsertPost(post);
    };

const handlePostRemoved = async ({ postId }: any) => {
  console.log("POST REMOVED", postId)
  await useAppStore.getState().fetchFeed()
}

    const handleCommentAdded = (comment: any) => {
      addComment(comment);
    };

    const handleCommentsLoaded = (comments: any[]) => {
      setComments(comments);
    };

    const handlePostLiked = ({ postId, likes, likedByMe, userId }: any) => {
      const currentUser = useAppStore.getState().user;
      useAppStore.setState((state) => ({
        feed: state.feed.map((p) =>
          p.id === postId
            ? {
                ...p,
                likes,
                likedByMe:
                  currentUser?.userId === userId ? likedByMe : p.likedByMe,
              }
            : p,
        ),
      }));
    };

    const handlePostUpdated = ({ postId, comments }: any) => {
      updatePostCommentCount(postId, comments);
    };

    const handleOnlineUsers = (count: number) => {
      setUserCount(count);
    };

    socket.on("post_created", handlePostCreated);
    socket.on("post_removed", handlePostRemoved);
    socket.on("comment_added", handleCommentAdded);
    socket.on("comments_loaded", handleCommentsLoaded);
    socket.on("post_liked", handlePostLiked);
    socket.on("post_updated", handlePostUpdated);
    socket.on("online_users", handleOnlineUsers);

    return () => {
      socket.off("post_created", handlePostCreated);
      socket.off("post_removed", handlePostRemoved);
      socket.off("comment_added", handleCommentAdded);
      socket.off("comments_loaded", handleCommentsLoaded);
      socket.off("post_liked", handlePostLiked);
      socket.off("post_updated", handlePostUpdated);
      socket.off("online_users", handleOnlineUsers);
    };
  }, [
    socket,
    upsertPost,
    setUserCount,
    setComments,
    addComment,
    updatePostCommentCount,
  ]);
};
