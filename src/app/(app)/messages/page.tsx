import { ChatLayout } from "@/components/chat/chat-layout";
import { conversations } from "@/lib/placeholder-data";

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-full">
      <ChatLayout conversations={conversations} />
    </div>
  );
}
