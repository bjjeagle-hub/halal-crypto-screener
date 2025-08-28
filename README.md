# Halal Crypto Screener 🕌💰

A comprehensive Islamic finance-compliant cryptocurrency screening platform for [Swiss Islamic Finance](https://swissislamicfinance.com).

## 🎯 Purpose

Screen cryptocurrencies and tokens based on Shariah compliance criteria, providing users with:
- ✅ **Halal/Haram determination**
- 📊 **Comprehensive ratings and explanations**
- 🔒 **Freemium model** (3 free screenings, then paid)
- 🌐 **Direct website integration**

## 🏗️ Architecture

### Frontend (React)
- Modern, responsive UI
- Real-time screening results
- User authentication & payment integration
- Shariah-compliant design principles

### Backend (Express.js)
- RESTful API
- MongoDB database
- CoinGecko API integration
- Stripe payment processing
- JWT authentication

## 📋 Screening Framework

### 1. Nature & Purpose of Project
- ❌ **Prohibited**: Riba, gambling, alcohol, adult content
- ✅ **Preferred**: Real-world utility, Islamic values

### 2. Token Structure & Mechanics
- ❌ **Avoid**: Fixed APY, excessive speculation
- ✅ **Required**: Clear tokenomics, transparency

### 3. Financial Ratios (AAOIFI Standards)
- **Debt screening**: <33% of assets
- **Cash deposits**: <33% of assets  
- **Non-compliant income**: <5% of revenue

### 4. Governance & Transparency
- ✅ Shariah board presence
- ✅ Clear documentation
- ✅ Decentralized governance

## 🔍 Rating System

| Rating | Status | Description |
|--------|---------|-------------|
| ✅ | **Halal** | Meets all Shariah criteria |
| ⚠️ | **Questionable** | Some concerns, needs review |
| ❌ | **Non-Halal** | Clear violations |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Stripe Account
- CoinGecko API Key

### Installation

```bash
# Clone the repository
git clone https://github.com/bjjeagle-hub/halal-crypto-screener.git
cd halal-crypto-screener

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development servers
npm run dev
```

## 📁 Project Structure

```
halal-crypto-screener/
├── frontend/          # React application
├── backend/           # Express.js API
├── shared/           # Shared utilities & types
├── docs/             # Documentation
└── scripts/          # Build & deployment scripts
```

## 🔧 Environment Variables

```env
# Backend
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
COINGECKO_API_KEY=your_coingecko_api_key

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Swiss Islamic Finance community
- AAOIFI Shariah standards
- Islamic finance scholars and advisors

---

**Built with ❤️ for the Muslim crypto community**