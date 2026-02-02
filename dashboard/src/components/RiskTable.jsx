export default function RiskTable({ offenders = [] }) {
  const mockOffenders = [
    { ip: '192.168.1.100', risk: 85, blocked: true, requests: 1247, location: 'US' },
    { ip: '10.0.0.45', risk: 72, blocked: false, requests: 892, location: 'CN' },
    { ip: '172.16.0.23', risk: 58, blocked: false, requests: 634, location: 'RU' },
    { ip: '203.0.113.15', risk: 41, blocked: false, requests: 423, location: 'DE' },
    { ip: '198.51.100.8', risk: 33, blocked: false, requests: 287, location: 'BR' }
  ];

  const displayData = offenders.length > 0 ? offenders : mockOffenders;

  const getRiskColor = (risk) => {
    if (risk >= 70) return 'text-red-400 bg-red-400/10';
    if (risk >= 40) return 'text-yellow-400 bg-yellow-400/10';
    return 'text-green-400 bg-green-400/10';
  };

  const getRiskBadgeColor = (risk) => {
    if (risk >= 70) return 'bg-red-500';
    if (risk >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-xl font-semibold">Security Threats</h3>
          <p className="text-gray-400 text-sm mt-1">Top risk IP addresses</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-gray-400 text-xs">High Risk</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {displayData.slice(0, 5).map((offender, index) => (
          <div key={offender.ip} className="group relative overflow-hidden bg-gray-800/50 rounded-lg p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <div className={`absolute -top-1 -right-1 w-4 h-4 ${getRiskBadgeColor(offender.risk)} rounded-full border-2 border-gray-800`}></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <p className="text-white font-semibold text-base">{offender.ip}</p>
                    <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
                      {offender.location || 'Unknown'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-400">Risk Score:</span>
                    <span className={`font-semibold px-2 py-1 rounded-full text-xs ${getRiskColor(offender.risk)}`}>
                      {offender.risk}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{offender.requests || 0} requests</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  offender.blocked ? 'bg-red-500' : 'bg-green-500'
                } shadow-lg`}></div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  offender.blocked 
                    ? 'bg-red-900/30 text-red-300 border-red-700/50' 
                    : 'bg-green-900/30 text-green-300 border-green-700/50'
                }`}>
                  {offender.blocked ? 'Blocked' : 'Monitoring'}
                </span>
              </div>
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
      
      {displayData.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-gray-400">No security threats detected</p>
          <p className="text-gray-500 text-sm mt-1">Your system is secure</p>
        </div>
      )}
    </div>
  );
}