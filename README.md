# Invoice Management System

A full-stack invoice management application for creating, viewing, and tracking invoices.

## Tech Stack

**Frontend:**
- Next.js
- Tailwind CSS
- Axios

**Backend:**
- NestJS
- PostgreSQL
- Prisma ORM

## Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose
- npm or yarn

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Start PostgreSQL Database

```bash
cd backend
docker-compose up -d
```

This will start PostgreSQL on port `5433` with the following credentials:
- **Database:** `acme_invoicing`
- **User:** `postgres`
- **Password:** `password`

### 3. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file with:
DATABASE_URL="postgresql://postgres:password@localhost:5433/acme_invoicing"

# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Start the backend server
npm run start:dev
```

Backend will run on `http://localhost:5000`

### 4. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
# Create a .env.local file with:
NEXT_PUBLIC_API_URL=http://localhost:5000

# Start the frontend server
npm run dev
```

Frontend will run on `http://localhost:3000`

## Project Structure

```
.
├── backend/          # NestJS API
├── frontend/         # Next.js application
└── backend/docker-compose.yml
```

## Features

- Create invoices with multiple line items
- View all invoices in a responsive table
- Automatic invoice numbering
- Calculate totals and subtotals
- Customer information management
- Real-time invoice list updates

## Database Management

**View database:**
```bash
cd backend
npx prisma studio
```

**Reset database:**
```bash
cd backend
npx prisma migrate reset
```

**Stop database:**
```bash
docker-compose down
```

**Stop and remove data:**
```bash
docker-compose down -v
```

## API Endpoints

- `GET /invoices` - Fetch all invoices
- `POST /invoices` - Create a new invoice
 
  
## Troubleshooting

**Database connection issues:**
- Ensure Docker is running
- Check if port 5433 is available
- Verify DATABASE_URL in backend `.env`

**Frontend can't reach backend:**
- Confirm backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in frontend `.env.local`

**Prisma errors:**
```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

 
