export const AnalyticsCard = ({ title, value, change }: { title: string; value: string; change: string }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-gray-400 dark:text-gray-500">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <div>
        <div className="text-2xl font-bold dark:text-white">{value}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{change}</p>
      </div>
    </div>
  );
};
