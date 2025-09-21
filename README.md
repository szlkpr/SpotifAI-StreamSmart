# 🎵 SpotifAI - StreamSmart

**AI-Powered Music Intelligence Platform** - Where Spotify meets ChatGPT to deepen your connection with music.

## 🌟 [**🚀 LIVE DEMO**](https://main.dybbc6z573e0o.amplifyapp.com) 🌟

> **Experience the future of music intelligence!** Click above to try the live application deployed on AWS Amplify.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![AWS Amplify](https://img.shields.io/badge/Deployed%20on-AWS%20Amplify-orange)](https://main.dybbc6z573e0o.amplifyapp.com)
[![AI Powered](https://img.shields.io/badge/AI%20Powered-Google%20Gemini-blue)](https://ai.google.dev/)

## ✨ Features

### 🤖 AI-Powered Intelligence
- **Smart Mood Detection** - AI analyzes song titles to determine emotional vibes
- **Intelligent Song Explanations** - Get insights about themes, stories, and emotions
- **Conversational Music Search** - Natural language music discovery
- **Smart Recommendations** - AI-curated playlists based on your preferences
- **Cross-Playlist Intelligence** - Search and discover across all your music

### 🎧 Modern Music Experience
- **Spotify-Inspired UI** - Clean, modern interface you already love
- **Advanced Audio Controls** - Professional-grade playback features
- **One-Click AI Playback** - Instantly play AI recommendations
- **Real-time Audio Analysis** - Live feedback and controls

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone and setup**
   ```bash
   git clone https://github.com/szlkpr/SpotifAI-StreamSmart.git
   cd SpotifAI-StreamSmart
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your Gemini API key
   ```

3. **Start development server**
   ```bash
   npm run serve
   # Opens at http://localhost:3000
   ```

## 🌐 Deployment Options

### 🏃‍♂️ Quick Deploy (Free)
- **Netlify/Vercel**: Push to GitHub, connect repository, deploy instantly
- **GitHub Pages**: Enable in repository settings

### ☁️ Professional Deploy (AWS)
- **AWS Amplify**: Full CI/CD with backend support
- **AWS S3 + CloudFront**: Global CDN distribution

See detailed guides in [`docs/`](docs/) directory.

## 🛠️ Development

```bash
# Development server with hot reload
npm run serve

# Backend server (if using Node.js backend)
npm start
npm run dev  # With auto-reload

# Build for production
npm run build
```

## 📁 Project Structure

```
spotifai-streamsmart/
├── src/                    # Source code
│   ├── index.html         # Main application
│   ├── scripts/           # JavaScript modules
│   └── styles/            # CSS stylesheets
├── assets/                # Static assets
│   ├── images/           # SVG icons and images
│   └── music/            # Audio files and playlists
├── config/               # Server and API configuration
├── docs/                 # Documentation and guides
├── archive/              # Development artifacts
└── package.json          # Project configuration
```

## 🔧 Configuration

### Environment Variables
```bash
GEMINI_API_KEY=your_api_key_here    # Required for AI features
AWS_REGION=us-east-1                # Optional: AWS deployment
NODE_ENV=development                # Environment mode
PORT=3000                          # Development server port
```

### API Keys Setup
1. **Google Gemini API**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create new API key
   - Add to `.env` file

2. **AWS (Optional)**
   - Configure for Amplify deployment
   - See AWS deployment guides in `docs/`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Spotify's clean, user-friendly design
- Powered by Google's Gemini AI for intelligent music analysis
- Built with modern web technologies and best practices

---

**🎶 Ready to revolutionize your music experience? Let SpotifAI - StreamSmart be your personal music analyst!**
