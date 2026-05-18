import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Settings as SettingsIcon, MessageSquare, Mail, Sparkles, Send, Bot, User, CheckCircle2, Copy, Check } from "lucide-react";

const CHANNELS = [
  {
    id: "whatsapp",
    name: "WhatsApp Integration",
    icon: MessageSquare,
    description: "Connect your official WhatsApp Business API using Twilio.",
    fields: [
      { id: "wa_sid", label: "Twilio Account SID", type: "password", placeholder: "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
      { id: "wa_token", label: "Twilio Auth Token", type: "password", placeholder: "••••••••••••••••••••••••••••••••" },
      { id: "wa_phone", label: "Twilio WhatsApp Number", type: "text", placeholder: "+14155238886" }
    ]
  },
  {
    id: "facebook",
    name: "Meta Messenger & Instagram DMs",
    icon: Sparkles,
    description: "Receive customer chats directly from your Facebook Page and Instagram business account.",
    fields: [
      { id: "fb_page_id", label: "Facebook Page ID", type: "text", placeholder: "1098274619" },
      { id: "fb_token", label: "Page Access Token", type: "password", placeholder: "EAAJ..." },
      { id: "fb_verify", label: "Webhook Verify Token", type: "text", placeholder: "wasla_verify_token_secure" }
    ]
  },
  {
    id: "sms",
    name: "SMS Carrier Gateways",
    icon: Send,
    description: "Integrate twilio or local Moroccan carriers like Maroc Telecom and Inwi for text message follow-ups.",
    fields: [
      { id: "sms_provider", label: "SMS Provider", type: "select", options: ["Twilio SMS Gateway", "Maroc Telecom API Gateway", "Inwi Business Gateway"] },
      { id: "sms_key", label: "Gateway API Secret Key / Auth Token", type: "password", placeholder: "••••••••••••••••••••••••••••••••" },
      { id: "sms_sender", label: "Sender ID (Alphanumeric Mask)", type: "text", placeholder: "WaslaAI" }
    ]
  },
  {
    id: "email",
    name: "Email SMTP & Inbound Parse",
    icon: Mail,
    description: "Connect SendGrid or AWS SES to manage email support tickets automatically.",
    fields: [
      { id: "mail_provider", label: "Email Provider", type: "select", options: ["SendGrid Web API", "AWS Simple Email Service (SES)", "Mailgun API"] },
      { id: "mail_key", label: "Provider API Key", type: "password", placeholder: "SG.xxxxxxxxxxxxxxxx" },
      { id: "mail_from", label: "Verified Sender Email Address", type: "text", placeholder: "support@yourstore.ma" }
    ]
  },
  {
    id: "livechat",
    name: "Web Chat Widget Integration",
    icon: Bot,
    description: "Add a floating conversational support widget directly onto your WooCommerce or Shopify storefront.",
    fields: [] // Display copyable code block instead
  },
  {
    id: "voice",
    name: "Voice IVR Assistant",
    icon: User,
    description: "Configure automated phone greetings and AI voice response flow on local (+212) numbers.",
    fields: [
      { id: "voice_number", label: "Twilio voice phone number", type: "text", placeholder: "+212 522 XXX XXX" },
      { id: "voice_lang", label: "IVR Speech Recognition Language", type: "select", options: ["Moroccan Arabic (ar-MA)", "French (fr-FR)", "English (en-US)"] }
    ]
  }
];

export const Settings = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("integrations");
  const [enabledChannels, setEnabledChannels] = useState<Record<string, boolean>>({
    whatsapp: true,
    facebook: false,
    sms: false,
    email: false,
    livechat: false,
    voice: false
  });
  
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toggleChannel = (channelId: string) => {
    setEnabledChannels(prev => ({
      ...prev,
      [channelId]: !prev[channelId]
    }));
  };

  const copyWidgetCode = () => {
    const code = `<script src="https://cdn.wasla.ai/chat-widget.js" data-business-id="wasla-biz-88921" defer></script>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-6 h-[calc(100vh-2rem)] flex flex-col space-y-6 overflow-y-auto animate-in fade-in duration-500 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white dark:bg-white dark:text-slate-950 px-4 py-3 rounded-xl shadow-lg border border-slate-800 dark:border-gray-200 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={18} className="text-emerald-500" />
          <span className="text-sm font-semibold">Integrations Saved Successfully</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Configure your profile, notification rules, and omnichannel keys.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg font-semibold text-sm hover:opacity-95 shadow-md shadow-blue-500/10 transition-opacity"
        >
          Save Changes
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b dark:border-gray-800">
        <button
          onClick={() => setActiveTab("integrations")}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "integrations"
              ? "border-blue-600 text-blue-600 dark:text-white dark:border-white"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Omnichannel Integrations
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "profile"
              ? "border-blue-600 text-blue-600 dark:text-white dark:border-white"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Business Profile
        </button>
      </div>

      <div className="flex-1 min-h-0">
        {activeTab === "integrations" ? (
          <div className="space-y-6 max-w-4xl">
            {CHANNELS.map((ch) => {
              const Icon = ch.icon;
              const isActive = enabledChannels[ch.id];
              return (
                <div key={ch.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-all duration-300">
                  <div className="p-5 flex items-start justify-between border-b dark:border-gray-700/50">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">{ch.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{ch.description}</p>
                      </div>
                    </div>
                    {/* Toggle Switch */}
                    <button
                      onClick={() => toggleChannel(ch.id)}
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                        isActive ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                        isActive ? "translate-x-6" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {isActive && (
                    <div className="p-5 bg-gray-50/50 dark:bg-gray-900/10 space-y-4">
                      {ch.id === "livechat" ? (
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Embed Script Tag</label>
                          <div className="flex gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border dark:border-gray-800 font-mono text-xs text-gray-600 dark:text-gray-300 items-center justify-between">
                            <span className="truncate">
                              &lt;script src="https://cdn.wasla.ai/chat-widget.js" data-business-id="wasla-biz-88921" defer&gt;&lt;/script&gt;
                            </span>
                            <button 
                              onClick={copyWidgetCode}
                              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors text-gray-500 flex-shrink-0"
                            >
                              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                            </button>
                          </div>
                          <p className="text-xs text-gray-400">Copy this code and paste it inside the &lt;head&gt; element of your store html file to instantly launch active customer web chats.</p>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                          {ch.fields.map((f: any) => (
                            <div key={f.id} className="space-y-1">
                              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">{f.label}</label>
                              {f.type === "select" ? (
                                <select className="w-full p-2.5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                                  {f.options.map((opt: string) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              ) : (
                                <input 
                                  type={f.type} 
                                  placeholder={f.placeholder}
                                  className="w-full p-2.5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm max-w-2xl space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Store Identity</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Business / Store Name</label>
                <input 
                  type="text" 
                  defaultValue="Wasla E-Commerce" 
                  className="w-full p-2.5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Primary Support Region</label>
                <select className="w-full p-2.5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Morocco (MAD)</option>
                  <option>France (EUR)</option>
                  <option>United States (USD)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Default AI Greeting Language</label>
                <select className="w-full p-2.5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Arabic (العربية)</option>
                  <option>French (Français)</option>
                  <option>English (US)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Human Escalation Phone</label>
                <input 
                  type="text" 
                  defaultValue="+212 600 123 456" 
                  className="w-full p-2.5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Custom System RAG Guidelines</label>
              <textarea 
                rows={4}
                defaultValue="You are an elite, highly professional AI support agent representing our store. Keep answers concise, offer help in Moroccan Arabic, French, and English, and query order databases when tracking queries are asked."
                className="w-full p-2.5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
