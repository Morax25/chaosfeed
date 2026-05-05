import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  seed: string;
  name?: string;
};

const Page = ({ seed, name = "User" }: Props) => {
  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${'oop'}`;

  return (
   <div>
    Hi
   </div>
  );
};

export default Page;
