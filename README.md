# 🛡️ Advanced Rate Limiter with Security Analytics Dashboard

A production-grade rate limiting system with real-time security analytics, built with Node.js, Express, Redis, and React. Features adaptive risk scoring, sliding window algorithm, and a professional dashboard for monitoring threats.

![Dashboard Preview](https://via.placeholder.com/800x400/1F2937/8B5CF6?text=Security+Analytics+Dashboard)

## ✨ Features

### 🔒 Rate Limiting Engine
- **Sliding Window Algorithm** - Precise request tracking with configurable time windows
- **Adaptive Risk Scoring** - Dynamic IP reputation system with automatic blocking
- **Multi-tier Protection** - Minute and hourly rate limits with escalating responses
- **Redis-powered** - High-performance caching with automatic cleanup

### 📊 Security Analytics Dashboard
- **Real-time Monitoring** - Live request metrics and threat detection
- **Interactive Charts** - Request volume visualization with Recharts
- **Threat Intelligence** - Top risky IPs with location and activity data
- **Professional UI** - Dark theme with purple accents, responsive design

### 🚀 Production Ready
- **CORS Support** - Cross-origin resource sharing configured
- **Environment Variables** - Configurable rate limits and block times
- **Error Handling** - Graceful fallbacks and mock data support
- **ES6 Modules** - Modern JavaScript with proper imports

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │───▶│  Express API    │───▶│   Redis Cache   │
│   Dashboard     │    │  Rate Limiter   │    │  Risk Scores    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Redis Server (or Docker)
- npm/yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/rate-limiter.git
cd rate-limiter
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
```

3. **Setup Frontend**
```bash
cd ../dashboard
npm install
```

4. **Start Redis** (Choose one option)
```bash
# Option 1: Docker
docker run -d -p 6379:6379 redis:alpine

# Option 2: Local Redis
redis-server

# Option 3: Use built-in mock Redis (for development)
# No setup required - automatically falls back
```

5. **Run the Application**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd dashboard
npm run dev
```

6. **Access the Dashboard**
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

## ⚙️ Configuration

### Environment Variables (.env)
```env
PORT=4000
RATE_LIMIT_MINUTE=20    # Requests per minute
RATE_LIMIT_HOUR=500     # Requests per hour
BLOCK_1=60              # Low risk block time (seconds)
BLOCK_2=300             # Medium risk block time
BLOCK_3=1800            # High risk block time
```

### Rate Limiting Logic
- **Risk Score 0-10**: Warning only
- **Risk Score 11-40**: Block for BLOCK_1 seconds
- **Risk Score 41-70**: Block for BLOCK_2 seconds  
- **Risk Score 70+**: Block for BLOCK_3 seconds

## 📡 API Endpoints

### Public API
```http
GET /api/test          # Test endpoint (rate limited)
```

### Admin Analytics
```http
GET /admin/stats       # Request statistics
GET /admin/offenders   # Top 5 risky IPs
GET /admin/chart       # Last 20 minutes data
```

### Response Examples

**GET /admin/stats**
```json
{
  "totalRequests": 1247,
  "allowedRequests": 1089,
  "rateLimitedRequests": 134,
  "blockedRequests": 24
}
```

**GET /admin/offenders**
```json
[
  {
    "ip": "192.168.1.100",
    "risk": 85,
    "blocked": true
  }
]
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Redis** - Caching and rate limiting
- **CORS** - Cross-origin support

### Frontend
- **React 19** - UI framework
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Vite** - Build tool

## 📊 Dashboard Features

### Real-time Metrics
- Total requests processed
- Allowed vs blocked requests
- Rate limiting statistics
- Live status indicators

### Security Intelligence
- Top risky IP addresses
- Geographic threat distribution
- Request volume trends
- Automated threat scoring

### Professional UI
- Dark theme with purple accents
- Responsive grid layout
- Interactive charts and graphs
- Hover effects and animations

## 🔧 Development

### Project Structure
```
rate-limiter/
├── backend/
│   ├── src/
│   │   ├── config/         # Redis configuration
│   │   ├── middleware/     # Rate limiting logic
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Risk scoring
│   │   └── app.js         # Express app
│   └── package.json
├── dashboard/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Dashboard page
│   │   ├── services/      # API client
│   │   └── main.jsx       # React entry
│   └── package.json
└── README.md
```

### Adding New Features

1. **New Rate Limiting Rules**
   - Modify `middleware/rateLimiter.js`
   - Update environment variables

2. **Dashboard Components**
   - Add to `dashboard/src/components/`
   - Follow existing design patterns

3. **API Endpoints**
   - Add to `backend/src/routes/`
   - Update frontend API service

## 🚀 Deployment

### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

### Production Considerations
- Use Redis Cluster for high availability
- Implement proper logging (Winston)
- Add rate limiting bypass for admin IPs
- Configure reverse proxy (Nginx)
- Set up monitoring (Prometheus/Grafana)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Redis for high-performance caching
- Recharts for beautiful data visualization
- Tailwind CSS for rapid UI development
- React team for the amazing framework

---

**Built with ❤️ for production-grade security and performance**