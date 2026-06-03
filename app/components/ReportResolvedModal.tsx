import { ShieldCheck } from "lucide-react";

const ReportResolvedModal = ({
  category,
  reasoning,
}: {
  category: string;
  reasoning: string;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-green-400">
        <ShieldCheck />
        <h2 className="text-lg font-bold">
          Report Reviewed Successfully
        </h2>
      </div>

      <p className="text-gray-300">
        Thank you for helping keep ChaosFeed safe.
        Our moderation system reviewed the reported content
        and determined it violated community guidelines.
      </p>

      <div className="rounded-xl bg-black/40 p-3">
        <p className="text-xs text-gray-400">Category</p>
        <p className="font-medium capitalize text-white">
          {category.replaceAll("_", " ")}
        </p>
      </div>

      <div className="rounded-xl bg-black/40 p-3">
        <p className="text-xs text-white">Reason</p>
        <p className="text-white" >{reasoning}</p>
      </div>
    </div>
  );
};

export default ReportResolvedModal;
