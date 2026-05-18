import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Sparkles, Languages, Database, Check, Zap } from "lucide-react";
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
          <Sparkles size={14} /> Next-Gen Customer Support AI
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
          Automate E-Commerce WhatsApp Chats with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">GenAI</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Instantly handle orders, answer complex catalog inquiries, and resolve support requests dynamically in English, French, and Arabic.
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

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900 relative">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Powerful Capabilities for E-Commerce</h2>
          <p className="text-slate-400 text-lg">Everything you need to automate conversations and orders natively.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group border border-slate-900 hover:border-slate-800 p-8 rounded-2xl bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-semibold">Active WhatsApp Sync</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connect your business account dynamically. Let GenAI reply instantly, or intervene manually with zero friction.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group border border-slate-900 hover:border-slate-800 p-8 rounded-2xl bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Languages size={24} />
              </div>
              <h3 className="text-xl font-semibold">Native i18n Multilingual</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Adapts seamlessly to Arabic (RTL), French, and English based on instant user language detection.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group border border-slate-900 hover:border-slate-800 p-8 rounded-2xl bg-slate-900/20 hover:bg-slate-900/40 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-semibold">pgvector RAG Search</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Import catalogs and guides directly. Queries retrieve exact vector embeddings utilizing robust distance metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900 relative">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Flexible, Transparent Pricing</h2>
          <p className="text-slate-400 text-lg">Pick the plan that matches your business scaling needs.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plan 1 */}
          <div className="border border-slate-900 p-8 rounded-2xl bg-slate-900/10 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Free</h4>
                <p className="text-3xl font-bold mt-2">MAD 0<span className="text-sm text-slate-500 font-normal"> /mo</span></p>
              </div>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500"/> 100 Messages / month</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500"/> Basic RAG Knowledge</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500"/> English Support only</li>
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
                <h4 className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Pro Business</h4>
                <p className="text-3xl font-bold mt-2">MAD 490<span className="text-sm text-slate-500 font-normal"> /mo</span></p>
              </div>
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-blue-500"/> Unlimited Messages</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-blue-500"/> Advanced Multilingual i18n</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-blue-500"/> Custom Vector Embeddings</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-blue-500"/> Real-time Order Actions</li>
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
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500"/> Custom Fine-Tuned Models</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500"/> 24/7 Phone SLA Support</li>
              </ul>
            </div>
            <a href="mailto:sales@wasla.ai" className="mt-8 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-center font-medium transition-colors">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Innovation Roadmap Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-900 relative bg-slate-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-blue-500/5 to-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Future Horizon
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How Wasla AI Can Improve</h2>
          <p className="text-slate-400 text-lg">Continuous innovation to deliver the absolute best e-commerce support suite.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Item 1 */}
          <div className="p-6 rounded-2xl border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">Omnichannel Outreach</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Add seamless **email and SMS** sync alongside WhatsApp to manage all customer queries in one inbox.
            </p>
          </div>

          {/* Item 2 */}
          <div className="p-6 rounded-2xl border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
              <Zap size={20} />
            </div>
            <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors">Enterprise Syncs</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Native custom integrations with **HubSpot and Salesforce** to enrich records for mid-market and larger clients.
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

          {/* Item 4 */}
          <div className="p-6 rounded-2xl border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
              <Database size={20} />
            </div>
            <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">Deep Platform Integrations</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Deep native sync with **Shopify and WooCommerce** to automate checkouts, cart recovery, and stock updates.
            </p>
          </div>

          {/* Item 5 */}
          <div className="p-6 rounded-2xl border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
              <Languages size={20} />
            </div>
            <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors">Official WhatsApp Partner</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Official **WhatsApp Business API partner** certification to guarantee the lowest messaging latency and verified green checkmarks.
            </p>
          </div>

          {/* Item 6 */}
          <div className="p-6 rounded-2xl border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors">Drag-and-Drop Workflows</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Visual **drag-and-drop AI workflows** allowing non-technical managers to edit prompt guidelines instantly.
            </p>
          </div>

          {/* Item 7 */}
          <div className="p-6 rounded-2xl border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
              <Zap size={20} />
            </div>
            <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors">Unified Support + Marketing</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Combine **support and retention marketing** inside a single platform to run broadcast newsletters alongside queries.
            </p>
          </div>

          {/* Item 8 */}
          <div className="p-6 rounded-2xl border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">1-Click API Onboarding</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              A frictionless **1-click WhatsApp Business API onboarding** to link accounts in seconds without leaving Wasla.
            </p>
          </div>

          {/* Item 9 */}
          <div className="p-6 rounded-2xl border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors">AI + Human Hybrid Synergy</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Intelligent **AI + human hybrid support** handoff that auto-notifies agents only when escalations are detected.
            </p>
          </div>

          {/* Item 10 (Centered Spanning) */}
          <div className="p-6 rounded-2xl border border-slate-900 hover:border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 transition-all duration-300 md:col-span-2 lg:col-span-3 group">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-emerald-500 text-white flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform duration-200">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 transition-colors">AI-Powered No-Code Bot Builder</h3>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                  Design complex interaction flows dynamically. Prompt our **AI-powered no-code builder** in natural language, and let the system automatically compile and register the state machines for you.
                </p>
              </div>
            </div>
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
