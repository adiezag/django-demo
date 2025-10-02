# Meal Planner

A full-stack nutrition and meal planning application with AI-powered chat assistance.

🔗 **Live Demo**: [https://143aacb0-7949-4272-8999-8f68b30d84d2.e1-us-east-azure.choreoapps.dev](https://your-app-url-here.com)

## Tech Stack

**Frontend**

- React + Vite

**Backend**

- Django
- Django REST Framework
- JWT Authentication

**Database**

- PostgreSQL (hosted on Hostinger)

**AI Integration**

- n8n workflow (hosted on Hostinger)
- OpenAI Chat Model
- PostgreSQL tool for data retrieval

**Deployment**

- Choreo

## Features

- **User Registration & Authentication**: Secure signup/login with JWT
- **Profile Management**: Track height, weight, activity level (sedentary, light, moderate, active), and goals (lose/maintain/gain weight)
- **Weight Tracking**: Historical weight data visualization with graphs
- **AI Chat Assistant**: Natural language interaction for nutrition advice and personalized meal plans
- **Dynamic Meal Planning**: AI generates meal plans based on current user profile and goals

## Architecture

### n8n Workflow

1. Webhook receives POST request with `user_id` and `message`
2. AI agent processes request using OpenAI model
3. PostgreSQL tool retrieves user profile data
4. Agent generates contextual response based on user data
5. Response returned to frontend

## Development

### Backend

```bash
python3 manage.py runserver
```

### Frontend

```bash
npm run dev
```
