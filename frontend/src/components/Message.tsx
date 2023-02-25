import dayjs from "dayjs";
import { useUserStore } from "../stores/userStore";
import { IMessage } from "../interfaces/index";

export default function Message({ created_at, sender_id, text }: IMessage) {
  const user = useUserStore((state) => state.user);
  const hours = dayjs(created_at).hour();
  const minutes =
    dayjs(created_at).minute() <= 9
      ? `0${dayjs(created_at).minute()}`
      : dayjs(created_at).minute();
  const isOwner = sender_id === user.id;

  return (
    <div className={`flex ${isOwner ? "justify-end" : null}`}>
      <div
        className={`text-white relative flex ${
          isOwner ? "bg-indigo-500" : "bg-zinc-800"
        } pl-2.5 pr-12 py-1 mb-3 max-w-[29rem] rounded-xl`}
      >
        <div className="break-words whitespace-pre-wrap max-w-[26rem] flow-root">
          {text}
        </div>
        <span className="text-xs absolute bottom-1 right-2 text-white opacity-40">
          {hours}:{minutes}
        </span>
      </div>
    </div>
  );
}
