import Comments from "@/app/components/Comments";
import Posts from "@/app/components/Posts";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Page = async ({params}:{params: Promise<{post:string}>}) => {
  const { post } = await params;

  return (
    <div className="flex flex-col lg:flex-row relative gap-5">
      <div className="w-full lg:w-1/2">
        <Posts title="This is my dummy post" pfp="random" username="Adarsh"/>
      </div>
      <div className="w-full h-130 md:h-200 lg:h-110 overflow-y-auto lg:w-1/2 md:pl-5">
        <Comments/>
      </div>
    </div>
  )
}

export default Page
