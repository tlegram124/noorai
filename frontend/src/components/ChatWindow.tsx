import { useState, useEffect } from "react";
import { Send, User, Bot, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMessages } from "../services/api";
import { useTranslation } from "react-i18next";

interface Message {
  id: string;
  sender: "customer" | "ai" | "agent";
  content: string;
  timestamp: string;
}

export const ChatWindow = ({ conversationId }: { conversationId: string }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const { data: messages, isLoading, error } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchMessages(conversationId),
  });

  // Sync API messages with local messages to allow sending instant additions without reloading
  useEffect(() => {
    if (messages) {
      setLocalMessages(messages);
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "agent",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLocalMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[600px] border dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
        <div>
          <h2 className="font-semibold dark:text-white flex items-center gap-2">
            Conversation {conversationId}
          </h2>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {t('active_whatsapp')}
          </p>
        </div>
        <button className="text-sm px-3 py-1.5 bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400 rounded-md flex items-center gap-2 transition-colors">
          <AlertCircle size={16} /> {t('escalate')}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/20">
        {isLoading ? (
          <div className="text-center text-gray-500 py-8">Loading conversation history...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">Failed to load chat history.</div>
        ) : localMessages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No messages in this chat.</div>
        ) : (
          localMessages.map((msg) => {
            const isCustomer = msg.sender === "customer";
            const isAI = msg.sender === "ai";
            
            return (
              <div key={msg.id} className={`flex gap-3 ${isCustomer ? "" : "flex-row-reverse"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isCustomer ? 'bg-gray-200 dark:bg-gray-700' : isAI ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : 'bg-blue-600 text-white'}`}>
                  {isCustomer ? <User size={16} /> : isAI ? <Bot size={16} /> : <span className="text-xs font-bold">You</span>}
                </div>
                <div className={`max-w-[70%] ${isCustomer ? "" : "flex flex-col items-end"}`}>
                  <div className={`p-3 rounded-2xl ${isCustomer ? "bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-tl-sm shadow-sm" : isAI ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-900 dark:text-indigo-100 border border-indigo-100 dark:border-indigo-800/30 rounded-tr-sm" : "bg-blue-600 text-white rounded-tr-sm shadow-md"}`}>
                    {msg.content}
                  </div>
                  <span className="text-xs text-gray-400 mt-1 block">{msg.timestamp} {msg.sender === "ai" && "• Automated"}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            placeholder={t('type_msg')}
          />
          <button 
            onClick={handleSend} 
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
