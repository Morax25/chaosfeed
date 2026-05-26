import ChatRoom from "@/app/components/ChatRoom";

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return <ChatRoom roomId={id} />;
};

export default Page;
