# AI Meal Planner

A full-stack web application that generates personalized AI meal plans based on user fitness goals and activity levels.

**Live Demo:** https://72f68b31-ef30-4ec0-9478-e2d24b176648.e1-us-east-azure.choreoapps.dev

## Overview

AI Meal Planner helps users track nutrition and receive personalized meal recommendations through an AI-powered chat interface. The application analyzes user profiles (weight, activity level, fitness goals) to generate tailored meal plans with automated macro calculations.

## Features

- **User Authentication**: Secure JWT-based registration and login
- **Profile Management**: Track weight, height, activity level (sedentary/light/moderate/active), and goals (lose/maintain/gain weight)
- **AI Chat Assistant**: Natural language interaction for nutrition advice and personalized meal planning
- **Meal Logging**: Track daily meals with automatic macro calculations
- **Weight Tracking**: Visual progress charts showing weight history over time
- **Macro Targets**: Automatic daily macro calculations based on user metrics and goals

## Tech Stack

**Frontend:**

- React + Vite
- Recharts (data visualization)

**Backend:**

- Django REST Framework
- JWT Authentication
- PostgreSQL

**AI Integration:**

- n8n workflow automation
- OpenAI API
- PostgreSQL tool for user data retrieval

**Deployment:**

- Choreo (frontend + backend)
- Hostinger (PostgreSQL database, n8n workflow)

## Database Schema

**User** - Authentication and basic info
**Profile** - Weight, height, activity level, fitness goals
**Meal** - Meal entries with macros (protein, carbs, fat, calories)
**WeightEntry** - Historical weight tracking

## How It Works

### AI Workflow (n8n)

1. User sends message via chat interface
2. n8n webhook receives request with `user_id` and `message`
3. OpenAI AI agent processes request
4. PostgreSQL tool retrieves current user profile data
5. AI generates personalized response based on user metrics and goals
6. Response with meal recommendations and macro calculations returned to frontend

### Macro Calculation

Daily macro targets are automatically calculated based on:

- Current weight and height
- Activity level
- Fitness goal (weight loss/maintenance/gain)
- Standard nutrition formulas (BMR, TDEE)

## Installation

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL

### Backend Setup

```bash
cd backend
python -m venv env
source env/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create `.env` files in both frontend and backend directories:

**Backend (.env):**

```
DB_HOST
DB_PORT
DB_USER
DB_NAME
DB_PWD
OPENAI_API_KEY
```

**Frontend (.env):**

```
VITE_API_URL
VITE_N8N_WEBHOOK_URL
```

## API Endpoints

```
POST   /api/register/           - Register new user
POST   /api/token/              - Login (get JWT tokens)
POST   /api/token/refresh/      - Refresh access token
GET    /api/profile/            - Get user profile
PATCH  /api/profile/            - Update user profile
GET    /api/meals/              - Get meals for date
POST   /api/meals/              - Log new meal
DELETE /api/meals/<id>/         - Delete meal
GET    /api/macros/             - Get daily macro summary
GET    /api/macros/history/     - Get macro history for date range
POST   /api/weight/             - Log weight entry
GET    /api/weight/history/     - Get weight history
```

## Future Enhancements

- Recipe database with nutritional information
- Meal prep planning and grocery lists
- Social features (share meal plans, follow users)
- Mobile app (React Native)
- Integration with fitness trackers
