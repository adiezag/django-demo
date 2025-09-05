# AI Meal Planner

A full-stack web application that generates personalized meal plans using AI based on user fitness profiles and goals.

## Features

- User registration and JWT authentication
- Personalized meal plan generation using AI
- Weight tracking with progress visualization
- Real-time AI integration via n8n workflows

## Tech Stack

**Backend**

- Django REST Framework
- PostgreSQL
- JWT Authentication

**Frontend**

- React
- Vite
- Data visualization for weight tracking

**AI/Automation**

- n8n workflow automation
- GPT model integration
- PostgreSQL database queries

## How It Works

1. Users create profiles with height, weight, age, activity level, and goals
2. Frontend sends requests to n8n workflow with user data
3. AI agent queries user profile and generates personalized meal plans
4. Users can track weight progress with interactive charts

## Database Schema

- **User Profile**: Stores user metrics and fitness goals
- **Weight History**: Tracks weight changes over time

## Setup

1. Clone the repository
2. Set up PostgreSQL database
3. Configure Django backend with environment variables
4. Install frontend dependencies and run Vite dev server
5. Set up n8n workflow with webhook and AI agent configuration

## API Integration

The application integrates with n8n workflows through HTTP POST requests, enabling real-time AI meal plan generation based on stored user profiles.

## Running the application

- Backend:
  cd backend
  python3 manage.py runserver

- Frontend:
  npm run dev
