# Candidate Tracking System

A full-stack Candidate Tracking System built using React, Node.js, Express, and MySQL.  
This application helps recruiters manage candidates, track interview status, and monitor hiring progress.

---

# Features

## Authentication
- Recruiter Login with JWT Authentication
- Protected Routes
- Persistent Login

## Candidate Management
- Add Candidate
- View Candidates
- Update Candidate
- Delete Candidate
- Search Candidates

## Dashboard Analytics
- Total Candidates
- Candidates by Status
- Recently Added Candidates
- Top Skills Distribution

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Vite

## Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication

---

# Folder Structure

```bash
candidate-tracking-system
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── context
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── routes
│   │   └── sql


## Setup Instructions
1. Clone Repository
git clone https://github.com/Srija0801/candidate-tracking-system.git
2. Install Frontend Dependencies
cd client
npm install
3. Install Backend Dependencies
cd ../server
npm install
4. Configure Environment Variables

Create a .env file inside the server folder and add the required environment variables.

5. Setup MySQL Database
Open MySQL Workbench
Create a database named:
candidate_dashboard
Run the SQL schema file located at:
server/src/sql/schema.sql
6. Run Backend Server
cd server
npm start

Backend runs on:

http://localhost:5000
7. Run Frontend
cd client
npm run dev

Frontend runs on:

http://localhost:5173


## Environment Variables Example

Create a .env file inside the server folder.

PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=candidate_dashboard

JWT_SECRET=your_secret_key
API Endpoints
Authentication APIs
Method	Endpoint
POST	/api/auth/login
POST	/api/auth/logout
GET	/api/auth/me
Candidate APIs
Method	Endpoint
GET	/api/candidates
GET	/api/candidates/:id
POST	/api/candidates
PUT	/api/candidates/:id
DELETE	/api/candidates/:id
## SQL Schema / Migrations

The SQL schema file is available at:

server/src/sql/schema.sql

This schema creates:

recruiters table
candidates table

## Architecture Notes
## Frontend Architecture

The frontend is built using React.js with component-based architecture.

Main Structure
pages → Application pages
components → Reusable UI components
services → API handling
context → Authentication state management
Frontend Technologies
React.js
React Router DOM
Tailwind CSS
Axios
Vite


## Backend Architecture

The backend follows REST API architecture using Express.js.

## Main Structure
controllers → Business logic
routes → API routes
middlewares → Authentication & error handling
config → Database configuration
sql → Database schema
Backend Technologies
Node.js
Express.js
MySQL
JWT Authentication
## Authentication Flow
User logs in
JWT token is generated
Token stored in localStorage
Protected APIs use Bearer token authentication
