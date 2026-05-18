import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff, User, Sparkles } from "lucide-react";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("wasla_token", "mock-token");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-2xl">W</span>
          </div>
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Wasla AI
          </span>
        </Link>
        <p className="text-slate-400 text-sm mt-1 font-light">Smarter customer support for E-Commerce</p>
      </div>

      {/* Card Form */}
      <div className="w-full max-w-md border border-slate-900 bg-slate-900/20 backdrop-blur-md p-8 rounded-2xl shadow-xl shadow-slate-950 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
          <p className="text-slate-400 text-sm">Start your 14-day free trial, no card required</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mehdi Alaoui" 
                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@wasla.ai" 
                className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-10 pr-10 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
          >
            {loading ? "Creating Account..." : "Sign Up"} <ArrowRight size={18} />
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-900"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase tracking-widest">or</span>
          <div className="flex-grow border-t border-slate-900"></div>
        </div>

        <p className="text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
