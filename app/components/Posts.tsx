"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Clock,
  Heart,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

const Posts = ({title, pfp, username}:{title:string, pfp:string, username:string}) => {
  return (
    <Card className="p-3 text-white bg-gray-900/80 w-full h-max rounded-[15px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={pfp} />
              <AvatarFallback className="font-bold text-xl bg-gray-300 text-gray-800">
                UN
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-white text-lg">{username || "N/A"}</h1>
              <p className="flex gap-1 items-center font-bold text-pink-400">
                {<TrendingUp className="text-blue-500" size={15} />} Trending
              </p>
            </div>
          </div>
          <div>
            <Badge
              className="
    inline-flex items-center gap-1 px-3 py-1.5 text-sm font-semibold
    text-white rounded-full bg-green-500 shadow-md
    transition-transform duration-200 ease-in-out hover:scale-105
  "
            >
              <Clock size={18} />
              <span>90s</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-3 text-lg rounded-[10px] bg-black border border-white/10 shadow shadow-lg">
          <p>
 {title}
          </p>
          <div className="mt-3 border-t border-t-gray-400/30 flex justify-start items-center font-bold text-sm gap-4 pt-3">
            <div className="flex hover:text-pink-600 hover:scale-120 transition cursor-pointer items-center justify-center gap-1">
              <Heart size={20} strokeWidth={3} /> <p>25</p>
            </div>
            <div className="flex items-center  hover:text-pink-600 transition hover:scale-115 cursor-pointer justify-center gap-1">
              <MessageCircle className="" strokeWidth={3} size={18} /> <p>20</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Posts;
