import Comments from "@/app/components/Comments";
import Posts from "@/app/components/Posts";
import { Separator } from "@/components/ui/separator";

const Page = async ({params}:{params: Promise<{post:string}>}) => {
  const { post } = await params;

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-1/2">
        <Posts title="This is my dummy post" pfp="random" username="Adarsh"/>
      </div>

      <div className="w-full h-120 overflow-y-auto md:w-1/2 md:pl-5">
        <Comments/>
      </div>
    </div>
  )
}

export default Page
