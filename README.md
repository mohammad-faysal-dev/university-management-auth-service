# 🎓 University Management Auth Service

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Zod-Validation-3E67B1?style=for-the-badge" />
</p>

> A robust, scalable **University Management Authentication & Authorization Service** built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**. This service handles user creation and management for Students, Faculty members, and Admins — complete with role-based access, auto-generated IDs, and Mongoose transactions.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Data Models](#-data-models)
- [Scripts](#-scripts)
- [Code Quality](#-code-quality)

---

## ✨ Features

- 🔐 **Role-Based User Management** — Create and manage **Students**, **Faculty**, and **Admins** with distinct roles
- 🆔 **Auto-Generated IDs** — Unique IDs are automatically generated for each user type (e.g., `2024-01-00001`)
- 🔄 **MongoDB Transactions** — Atomic operations using Mongoose sessions to ensure data integrity
- 🏛️ **Academic Structure** — Full support for Academic Semesters, Faculties, and Departments
- 🏢 **Management Department** — Dedicated module for university administrative departments
- ✅ **Zod Validation** — Request body validation using Zod schemas via custom middleware
- 🌐 **Global Error Handling** — Centralized error handler with meaningful error responses
- 📋 **Winston Logging** — Structured application logging for production environments
- 🔧 **CORS Support** — Configured for cross-origin requests
- 💅 **Code Quality** — ESLint + Prettier + Husky pre-commit hooks

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Language | TypeScript 5.x |
| Framework | Express.js 5.x |
| Database | MongoDB via Mongoose 9.x |
| Validation | Zod 4.x |
| Logging | Winston |
| Linting | ESLint + Prettier |
| Git Hooks | Husky + lint-staged |
| Package Manager | Yarn |

---

## 📁 Project Structure

```
university-management-auth-service/
├── src/
│   ├── app/
│   │   └── modules/
│   │       ├── users/                  # User creation (Student, Faculty, Admin)
│   │       ├── student/                # Student model, service, routes
│   │       ├── faculty/                # Faculty model, service, routes
│   │       ├── admin/                  # Admin model, service, routes
│   │       ├── academicSemester/       # Academic semester management
│   │       ├── academicFaculty/        # Academic faculty management
│   │       ├── academicDepartment/     # Academic department management
│   │       └── managementDepartment/   # Management department module
│   ├── config/
│   │   └── index.ts                    # Environment configuration
│   ├── constants/                      # Application-wide constants
│   ├── enums/                          # TypeScript enums
│   ├── errors/                         # Custom error classes (ApiError)
│   ├── helpers/                        # Utility helper functions
│   ├── interfaces/                     # Shared TypeScript interfaces
│   ├── middlewares/
│   │   ├── globalErrorHandler.ts       # Centralized error handling
│   │   └── validateRequest.ts          # Zod validation middleware
│   ├── shared/                         # Shared utilities (pagination, filters)
│   ├── app.ts                          # Express app setup
│   └── server.ts                       # Server entry point
├── logs/                               # Winston log files
├── .env                                # Environment variables
├── .husky/                             # Git hooks
├── .prettierrc                         # Prettier configuration
├── eslint.config.js                    # ESLint configuration
├── tsconfig.json                       # TypeScript configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local or Atlas)
- **Yarn** package manager

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/university-management-auth-service.git

# 2. Navigate into the project directory
cd university-management-auth-service

# 3. Install dependencies
yarn install

# 4. Copy the environment file and fill in the values
cp .env.example .env
```

### Running the Server

```bash
# Start the development server
yarn start
```

The server will start at `http://localhost:PORT` (as configured in `.env`).

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/university-management

# Default passwords assigned during user creation
DEFAULT_STUDENT_PASSWORD=student123
DEFAULT_FACULTY_PASSWORD=faculty123
DEFAULT_ADMIN_PASSWORD=admin123
```

| Variable | Description | Required |
|---|---|---|
| `NODE_ENV` | Application environment (`development` / `production`) | ✅ |
| `PORT` | Port number for the server | ✅ |
| `DATABASE_URL` | MongoDB connection string | ✅ |
| `DEFAULT_STUDENT_PASSWORD` | Default password for new students | ✅ |
| `DEFAULT_FACULTY_PASSWORD` | Default password for new faculty members | ✅ |
| `DEFAULT_ADMIN_PASSWORD` | Default password for new admins | ✅ |

---

## 📡 API Endpoints

Base URL: `http://localhost:PORT/api/v1`

### 👤 Users

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/users/create-student` | Create a new student user |
| `POST` | `/users/create-faculty` | Create a new faculty user |
| `POST` | `/users/create-admin` | Create a new admin user |

### 🎓 Students

> Routes served under `/api/v1/users/create-student`. Student CRUD operations are managed via the users module with full population of academic references.

### 👨‍🏫 Faculty

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/faculties` | Get all faculty members |
| `GET` | `/faculties/:id` | Get a single faculty member |
| `PATCH` | `/faculties/:id` | Update a faculty member |
| `DELETE` | `/faculties/:id` | Delete a faculty member |

### 🔑 Admins

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admins/:id` | Get a single admin |
| `PATCH` | `/admins/:id` | Update an admin |
| `DELETE` | `/admins/:id` | Delete an admin |

### 📅 Academic Semesters

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/academic-semesters/create-semester` | Create a new semester |
| `GET` | `/academic-semesters` | Get all semesters |
| `GET` | `/academic-semesters/:id` | Get a single semester |
| `PATCH` | `/academic-semesters/:id` | Update a semester |
| `DELETE` | `/academic-semesters/:id` | Delete a semester |

### 🏛️ Academic Faculties

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/academic-faculties/create-faculty` | Create a new academic faculty |
| `GET` | `/academic-faculties` | Get all academic faculties |
| `GET` | `/academic-faculties/:id` | Get a single academic faculty |
| `PATCH` | `/academic-faculties/:id` | Update an academic faculty |
| `DELETE` | `/academic-faculties/:id` | Delete an academic faculty |

### 🏢 Academic Departments

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/academic-departments/create-department` | Create a new department |
| `GET` | `/academic-departments` | Get all departments |
| `GET` | `/academic-departments/:id` | Get a single department |
| `PATCH` | `/academic-departments/:id` | Update a department |
| `DELETE` | `/academic-departments/:id` | Delete a department |

### 🏬 Management Departments

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/management-departments/create-department` | Create management department |
| `GET` | `/management-departments` | Get all management departments |
| `GET` | `/management-departments/:id` | Get a single management department |
| `PATCH` | `/management-departments/:id` | Update a management department |
| `DELETE` | `/management-departments/:id` | Delete a management department |

---

## 🗂️ Data Models

### Student

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Auto-generated student ID |
| `name` | `{ firstName, middleName?, lastName }` | Student's full name |
| `gender` | `'male' \| 'female'` | Gender |
| `dateOfBirth` | `string` | Date of birth |
| `email` | `string` | Email address |
| `contactNo` | `string` | Contact number |
| `bloodGroup` | `enum` | Blood group (optional) |
| `guardian` | `object` | Father & mother details |
| `localGuardian` | `object` | Local guardian details |
| `academicSemester` | `ObjectId` | Reference to Academic Semester |
| `academicDepartment` | `ObjectId` | Reference to Academic Department |
| `academicFaculty` | `ObjectId` | Reference to Academic Faculty |

### Faculty

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Auto-generated faculty ID (e.g., `F-00001`) |
| `name` | `object` | Full name |
| `gender` | `enum` | Gender |
| `email` | `string` | Email |
| `academicDepartment` | `ObjectId` | Linked department |
| `academicFaculty` | `ObjectId` | Linked faculty |

### Admin

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Auto-generated admin ID (e.g., `A-00001`) |
| `name` | `object` | Full name |
| `email` | `string` | Email |
| `managementDepartment` | `ObjectId` | Linked management department |

---

## 📜 Scripts

```bash
# Start the server
yarn start

# Lint check
yarn lint:check

# Auto-fix lint issues
yarn lint:fix

# Format code with Prettier
yarn prettier:fix

# Fix lint + format together
yarn lint-prettier
```

---

## 🧹 Code Quality

This project enforces code quality using:

- **ESLint** — Static analysis and linting for TypeScript
- **Prettier** — Automatic code formatting
- **Husky** — Pre-commit git hooks
- **lint-staged** — Runs ESLint & Prettier only on staged files before each commit

```
// On every git commit, lint-staged will run:
eslint --fix && prettier --write
// for all staged .ts files in src/
```

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Built with ❤️ for university management systems
</p>
