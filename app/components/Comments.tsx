import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import Comment from "./Comment";


const Comments = () => {
  return (
    <div className="h-full flex flex-col gap-4 w-full rounded-[20px] p-5 ">
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
    </div>
  );
};

export default Comments;
