import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  Building2, MessageSquare, Database, UserPlus, Sparkles, Check, 
  ArrowRight, ArrowLeft, Upload, Plus, Trash2, Mail, Bot 
} from "lucide-react";

export const Onboarding = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Form State
  const [businessData, setBusinessData] = useState({
    name: "",
    industry: "ecommerce",
    language: "ar",
    currency: "MAD",
    escalationPhone: ""
  });

  const [channels, setChannels] = useState<Record<string, boolean>>({
    whatsapp: true,
    facebook: false,
    sms: false,
    email: false,
    livechat: false
  });

  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [team, setTeam] = useState([{ email: "", role: "agent" }]);
  const [files, setFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Step Navigations
  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else navigate("/dashboard");
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const newFiles = Array.from(e.target.files).map(f => f.name);
      setTimeout(() => {
        setFiles(prev => [...prev, ...newFiles]);
        setUploading(false);
      }, 1000);
    }
  };

  const addFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index));
  const updateFaq = (index: number, field: string, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  const addTeamMember = () => setTeam([...team, { email: "", role: "agent" }]);
  const removeTeamMember = (index: number) => setTeam(team.filter((_, i) => i !== index));
  const updateTeamMember = (index: number, field: string, value: string) => {
    const updated = [...team];
    updated[index] = { ...updated[index], [field]: value };
    setTeam(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-500 font-sans">
      {/* Container */}
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col min-h-[600px]">
        {/* Progress Bar & Header */}
        <div className="bg-slate-900 dark:bg-gray-950 p-6 md:p-8 text-white relative">
          <div className="absolute top-4 right-6 text-xs text-slate-400 font-semibold tracking-wider uppercase">
            Step {step} of {totalSteps}
          </div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-blue-400" /> Wasla AI Onboarding
          </h1>
          <p className="text-sm text-slate-400 mt-1 leading-relaxed">
            Let's configure your Moroccan customer service automation platform.
          </p>
          
          {/* Glowing Progress bar */}
          <div className="w-full bg-slate-800 dark:bg-gray-800 h-2 rounded-full mt-6 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(59,130,246,0.5)]"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Contents */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div>
            {/* Step 1: Business Identity */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-3 border-b dark:border-gray-800">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <Building2 size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Business Identity</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Business Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., My Moroccan Store"
                      value={businessData.name}
                      onChange={e => setBusinessData({ ...businessData, name: e.target.value })}
                      className="w-full p-2.5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Industry</label>
                    <select 
                      value={businessData.industry}
                      onChange={e => setBusinessData({ ...businessData, industry: e.target.value })}
                      className="w-full p-2.5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="ecommerce">E-commerce</option>
                      <option value="retail">Retail Store</option>
                      <option value="services">Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Default Language</label>
                    <select 
                      value={businessData.language}
                      onChange={e => setBusinessData({ ...businessData, language: e.target.value })}
                      className="w-full p-2.5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="ar">Arabic (العربية)</option>
                      <option value="fr">French (Français)</option>
                      <option value="en">English (US)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Primary Currency</label>
                    <select 
                      value={businessData.currency}
                      onChange={e => setBusinessData({ ...businessData, currency: e.target.value })}
                      className="w-full p-2.5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="MAD">Moroccan Dirham (MAD)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Human Escalation Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g., +212 600 123 456"
                    value={businessData.escalationPhone}
                    onChange={e => setBusinessData({ ...businessData, escalationPhone: e.target.value })}
                    className="w-full p-2.5 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Channel Integrations */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-3 border-b dark:border-gray-800">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <MessageSquare size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Channel Integration</h2>
                </div>
                <p className="text-sm text-gray-500">Toggle communication channels to configure automatically. You can complete secret keys later in dashboard settings.</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { id: "whatsapp", name: "WhatsApp Business API", desc: "Automate support and orders." },
                    { id: "facebook", name: "Meta Messenger & IG DMs", desc: "Reply on Facebook & Instagram." },
                    { id: "sms", name: "SMS Gateways (Morocco & Twilio)", desc: "Send tracking updates." },
                    { id: "email", name: "Email SMTP Support", desc: "Direct email ticketing integration." },
                    { id: "livechat", name: "Web Live Chat Widget", desc: "Embed real-time floating bubble." }
                  ].map((ch) => (
                    <div 
                      key={ch.id}
                      onClick={() => setChannels({ ...channels, [ch.id]: !channels[ch.id] })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-3 ${
                        channels[ch.id] 
                          ? "bg-slate-900 border-slate-950 text-white dark:bg-white dark:text-slate-950 dark:border-white" 
                          : "bg-white border-gray-100 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700/50 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center border-2 ${
                        channels[ch.id] ? "bg-emerald-500 border-emerald-600 text-white" : "border-gray-300 dark:border-gray-600"
                      }`}>
                        {channels[ch.id] && <Check size={12} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{ch.name}</h4>
                        <p className={`text-xs mt-0.5 ${channels[ch.id] ? "text-slate-400 dark:text-gray-500" : "text-gray-500"}`}>{ch.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Knowledge Base RAG Uploads */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-3 border-b dark:border-gray-800">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <Database size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Knowledge Base (RAG)</h2>
                </div>
                
                {/* File Uploader Panel */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Upload Support Guidelines & Catalog Documents</label>
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500 transition-colors cursor-pointer relative">
                    <input 
                      type="file" 
                      multiple 
                      onChange={handleFileUpload} 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload size={28} className="text-gray-400 mb-2" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {uploading ? "Analyzing documents..." : "Click or Drag PDF / DOCX files to upload"}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">Supported formats: PDF, DOCX, TXT (Max 10MB)</span>
                  </div>

                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {files.map((f, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                          <Check size={12} /> {f}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* FAQ Entries */}
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Custom Quick FAQs</label>
                    <button 
                      onClick={addFaq}
                      className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold"
                    >
                      <Plus size={14} /> Add FAQ Row
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                    {faqs.map((faq, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1 grid md:grid-cols-2 gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700">
                          <input 
                            type="text" 
                            placeholder="Question (e.g. Return policy?)" 
                            value={faq.question}
                            onChange={e => updateFaq(index, "question", e.target.value)}
                            className="bg-transparent text-sm focus:outline-none text-gray-900 dark:text-white"
                          />
                          <input 
                            type="text" 
                            placeholder="Answer (e.g. 15 days refund)" 
                            value={faq.answer}
                            onChange={e => updateFaq(index, "answer", e.target.value)}
                            className="bg-transparent text-sm focus:outline-none text-gray-900 dark:text-white"
                          />
                        </div>
                        {faqs.length > 1 && (
                          <button 
                            onClick={() => removeFaq(index)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Invite Team */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center gap-3 pb-3 border-b dark:border-gray-800">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <UserPlus size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Invite Team Members</h2>
                </div>
                <p className="text-sm text-gray-500">Provide teammate email addresses to grant access to omnichannel chat streams.</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Agent Roster</label>
                    <button 
                      onClick={addTeamMember}
                      className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold"
                    >
                      <Plus size={14} /> Add Row
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {team.map((member, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1 grid md:grid-cols-2 gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700">
                          <input 
                            type="email" 
                            placeholder="teammate@yourbusiness.ma" 
                            value={member.email}
                            onChange={e => updateTeamMember(index, "email", e.target.value)}
                            className="bg-transparent text-sm focus:outline-none text-gray-900 dark:text-white"
                          />
                          <select 
                            value={member.role}
                            onChange={e => updateTeamMember(index, "role", e.target.value)}
                            className="bg-transparent text-sm focus:outline-none text-gray-900 dark:text-white cursor-pointer"
                          >
                            <option value="agent">Standard Agent</option>
                            <option value="admin">Administrator</option>
                            <option value="viewer">Viewer Mode</option>
                          </select>
                        </div>
                        {team.length > 1 && (
                          <button 
                            onClick={() => removeTeamMember(index)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Onboarding Finished */}
            {step === 5 && (
              <div className="text-center py-8 space-y-6 animate-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-500/20">
                  <Check size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Wasla AI Setup Complete!</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
                    Your business RAG guidelines and omnichannel hooks are registered. You can now access full database controls and respond to customer queries.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 max-w-md mx-auto border dark:border-gray-700 text-left space-y-3">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Channels Summary</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(channels).map(([ch, active]) => active && (
                      <span key={ch} className="px-3 py-1 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-semibold tracking-wider uppercase">
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Nav Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t dark:border-gray-800">
            {step > 1 ? (
              <button 
                onClick={prevStep}
                className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <div /> // spacing placeholder
            )}

            <button 
              onClick={nextStep}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg font-semibold text-sm hover:opacity-95 shadow-md shadow-blue-500/10"
            >
              {step === totalSteps ? "Enter Dashboard" : "Continue"} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
