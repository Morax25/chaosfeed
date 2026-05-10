"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Clock, Heart, MessageCircle, TrendingUp } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const Posts = ({
  title,
  pfp,
  username,
  id,
  createdAt,
}: {
  title: string;
  pfp: string;
  username: string;
  id: string;
  createdAt: any;
}) => {
  const router = useRouter();
  const socket = useAppStore((s) => s.socket);

  const [timeLeft, setTimeLeft] = useState<number | null>(0);

  useEffect(() => {
    if (!id || !createdAt) return;

    const duration = 90 * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - createdAt;
      const remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));

      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        socket?.emit("post_expired", { postId: id });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [id, createdAt, socket]);

  return (
    <Card className="text-white bg-gray-900/80 w-full h-max rounded-[15px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={pfp} />
              <AvatarFallback className="font-bold text-xl bg-gray-300 text-gray-800">
                {username?.slice(0, 2)?.toUpperCase() || "UN"}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-white text-lg">{username || "N/A"}</h1>
              <p className="flex gap-1 items-center font-bold text-pink-400">
                <TrendingUp className="text-blue-500" size={15} /> Trending
              </p>
            </div>
          </div>

          <Badge className="flex items-center gap-1 bg-green-500 text-white">
            <Clock size={18} />
            <span>{timeLeft}s</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="p-3 text-lg rounded-[10px] bg-black border border-white/10 shadow-lg">
          <p>{title}</p>

          <div className="mt-3 border-t border-t-gray-400/30 flex items-center font-bold text-sm gap-4 pt-3">
            <div className="flex hover:text-pink-600 transition cursor-pointer items-center gap-1">
              <Heart size={20} strokeWidth={3} /> <p>25</p>
            </div>

            <div
              onClick={() => router.push(`/feed/${id}`)}
              className="flex items-center hover:text-pink-600 transition cursor-pointer gap-1"
            >
              <MessageCircle size={18} strokeWidth={3} /> <p>20</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Posts;
