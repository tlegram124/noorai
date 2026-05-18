import { useTranslation } from "react-i18next";
import { Search, Filter, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../services/api";

export const Orders = () => {
  const { t } = useTranslation();

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) return <div className="p-6 text-gray-500">Loading orders...</div>;
  if (error || !orders) return <div className="p-6 text-red-500">Failed to load orders from database.</div>;


  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white">{t('orders')}</h1>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow transition-colors">
          {t('create_order')}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="p-4 border-b dark:border-gray-700 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder={t('search_order')} 
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter size={18} /> {t('filter')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b dark:border-gray-700">
              <tr>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">{t('order_id')}</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">{t('cust_phone')}</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">{t('items')}</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">{t('total_amount')}</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">{t('status')}</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400">{t('date')}</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {orders.map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-medium text-blue-600 dark:text-blue-400">{order.id}</td>
                  <td className="p-4 dark:text-gray-300">{order.customer}</td>
                  <td className="p-4 dark:text-gray-300">{order.items} items</td>
                  <td className="p-4 font-medium dark:text-gray-200">{order.amount}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">{order.date}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
