import { useState } from "react";
import { ChatWindow } from "../components/ChatWindow";
import { useTranslation } from "react-i18next";
import { MessageCircle, Clock, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchConversations } from "../services/api";

export const Conversations = () => {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState("#C-8921");

  const { data: conversations, isLoading, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  if (isLoading) return <div className="p-6 text-gray-500">Loading inbox...</div>;
  if (error || !conversations) return <div className="p-6 text-red-500">Failed to connect to active WhatsApp channels.</div>;


  return (
    <div className="p-6 h-[calc(100vh-2rem)] flex flex-col space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold dark:text-white">{t('conversations')}</h1>
      
      <div className="flex flex-1 gap-6 min-h-0">
        {/* Inbox List */}
        <div className="w-1/3 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b dark:border-gray-700">
            <input 
              type="text" 
              placeholder={t('search_conv')} 
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv: any) => (
              <div 
                key={conv.id} 
                onClick={() => setSelectedId(conv.id)}
                className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors group ${
                  selectedId === conv.id ? "bg-blue-50/50 dark:bg-gray-700/40 border-l-4 border-l-blue-600" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{conv.phone}</span>
                  <span className="text-xs text-gray-500">{conv.time}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{conv.lastMsg}</p>
                <div className="mt-2 flex items-center gap-2">
                  {conv.status === 'active' && <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded"><MessageCircle size={12}/> {t('active')}</span>}
                  {conv.status === 'resolved' && <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded"><CheckCircle size={12}/> {t('resolved')}</span>}
                  {conv.status === 'escalated' && <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded"><Clock size={12}/> {t('escalated')}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Chat */}
        <div className="flex-1">
          <ChatWindow conversationId={selectedId} />
        </div>
      </div>
    </div>
  );
};
