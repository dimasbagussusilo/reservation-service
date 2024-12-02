# Reservation Service API

This project provides an API for managing reservations, customers, places, resources, and authentication. Below is the detailed guide to help you use and understand the API.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Run the Server](#run-the-server)
4. [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Customer Management](#customer-management)
    - [Place Management](#place-management)
    - [Resource Management](#resource-management)
    - [Reservation Management](#reservation-management)
5. [Database Schema](#database-schema)

---

## Overview

The Reservation Service API is designed to facilitate the creation and management of reservations. It supports CRUD operations for customers, places, and resources, along with user authentication.

---

## Features

- User Authentication with JWT.
- Customer management with filtering and pagination.
- Management of places and resources.
- Endpoints for creating and managing reservations.

---

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dimasbagussusilo/reservation-service.git
   ```
2. Navigate to the project directory:
   ```bash
   cd reservation-service
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Run the Server

1. Start the development server:
   ```bash
   npm run start
   ```
2. Access the API at:
   ```
   http://localhost:8080
   ```

---

## API Endpoints

### Authentication

| Method | Endpoint          | Description |
|--------|--------------------|-------------|
| POST   | `/auth/login`      | User login  |
| POST   | `/auth/register`   | User registration |

---

### Customer Management

| Method | Endpoint             | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/customers`          | Retrieve all customers   |
| POST   | `/customers`          | Create a new customer    |
| GET    | `/customers/{id}`     | Retrieve a specific customer |
| PUT    | `/customers/{id}`     | Update a specific customer |
| DELETE | `/customers/{id}`     | Delete a specific customer |

---

### Place Management

| Method | Endpoint             | Description           |
|--------|-----------------------|-----------------------|
| GET    | `/places`            | Retrieve all places   |
| POST   | `/places`            | Create a new place    |
| GET    | `/places/{id}`       | Retrieve a specific place |
| PUT    | `/places/{id}`       | Update a specific place |
| DELETE | `/places/{id}`       | Delete a specific place |

---

It seems like the table is incomplete or missing additional endpoints and details for a comprehensive resource and reservation management API. Here's an extended version with some placeholders for you to complete based on your system's requirements:

---

### Resource Management

| Method | Endpoint               | Description                      |
|--------|-------------------------|----------------------------------|
| GET    | `/resources`           | Retrieve all resources           |
| POST   | `/resources`           | Create a new resource            |
| GET    | `/resources/:id`       | Retrieve a specific resource     |
| PUT    | `/resources/:id`       | Update a specific resource       |
| DELETE | `/resources/:id`       | Delete a specific resource       |

---

### Reservation Management

| Method | Endpoint                  | Description                                  |
|--------|----------------------------|----------------------------------------------|
| GET    | `/reservations`           | Retrieve all reservations                    |
| POST   | `/reservations`           | Create a new reservation                     |
| GET    | `/reservations/:id`       | Retrieve a specific reservation              |
| PUT    | `/reservations/:id`       | Update a specific reservation                |
| DELETE | `/reservations/:id`       | Cancel a specific reservation                |
| GET    | `/reservations/resource/:id` | Retrieve reservations for a specific resource |

---

## Database Schema
![db diagram](Reservation%20Service%20Diagram.png)

---

## License

This project is licensed under the [MIT License].

Feel free to contribute or provide feedback!
