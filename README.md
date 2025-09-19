# Agent2-Echo-Preview

A modern web application for evaluating customer call transcripts against the CDIM framework. Upload JSON files containing structured CDIM evaluations and visualize the results through interactive scorecards and comprehensive analysis.

> CDIM = Coverage • Depth • Impact Linkage • Quantification

## ✨ Features
- 📊 **Interactive Scorecards** – Visual scoring across CDIM dimensions
- 📝 **Executive Summaries** – Structured analysis and recommendations
- 🎯 **Impact Statements** – Clear articulation of business impact
- 📁 **File Upload** – Easy JSON data import
- 🎨 **Modern UI** – Clean, responsive design with dark/light themes
- ⚡ **Real-time Analysis** – Instant feedback and scoring

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm

### Installation & Setup
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Visit [http://localhost:5000](http://localhost:5000)

That's it! The app will be running with hot-reload enabled.

## 🔧 Usage
1. **Upload your data**: Click the upload area and select a JSON file with CDIM evaluation data
2. **View results**: The app automatically processes and displays:
   - Interactive scorecards with visual metrics
   - Executive summary with key insights
   - Impact statements and recommendations
3. **Switch themes**: Use the theme toggle for dark/light mode

## � Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **UI**: Tailwind CSS + Radix UI components
- **Charts**: Recharts for data visualization
- **Database**: Drizzle ORM (PostgreSQL ready)

## �️ Development

### Scripts
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Run production server
npm run check   # Type checking
```

### Windows PowerShell Notes
If you get a `NODE_ENV=development` error, use:
```powershell
$env:NODE_ENV = "development"
npm run dev
```

## 🐛 Troubleshooting
- **Styles not loading**: Restart the dev server
- **Port 5000 in use**: Change PORT in environment or stop other services
- **Build errors**: Run `npm run check` to see TypeScript issues

---

## 📄 License
MIT © 2025

---
