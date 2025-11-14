import { ChatLayout } from "@/components/chat/chat-layout";
import { conversations } from "@/lib/placeholder-data";

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-6 p-0 sm:p-0 h-full">
      <ChatLayout conversations={conversations} />
    </div>
  );
}
