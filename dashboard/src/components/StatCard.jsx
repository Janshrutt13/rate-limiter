export default function StatCard({ title, value, change, color = "purple", icon }) {
  const colorClasses = {
    purple: "from-purple-600 to-purple-700",
    green: "from-green-600 to-green-700", 
    red: "from-red-600 to-red-700",
    blue: "from-blue-600 to-blue-700",
    yellow: "from-yellow-600 to-yellow-700"
  };

  const iconClasses = {
    purple: "bg-purple-500",
    green: "bg-green-500", 
    red: "bg-red-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500"
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-white text-3xl font-bold tracking-tight">
              {value?.toLocaleString() || 0}
            </p>
            {change !== undefined && (
              <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                change >= 0 
                  ? 'text-green-400 bg-green-400/10' 
                  : 'text-red-400 bg-red-400/10'
              }`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
            )}
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg ${iconClasses[color]} bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <div className={`w-6 h-6 rounded ${iconClasses[color]} opacity-80`}></div>
        </div>
      </div>
      <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
    </div>
  );
}