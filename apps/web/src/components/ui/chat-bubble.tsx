import clsx from "clsx";
import { glassRounded } from "./glass";

export const ChatBubble = ({
  text,
  from = "bot",
}: {
  text: string;
  from?: "bot" | "user";
}) => {
  return (
    <div
      className={clsx(
        glassRounded,
        "text-sm max-w-[85%] transition-colors duration-300 ",
        from === "bot"
          ? "self-start bg-white/90 dark:bg-white/10 text-slate-900  rounded-bl-[0%] dark:text-slate-200 border border-slate-200/80 dark:border-white/10"
          : "self-end bg-[#6E4BFF] dark:bg-[#A855F7] text-black border border-purple-300/70 rounded-br-[0%] dark:border-purple-400/70"
      )}
    >
      {text}
    </div>
  );
};