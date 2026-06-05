import { Howl } from "howler";
import { useRef } from "react";

export const useSounds = () => {
  const sounds = useRef({
    postAdd: new Howl({
      src: ["/sounds/post.mp3"],
      volume: 0.6,
      preload: true,
    }),

    postRemove: new Howl({
      src: ["/sounds/removed.mp3"],
      volume: 0.5,
      preload: true,
    }),

    comment: new Howl({
      src: ["/sounds/timer.mp3"],
      volume: 0.4,
      preload: true,
    }),

    reported: new Howl({
      src: ["/sounds/cancelled.mp3"],
      volume: 0.4,
      preload: true,
    }),
  });

  return {
    playPostAdd: () => sounds.current.postAdd.play(),
    playPostRemove: () => sounds.current.postRemove.play(),
    playComment: () => sounds.current.comment.play(),
    playReported: () => sounds.current.reported.play(),
  };
};
