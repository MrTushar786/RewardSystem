# HRM Reward System with AI Dashboard

A modern, full-stack Human Resource Management (HRM) Reward System. It uses AI-based logic to determine employee rewards based on performance and attendance metrics, visualizing the data through an interactive dashboard.

## 🚀 Features
- **AI Reward Logic**: Automatically calculates reward points and badges (Gold, Silver, Bronze) based on employee metrics.
- **Interactive Dashboard**: Real-time overview of personal performance, experience, and points.
- **Leaderboard**: Compete with colleagues and see who leads in the reward points.
- **Analytics**: Visual representation of company-wide attendance vs. performance and reward distribution using Recharts.
- **Modern UI**: Built with React, Tailwind CSS, and Lucide icons for a premium experience.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Recharts, Lucide React, Axios.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Authentication**: Simple name-based login (expandable).

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/abhijeetkumar07/reward-system.git
cd reward-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/rewardDB
```
Seed the database:
```bash
npm run seed
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## 🧠 AI Logic Breakdown
- **Gold Badge**: Attendance > 90% and Performance > 85% (100 pts)
- **Silver Badge**: Attendance > 75% (50 pts)
- **Bronze Badge**: Default (20 pts)

## 📄 License
MIT
