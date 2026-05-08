"use client"
import Posts from '../components/Posts'

const page = () => {
  const posts = [
  {
    username: "codewithraj",
    pfp: "https://i.pravatar.cc/150?img=1",
    title: "Finally understood how async await actually works",
  },
  {
    username: "devnisha",
    pfp: "https://i.pravatar.cc/150?img=5",
    title: "Spent 6 hours debugging a missing await",
  },
  {
    username: "aryanbuilds",
    pfp: "https://i.pravatar.cc/150?img=8",
    title: "Why is Docker networking so confusing sometimes",
  },
  {
    username: "backendboy",
    pfp: "https://i.pravatar.cc/150?img=12",
    title: "Just deployed my first fullstack app on VPS",
  },
  {
    username: "sneha.codes",
    pfp: "https://i.pravatar.cc/150?img=16",
    title: "Redis caching made my API insanely fast",
  },
  {
    username: "nullpointer",
    pfp: "https://i.pravatar.cc/150?img=20",
    title: "Anyone else overthinking database design?",
  },
  {
    username: "pixeldev",
    pfp: "https://i.pravatar.cc/150?img=25",
    title: "Today I learned how JWT authentication really works",
  },
  {
    username: "thebughunter",
    pfp: "https://i.pravatar.cc/150?img=28",
    title: "Socket.IO feels like magic sometimes",
  },
  {
    username: "its_me_adi",
    pfp: "https://i.pravatar.cc/150?img=31",
    title: "MongoDB aggregation pipeline is breaking my brain",
  },
  {
    username: "stacktrace",
    pfp: "https://i.pravatar.cc/150?img=35",
    title: "Accidentally crashed my server with an infinite loop",
  },
  {
    username: "frontendwizard",
    pfp: "https://i.pravatar.cc/150?img=40",
    title: "Trying to understand system design as a solo developer",
  },
  {
    username: "node_ninja",
    pfp: "https://i.pravatar.cc/150?img=44",
    title: "BullMQ is honestly underrated",
  },
  {
    username: "sqlmaster",
    pfp: "https://i.pravatar.cc/150?img=48",
    title: "PostgreSQL joins finally make sense to me now",
  },
  {
    username: "uiuxghost",
    pfp: "https://i.pravatar.cc/150?img=52",
    title: "Why does CSS behave differently every single time",
  },
  {
    username: "socketking",
    pfp: "https://i.pravatar.cc/150?img=56",
    title: "Built a realtime chat app and it actually works",
  },
  {
    username: "deepcoder",
    pfp: "https://i.pravatar.cc/150?img=60",
    title: "Learning backend architecture is way harder than frontend",
  },
  {
    username: "memoryleak",
    pfp: "https://i.pravatar.cc/150?img=64",
    title: "Finally fixed a memory leak in my Node.js app",
  },
  {
    username: "cachewarrior",
    pfp: "https://i.pravatar.cc/150?img=68",
    title: "Anyone using Redis for rate limiting in production?",
  },
  {
    username: "rerendered",
    pfp: "https://i.pravatar.cc/150?img=72",
    title: "React rerenders are still confusing me",
  },
  {
    username: "deploypanic",
    pfp: "https://i.pravatar.cc/150?img=76",
    title: "Switched from localhost to production and everything broke",
  },
]
  return (
<div className='pt-2 relative px-2 sm:px-4 flex flex-col gap-5 h-full w-full'>
  {posts.map((item, index) => (
    <Posts
      key={index}
      title={item.title}
      username={item.username}
      pfp={item.pfp}
    />
  ))}
</div>
  )
}

export default page
