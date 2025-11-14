"use client";

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paperclip, Search, Send } from 'lucide-react';
import type { Conversation, Message } from '@/lib/types';

interface ChatLayoutProps {
  conversations: Conversation[];
}

export function ChatLayout({ conversations }: ChatLayoutProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
  const [messages, setMessages] = useState<Message[]>(selectedConversation.messages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const newMsg: Message = {
        id: `msg-${Date.now()}`,
        sender: 'brand',
        senderName: 'Brand Co.',
        text: newMessage,
        timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages(conversation.messages);
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] md:h-screen rounded-lg border-t md:border-t-0 md:border">
      <div className="w-full md:w-1/3 border-r">
        <div className="p-4 border-b">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9" />
            </div>
        </div>
        <ScrollArea className="h-[calc(100%-4.5rem)]">
          {conversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => handleSelectConversation(convo)}
              className={cn(
                'flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-muted',
                selectedConversation.id === convo.id && 'bg-muted'
              )}
            >
              <Avatar>
                <AvatarImage src={convo.influencerAvatar} alt={convo.influencerName} data-ai-hint="person portrait" />
                <AvatarFallback>{convo.influencerName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{convo.influencerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(convo.lastMessageTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground truncate">{convo.campaignTitle}</p>
                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
              </div>
            </button>
          ))}
        </ScrollArea>
      </div>

      <div className="hidden w-2/3 flex-col md:flex">
        <div className="flex items-center gap-3 border-b p-4">
            <Avatar>
                <AvatarImage src={selectedConversation.influencerAvatar} alt={selectedConversation.influencerName} data-ai-hint="person portrait" />
                <AvatarFallback>{selectedConversation.influencerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold">{selectedConversation.influencerName}</p>
                <p className="text-sm text-muted-foreground">{selectedConversation.campaignTitle}</p>
            </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-end gap-2',
                  message.sender === 'brand' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-xs rounded-lg p-3',
                    message.sender === 'brand'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="relative">
            <Input 
                placeholder="Type a message..." 
                className="pr-24"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
                <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handleSendMessage}>
                    Send <Send className="ml-2 h-4 w-4" />
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
