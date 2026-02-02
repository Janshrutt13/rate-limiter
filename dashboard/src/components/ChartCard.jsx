import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

export default function ChartCard({ data = [] }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Generate realistic mock data
  const chartData = data.length > 0 ? data : Array.from({ length: 20 }, (_, i) => {
    const baseValue = 25;
    const variation = Math.sin(i * 0.5) * 15 + Math.random() * 10;
    return {
      timestamp: Date.now() - (19 - i) * 60000,
      count: Math.max(0, Math.floor(baseValue + variation))
    };
  });

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-xl font-semibold">Request Volume</h3>
          <p className="text-gray-400 text-sm mt-1">Last 20 minutes activity</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-gray-400 text-sm">Requests/min</span>
        </div>
      </div>
      
      <div style={{ width: '100%', height: '280px' }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatTime}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 11 }}
              width={30}
            />
            <Tooltip 
              labelFormatter={formatTime}
              formatter={(value) => [value, 'Requests']}
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8B5CF6"
              strokeWidth={2}
              fill="url(#colorGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#8B5CF6', strokeWidth: 2, stroke: '#1F2937' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}