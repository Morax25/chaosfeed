"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { useDrawer } from "@/store/drawerStore";
import { useSounds } from "@/hooks/useSounds";

export const useSocketEvents = () => {
  const socket = useAppStore((s) => s.socket);
  const upsertPost = useAppStore((s) => s.upsertPost);
  const removePost = useAppStore((s) => s.removePost);
  const setUserCount = useAppStore((s) => s.setUserCount);
  const setComments = useAppStore((s) => s.setComments);
  const addComment = useAppStore((s) => s.addComment);
  const updatePostCommentCount = useAppStore((s) => s.updatePostCommentCount);

  const pathname = usePathname();

  const { playPostAdd, playPostRemove, playComment, playReported } =
    useSounds();

  useEffect(() => {
    if (!socket) return;

    const handlePostCreated = (post: any) => {
      upsertPost(post);
      playPostAdd();
    };

    const handlePostRemoved = ({
      postId,
      stats,
    }: {
      postId: string;
      stats: any;
    }) => {
      const feed = useAppStore.getState().feed;
      const user = useAppStore.getState().user;
      const post = feed.find((p) => p.id === postId);

      playPostRemove();

      removePost(postId);
      if (post?.user?.userId === user?.userId && stats) {
        useDrawer.getState().openDrawer({
          type: "postExpired",
          title: "Post Expired",
          props: {
            duration: stats.duration,
            comments: stats.comments,
            likes: stats.likes,
          },
        });
      }
    };

    const handleModerationNotification = ({
      variant,
      category,
      reasoning,
    }: {
      variant: "post_removed" | "report_resolved";
      category: string;
      reasoning: string;
    }) => {
      const openDrawer = useDrawer.getState().openDrawer;

      if (variant === "post_removed") {
        playReported();

        openDrawer({
          type: "notification",
          title: "Post Removed",
          props: {
            variant,
            category,
            reasoning,
          },
        });
      } else if (variant === "report_resolved") {
        playPostRemove();

        openDrawer({
          type: "notification",
          title: "Report Reviewed",
          props: {
            variant,
            category,
            reasoning,
          },
        });
      }
    };

    const handleCommentAdded = (comment: any) => {
      addComment(comment);

      const currentUserId = useAppStore.getState().user?.userId;
      const feed = useAppStore.getState().feed;
      const postId = comment?.postId;
      const isOnPostPage = pathname === `/feed/${postId}`;
      const isPostOwner =
        feed.find((p) => p.id === postId)?.user?.userId === currentUserId;
      const isCommenter = comment?.user?.userId === currentUserId;

      if (isOnPostPage || isPostOwner || isCommenter) {
        playComment();
      }
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

    const handlePostUpdated = ({ postId, comments, expiresAt }: any) => {
      updatePostCommentCount(postId, comments, expiresAt);
    };

    const handleOnlineUsers = (count: number) => {
      setUserCount(count);
    };

    socket.on("post_created", handlePostCreated);
    socket.on("post_removed", handlePostRemoved);
    socket.on("moderation_notification", handleModerationNotification);
    socket.on("comment_added", handleCommentAdded);
    socket.on("comments_loaded", handleCommentsLoaded);
    socket.on("post_liked", handlePostLiked);
    socket.on("post_updated", handlePostUpdated);
    socket.on("online_users", handleOnlineUsers);

    return () => {
      socket.off("post_created", handlePostCreated);
      socket.off("post_removed", handlePostRemoved);
      socket.off("moderation_notification", handleModerationNotification);
      socket.off("comment_added", handleCommentAdded);
      socket.off("comments_loaded", handleCommentsLoaded);
      socket.off("post_liked", handlePostLiked);
      socket.off("post_updated", handlePostUpdated);
      socket.off("online_users", handleOnlineUsers);
    };
  }, [
    socket,
    pathname,
    upsertPost,
    removePost,
    setUserCount,
    setComments,
    addComment,
    updatePostCommentCount,
    playPostAdd,
    playPostRemove,
    playComment,
    playReported,
  ]);
};
