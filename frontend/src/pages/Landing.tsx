import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Sparkles, Languages, Database, Check, Zap, Mail, Shield, User, Bot } from "lucide-react";
import heroImg from "../assets/hero.png";

export const Landing = () => {
  const isLoggedIn = localStorage.getItem("wasla_token") !== null;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-900 bg-slate-950/70 backdrop-blur-md sticky top-0 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Wasla AI
          </span>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Link 
              to="/dashboard" 
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300 flex items-center gap-2 hover:scale-[1.02]"
            >
              Go to Dashboard <ArrowRight size={18} />
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-28 text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-semibold tracking-wide uppercase animate-pulse">
          <Sparkles size={14} /> Next-Gen Omnichannel Customer Support AI
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
          The Worldwide AI-First <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Omnichannel</span> Inbox
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Unify WhatsApp, Facebook, Instagram, SMS, Email, Live Chat, and Voice IVR into a single intelligent feed. Resolve inquiries globally with semantic RAG in English, Arabic, and French.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to={isLoggedIn ? "/dashboard" : "/register"} 
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-xl shadow-xl shadow-blue-500/20 hover:shadow-emerald-500/10 hover:from-blue-500 hover:to-emerald-400 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.03]"
          >
            Start Free Trial <ArrowRight size={20} />
          </Link>
          <a 
            href="#features" 
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/60 border border-slate-800 hover:bg-slate-900 hover:border-slate-700 text-gray-200 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center"
          >
            Explore Features
          </a>
        </div>

        {/* Hero Interactive Mockup */}
        <div className="relative max-w-5xl mx-auto pt-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-emerald-500/30 opacity-70 blur-xl -z-10" />
          <div className="border border-slate-800 rounded-2xl overflow-hidden shadow-2xl bg-slate-900/40 backdrop-blur-md">
            <img 
              src={heroImg} 
              alt="Wasla AI Dashboard preview" 
              className="w-full h-auto object-cover opacity-90 transition-transform duration-700 hover:scale-[1.01]" 
            />
          </div>
        </div>
      </section>

      {/* Omnichannel Suite Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900 relative">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Active Omnichannel Integrations</h2>
          <p className="text-slate-400 text-lg">Talk to your customers wherever they are, all automated with advanced generative AI.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* WhatsApp */}
          <div className="group border border-slate-900 hover:border-slate-800 p-8 rounded-2xl bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp Business Sync</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Link WhatsApp Sandbox or official Twilio routes. Automatically confirm orders, catalog inquiries, and customer updates instantly.
            </p>
          </div>

          {/* Social DMs */}
          <div className="group border border-slate-900 hover:border-slate-800 p-8 rounded-2xl bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instagram & Messenger</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Consolidate Facebook Page comments, DMs, and Instagram storefront threads. Let GenAI sync responses seamlessly.
            </p>
          </div>

          {/* SMS Carrier Gateways */}
          <div className="group border border-slate-900 hover:border-slate-800 p-8 rounded-2xl bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
              <Send size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global SMS Support</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Integrate Twilio SMS carrier keys to reach customers through reliable text-message updates and tracking links.
            </p>
          </div>

          {/* Inbound Email */}
          <div className="group border border-slate-900 hover:border-slate-800 p-8 rounded-2xl bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">SendGrid SMTP Tickets</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connect SendGrid inbound parser to capture support tickets. Automatically drafts custom HTML replies with RAG context.
            </p>
          </div>

          {/* Web Live Chat */}
          <div className="group border border-slate-900 hover:border-slate-800 p-8 rounded-2xl bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
              <Bot size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Floating Web Chat Widget</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Embed a modular, fast script widget on any external Shopify or custom store to engage website visitors instantly.
            </p>
          </div>

          {/* Voice Calls IVR */}
          <div className="group border border-slate-900 hover:border-slate-800 p-8 rounded-2xl bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
              <User size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Voice & IVR Assistant</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Answer phone queries using Twilio Voice gathers. Generates dynamic phone menus and performs hot-agent dial transfers.
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Features Block */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              Onboarding Wizard
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Launched in Minutes with <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Step-by-Step Onboarding</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-base font-light">
              We redesigned user onboarding completely. Integrate your store identity, toggle communication channels, upload custom RAG catalogs, and invite your entire customer service team in 5 simple, frictionless stages.
            </p>
            <ul className="space-y-3">
              {[
                "1-Click Shopify & WooCommerce Profile setup",
                "Instant credentials config validation",
                "Multiple teammates and access roles support",
                "Robust pgvector indexing status"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Check size={12} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-8 rounded-2xl border border-slate-900 bg-slate-900/30 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 blur-xl pointer-events-none" />
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Onboarding Progress</h4>
            <div className="space-y-4">
              {[
                { step: "Step 1", name: "Business Identity Setup", status: "complete", width: "w-full bg-emerald-500" },
                { step: "Step 2", name: "Integrate Channels", status: "complete", width: "w-full bg-emerald-500" },
                { step: "Step 3", name: "Train RAG AI Catalog", status: "in-progress", width: "w-1/2 bg-blue-500 animate-pulse" },
                { step: "Step 4", name: "Invite Support Agents", status: "pending", width: "w-0 bg-slate-700" }
              ].map((s, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{s.step}</span>
                    <h5 className="text-sm font-semibold text-white mt-0.5">{s.name}</h5>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                    s.status === "complete" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    s.status === "in-progress" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-slate-800 text-slate-400"
                  }`}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900 relative">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Worldwide Transparent Pricing</h2>
          <p className="text-slate-400 text-lg">Pick the global plan that matches your support scale perfectly.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plan 1 */}
          <div className="border border-slate-900 p-8 rounded-2xl bg-slate-900/10 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Free Trial</h4>
                <p className="text-3xl font-bold mt-2">$0<span className="text-sm text-slate-500 font-normal"> /mo</span></p>
              </div>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500"/> 100 Messages / month</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500"/> Basic RAG Knowledge</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500"/> WhatsApp Sandbox Sync</li>
              </ul>
            </div>
            <Link to="/register" className="mt-8 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-center font-medium transition-colors">
              Get Started
            </Link>
          </div>

          {/* Plan 2 - Featured */}
          <div className="relative border-2 border-blue-500/50 p-8 rounded-2xl bg-slate-900/30 flex flex-col justify-between shadow-xl shadow-blue-500/5">
            <div className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-blue-600 to-emerald-500 text-xs font-bold rounded-full uppercase">
              Most Popular
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Growth Pro</h4>
                <p className="text-3xl font-bold mt-2">$49<span className="text-sm text-slate-500 font-normal"> /mo</span></p>
              </div>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-blue-500"/> Unlimited Conversations</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-blue-500"/> All 6 Omnichannel Channels</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-blue-500"/> Custom Vector Embeddings</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-blue-500"/> Multi-language RAG (EN, FR, AR)</li>
              </ul>
            </div>
            <Link to="/register" className="mt-8 w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white rounded-lg text-center font-medium shadow-md shadow-blue-500/10 transition-colors">
              Start 14-Day Trial
            </Link>
          </div>

          {/* Plan 3 */}
          <div className="border border-slate-900 p-8 rounded-2xl bg-slate-900/10 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Enterprise</h4>
                <p className="text-3xl font-bold mt-2">Custom</p>
              </div>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500"/> Dedicated Cloud Server</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500"/> Dedicated SLA voice pathways</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500"/> 24/7 Phone SLA Support</li>
              </ul>
            </div>
            <a href="mailto:sales@wasla.ai" className="mt-8 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-center font-medium transition-colors">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Future Roadmap Horizon */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900 relative bg-slate-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-blue-500/5 to-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Future Horizon
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Product Evolution</h2>
          <p className="text-slate-400 text-lg">Continuous innovation to deliver the absolute best e-commerce support suite.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Item 1 */}
          <div className="p-6 rounded-2xl border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
              <Zap size={20} />
            </div>
            <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">Enterprise CRM Syncs</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Native custom integrations with **HubSpot and Salesforce** to enrich records for mid-market and larger clients.
            </p>
          </div>

          {/* Item 2 */}
          <div className="p-6 rounded-2xl border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
              <Shield size={20} />
            </div>
            <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors">Robust GDPR compliance</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Advanced worldwide data privacy compliance features and automated PI scrubbing rules.
            </p>
          </div>

          {/* Item 3 */}
          <div className="p-6 rounded-2xl border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
              <Check size={20} />
            </div>
            <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors">Pay-As-You-Go pricing</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Flexible and highly affordable **pay-as-you-go** structures optimized for lean, early-stage startups.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6 text-center text-slate-500 text-sm max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>&copy; {new Date().getFullYear()} Wasla AI. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};
