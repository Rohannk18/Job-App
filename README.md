# Job Ecosystem App

Unified platform for job seekers, employers, and admins. This repository includes a Django REST backend and a React frontend.

## Stack
- Backend: Django REST Framework + PostgreSQL
- Frontend: React + Vite
- Auth: JWT (email/password)

## Repo Layout
- backend: Django project and API apps
- frontend: React client

## Backend Setup
1. Create a virtual environment and install dependencies:
   - python -m venv .venv
   - .venv\Scripts\activate
   - pip install -r backend\requirements.txt
2. Create a .env file in backend using backend\.env.example.
   - Set DB_ENGINE=sqlite to run locally without Postgres.
3. Run migrations:
   - python backend\manage.py makemigrations
   - python backend\manage.py migrate
4. Start the API server:
   - python backend\manage.py runserver

## Frontend Setup
1. Install dependencies:
   - cd frontend
   - npm install
2. Create a .env file in frontend using frontend\.env.example.
3. Start the dev server:
   - npm run dev

## API Modules
- Accounts: registration, profile, resumes, bookmarks
- Companies: company profiles
- Jobs: job listings and filtering
- Applications: apply and track status
- Notifications: user notifications
- Moderation: job reports and employer verification
- Payments: subscription plans and payments (stub)

## Notes
- The models are a starter skeleton aligned with the PRD and are intended for extension.
- Add real notification/email services and payment gateway integration later.
