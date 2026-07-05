# 🍔 SmartBite AI – AI-Powered Food Ordering Web Application

SmartBite AI is a modern food ordering web application developed as part of an AI Workshop challenge. The project combines a clean and responsive user interface with AI-powered food recommendations to enhance the user experience. Inspired by platforms like Swiggy and Zomato, it demonstrates how AI can be integrated into a food delivery application.

> **Note:** This is a frontend prototype created for demonstration purposes. No backend or database is integrated.

---

## 📌 Project Overview

The application allows users to browse restaurants, explore offers, interact with an AI assistant, and access additional utility pages such as a calorie dashboard and Excel report—all through a modern and responsive interface.

---

# ✨ Features

### 🤖 AI Chat Assistant
- Interactive chatbot for food recommendations
- Suggests meals based on user queries
- Recommends side dishes and desserts
- Simple conversational interface

### 🍽 Restaurant Listing
- Browse available restaurants
- Restaurant cards with details
- Responsive layout

### 🎯 Advanced Recommendations
- Personalized food recommendation interface
- Suggests popular meals and combos
- Designed according to the workshop challenge requirements

### 🎁 Offers Section
- Browse available food offers
- Integrated navigation and UI

### 📊 Monthly Calorie Dashboard
- Dedicated dashboard page
- Displays calorie-related information
- Clean dashboard interface

### 📄 Excel Calorie Report
- Separate report page
- UI for calorie report generation

### 🌙 Dark & ☀️ Light Mode
- Theme toggle available
- Smooth switching between dark and light modes
- Consistent design across all pages

### 📱 Responsive Design
- Desktop friendly
- Tablet compatible
- Mobile responsive

---

# 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | Lucide React |
| Theme | next-themes |
| Package Manager | npm / pnpm |
| Version Control | Git & GitHub |

---

# 🏗 Project Architecture

```
                     User
                       │
                       ▼
          SmartBite AI Frontend (Next.js)
                       │
      ┌───────────────┼────────────────┐
      │               │                │
      ▼               ▼                ▼
 Restaurants      AI Assistant      Utility Pages
  & Offers      Recommendations   (Calories, Report)
      │               │                │
      └───────────────┼────────────────┘
                      ▼
             Responsive User Interface
```

---

# 📂 Project Structure

```
smart-bite-ai-food-app
│
├── app/
│   ├── restaurants/
│   ├── offers/
│   ├── ai-assistant/
│   ├── calorie-dashboard/
│   ├── excel-report/
│   └── ...
│
├── components/
├── context/
├── lib/
├── public/
│
├── package.json
├── next.config.mjs
├── tsconfig.json
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/Palak-999/smart-bite-ai-food-app.git
```

```bash
cd smart-bite-ai-food-app
```

---

## 2. Install Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

---

## 3. Run Development Server

```bash
npm run dev
```

or

```bash
pnpm dev
```

Open:

```
http://localhost:3000
```

---

# 📸 Screenshots

## Home Interface
*(Add homepage screenshot here)*

---

## AI Assistant

- Interactive chat experience
- Food recommendation responses
- Meal suggestions

---

## Dark & Light Theme

Supports both dark and light modes for improved user experience.

---

# 🎯 Workshop Challenge Features

The following challenge requirements were implemented:

- ✅ AI Chat Assistant
- ✅ Advanced Recommendations
- ✅ Monthly Calorie Dashboard
- ✅ Excel Calorie Report

### Additional Integrated Features

- ✅ Restaurants Page
- ✅ Offers Page
- ✅ Responsive Navigation
- ✅ Dark / Light Theme
- ✅ Responsive Design
- ✅ Modern UI using Tailwind CSS
- ✅ Interactive User Experience

---

# 🚧 Current Limitations

- No backend integration
- No authentication
- No payment gateway
- No real restaurant API
- No database connectivity
- AI responses are frontend demonstration-based

---

# 🔮 Future Enhancements

- Firebase Authentication
- User Profiles
- Real Food Ordering
- Payment Integration
- Order Tracking
- Backend APIs
- Database Integration
- Personalized AI Recommendations using user history

---

# 👩‍💻 Author

**Palak Choudhary**

GitHub: https://github.com/Palak-999

---

# 📄 License

This project is developed for educational purposes as part of an AI Workshop Challenge.

---

## ⭐ If you like this project, consider giving it a Star!
