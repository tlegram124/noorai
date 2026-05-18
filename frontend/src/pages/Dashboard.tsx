import { AnalyticsCard } from "../components/AnalyticsCard";
import { useTranslation } from "react-i18next";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { fetchAnalytics } from "../services/api";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

export const Dashboard = () => {
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
    refetchInterval: 5000, // Real-time poll every 5s
  });

  const chartData = [
    { name: 'Mon', messages: 120, ai_handled: 100 },
    { name: 'Tue', messages: 200, ai_handled: 170 },
    { name: 'Wed', messages: 150, ai_handled: 140 },
    { name: 'Thu', messages: 280, ai_handled: 250 },
    { name: 'Fri', messages: 190, ai_handled: 160 },
    { name: 'Sat', messages: 90, ai_handled: 80 },
    { name: 'Sun', messages: 210, ai_handled: 180 },
  ];

  if (isLoading) return <div className="p-6 text-gray-500 dark:text-gray-400">Loading metrics...</div>;
  if (error) return <div className="p-6 text-red-500">Failed to load live metrics. Ensure FastAPI backend is running on port 8000.</div>;


  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">
          {t('dashboard')}
        </h1>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
          Download Report
        </button>
      </div>

      {/* Dynamic Onboarding Action Banner */}
      <div className="bg-gradient-to-r from-blue-600/10 to-emerald-500/10 border border-blue-500/20 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-600 flex-shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900 dark:text-white">Complete your onboarding setup</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">Connect your WhatsApp sandbox, Facebook Page, and upload business catalog details to activate automated agent replies.</p>
          </div>
        </div>
        <Link 
          to="/onboarding"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-sm font-semibold hover:opacity-95 shadow-md shadow-blue-500/10 flex items-center gap-1.5 self-start md:self-auto flex-shrink-0"
        >
          Complete Setup <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title={t('messages_7_days')}
          value={data.message_volume.toString()}
          change="+12% from last week"
        />
        <AnalyticsCard
          title={t('ai_resolution_rate')}
          value={`${data.ai_resolution_rate.toFixed(1)}%`}
          change="+5% from last week"
        />
        <AnalyticsCard
          title={t('confirmed_orders')}
          value={data.confirmed_orders.toString()}
          change="+8% from last week"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mt-8">
        <h2 className="text-xl font-semibold mb-6 dark:text-white">Message Activity</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="messages" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="ai_handled" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
