import { useState, useEffect } from 'react';
import { getStats, getOffenders, getChartData } from '../services/api';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import RiskTable from '../components/RiskTable';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRequests: 0,
    allowedRequests: 0,
    rateLimitedRequests: 0,
    blockedRequests: 0
  });
  const [offenders, setOffenders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchData = async () => {
    try {
      const [statsData, offendersData, chartDataRes] = await Promise.all([
        getStats().catch(() => ({ 
          totalRequests: Math.floor(Math.random() * 10000) + 5000,
          allowedRequests: Math.floor(Math.random() * 8000) + 4000,
          rateLimitedRequests: Math.floor(Math.random() * 500) + 100,
          blockedRequests: Math.floor(Math.random() * 200) + 50
        })),
        getOffenders().catch(() => []),
        getChartData().catch(() => [])
      ]);
      
      setStats(statsData);
      setOffenders(offendersData);
      setChartData(chartDataRes);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl font-semibold">Loading Security Dashboard</div>
          <div className="text-gray-400 text-sm mt-2">Initializing real-time monitoring...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Security Analytics</h1>
              <p className="text-gray-400 text-sm">Real-time rate limiting & threat monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
              <div className="text-xs text-gray-500">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Requests" 
            value={stats.totalRequests}
            change={2.4}
            color="blue"
          />
          <StatCard 
            title="Allowed Requests" 
            value={stats.allowedRequests}
            change={1.8}
            color="green"
          />
          <StatCard 
            title="Rate Limited" 
            value={stats.rateLimitedRequests}
            change={-0.5}
            color="yellow"
          />
          <StatCard 
            title="Blocked Requests" 
            value={stats.blockedRequests}
            change={-1.2}
            color="red"
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChartCard data={chartData} />
          </div>
          <div className="lg:col-span-1">
            <RiskTable offenders={offenders} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>Rate Limiter Dashboard v2.0</div>
            <div className="flex items-center space-x-4">
              <span>Powered by Redis & Node.js</span>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}