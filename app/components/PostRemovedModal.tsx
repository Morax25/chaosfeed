import { AlertTriangle } from "lucide-react";

const PostRemovedModal = ({
  category,
  reasoning,
}: {
  category: string;
  reasoning: string;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-red-400">
        <AlertTriangle />
        <h2 className="text-lg font-bold">
          Post Removed
        </h2>
      </div>

      <p className="text-gray-300">
        Your post was removed because it violated our
        community guidelines.
      </p>

      <div className="rounded-xl bg-black/40 p-3">
        <p className="text-xs text-gray-400">Category</p>
        <p className="font-medium capitalize text-white">
          {category.replaceAll("_", " ")}
        </p>
      </div>

      <div className="rounded-xl bg-black/40 p-3">
        <p className="text-xs text-white">Reason</p>
        <p className="text-white">{reasoning}</p>
      </div>
    </div>
  );
};

export default PostRemovedModal;
