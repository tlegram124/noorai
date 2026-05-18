import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Conversations } from "./pages/Conversations";
import { Orders } from "./pages/Orders";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Settings as SettingsPage } from "./pages/Settings";
import { Onboarding } from "./pages/Onboarding";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./contexts/LanguageContext";
import { LayoutDashboard, MessageSquare, ShoppingCart, Settings, LogOut } from "lucide-react";

const SidebarLink = ({ to, icon: Icon, children }: { to: string, icon: any, children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
        isActive 
          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium" 
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
      }`}
    >
      <Icon size={20} />
      {children}
    </Link>
  );
};

const DashboardLayout = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("wasla_token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white dark:bg-gray-900 border-r dark:border-gray-800 flex flex-col shadow-sm z-10 relative">
        <div className="p-6 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Wasla AI
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarLink to="/dashboard" icon={LayoutDashboard}>{t('dashboard')}</SidebarLink>
          <SidebarLink to="/dashboard/conversations" icon={MessageSquare}>{t('conversations')}</SidebarLink>
          <SidebarLink to="/dashboard/orders" icon={ShoppingCart}>{t('orders')}</SidebarLink>
          <SidebarLink to="/dashboard/settings" icon={Settings}>{t('settings')}</SidebarLink>
        </nav>

        <div className="p-6 border-t dark:border-gray-800 mt-auto space-y-4">
           <div 
             onClick={handleLogout}
             className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
           >
             <LogOut size={20} />
             <span>Sign Out</span>
           </div>
           <select 
             value={language} 
             onChange={(e) => setLanguage(e.target.value as any)}
             className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
           >
             <option value="en">🇺🇸 English</option>
             <option value="ar">🇲🇦 العربية</option>
             <option value="fr">🇫🇷 Français</option>
           </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Main Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
