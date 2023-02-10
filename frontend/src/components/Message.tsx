export type messageProps = {
  id: string;
  text: string;
  senderId: string;
  createdAt: string;
};

export default function Message({
  id,
  text,
  senderId,
  createdAt,
}: messageProps) {
  return (
    <div className={`flex ${id === senderId ? "justify-end" : null}`}>
      <div
        className={`text-white flex relative ${
          id === senderId ? "bg-indigo-500" : "bg-zinc-700"
        } pl-2 pr-4 py-1 w-fit m-2 rounded-lg`}
      >
        <p className="">{text}</p>
        <span className="text-xs relative top-2 left-2 text-white opacity-70">
          {createdAt}
        </span>
      </div>
    </div>
  );
}
