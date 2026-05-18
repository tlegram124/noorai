import { useState, useEffect } from "react";
import { ChatWindow } from "../components/ChatWindow";
import { useTranslation } from "react-i18next";
import { MessageCircle, Clock, CheckCircle, Mail, Sparkles, MessageSquare, Send, Bot, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchConversations } from "../services/api";

const CHANNELS = [
  { id: "whatsapp", name: "WhatsApp", icon: MessageSquare, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { id: "facebook", name: "Messenger", icon: MessageCircle, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  { id: "instagram", name: "Instagram DMs", icon: Sparkles, color: "text-pink-500 bg-pink-500/10 border-pink-500/20" },
  { id: "sms", name: "SMS Gateways", icon: Send, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  { id: "email", name: "Email Inbox", icon: Mail, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  { id: "livechat", name: "Web Chat", icon: Bot, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" },
  { id: "voice", name: "Voice Transcripts", icon: User, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" }
];

export const Conversations = () => {
  const { t } = useTranslation();
  const [selectedChannel, setSelectedChannel] = useState("whatsapp");
  const [selectedId, setSelectedId] = useState("");

  const { data: conversations, isLoading, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  // Filter conversations based on selected channel
  const filteredConversations = conversations?.filter((conv: any) => conv.channel === selectedChannel) || [];

  // When selectedChannel changes, auto-select the first conversation in that channel list
  useEffect(() => {
    if (filteredConversations.length > 0) {
      setSelectedId(filteredConversations[0].id);
    } else {
      setSelectedId("");
    }
  }, [selectedChannel, conversations]);

  if (isLoading) return <div className="p-6 text-gray-500">Loading omnichannel inbox...</div>;
  if (error || !conversations) return <div className="p-6 text-red-500">Failed to connect to active omnichannel streams.</div>;

  return (
    <div className="p-6 h-[calc(100vh-2rem)] flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white">{t('conversations')}</h1>
        <div className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-500 text-xs font-semibold">
          Omnichannel Enabled
        </div>
      </div>
      
      <div className="flex flex-1 gap-6 min-h-0">
        {/* Column 1: Channel Switcher (Sleek Side panel) */}
        <div className="w-16 md:w-56 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 space-y-2">
          <span className="hidden md:inline-block text-[11px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Channels</span>
          {CHANNELS.map((ch) => {
            const Icon = ch.icon;
            const isSelected = selectedChannel === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChannel(ch.id)}
                className={`w-full flex items-center justify-center md:justify-start gap-3 p-3 rounded-xl border transition-all duration-200 ${
                  isSelected 
                    ? "bg-slate-900 border-slate-950 text-white dark:bg-white dark:border-white dark:text-slate-950 font-semibold shadow-md"
                    : "border-transparent text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50"
                }`}
              >
                <Icon size={18} className={isSelected ? "" : "text-gray-400"} />
                <span className="hidden md:inline text-sm truncate">{ch.name}</span>
              </button>
            );
          })}
        </div>

        {/* Column 2: Inbox List */}
        <div className="w-1/3 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b dark:border-gray-700">
            <input 
              type="text" 
              placeholder={t('search_conv')} 
              className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conv: any) => (
                <div 
                  key={conv.id} 
                  onClick={() => setSelectedId(conv.id)}
                  className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors group ${
                    selectedId === conv.id ? "bg-blue-50/50 dark:bg-gray-700/40 border-l-4 border-l-blue-600" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[130px]">{conv.phone}</span>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{conv.lastMsg}</p>
                  <div className="mt-2 flex items-center gap-2">
                    {conv.status === 'active' && <span className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded"><MessageCircle size={12}/> {t('active')}</span>}
                    {conv.status === 'resolved' && <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded"><CheckCircle size={12}/> {t('resolved')}</span>}
                    {conv.status === 'escalated' && <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded"><Clock size={12}/> {t('escalated')}</span>}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 dark:text-gray-500 text-sm">
                No active conversations on this channel.
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Active Chat */}
        <div className="flex-1 min-w-0">
          {selectedId ? (
            <ChatWindow conversationId={selectedId} />
          ) : (
            <div className="h-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4 text-gray-400">
                <MessageCircle size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Conversation Selected</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-[280px]">Select a channel on the left, then pick a customer inbox to begin replying.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
