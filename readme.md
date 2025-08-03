# 🚖 Ride Booking API

## 🎯 Project Overview

A **secure, scalable**, and **role-based** REST API for a ride booking platform (like Uber or Pathao), built with **Node.js**, **Express.js**, and **MongoDB**. The system supports three user roles: **Admin**, **Driver**, and **Rider**.

---

## ✅ Features

### 🔐 Authentication & Roles
- JWT-based login (stored in **HTTP-only cookies**)
- Password hashing using bcrypt
- Roles: `admin`, `driver`, `rider`

### 👥 User Management
- Register as rider or driver
- Login and authenticate via JWT
- Drivers include approval, block status, and vehicle info
- Admin can approve/block drivers or riders

### 🚘 Ride Management
- Riders can request, cancel, and view ride history
- Drivers can accept rides, update ride status, and go online/offline
- Admin can view/manage all rides
- Ride status lifecycle with timestamp tracking

### 💬 Feedback & Ratings
- Rider and driver can submit feedback after a completed ride
- History is created automatically

---

## 🧩 API Endpoints

### 📌 Authentication

#### 🔹 Register (Rider or Driver)
**POST** `/api/v1/user/register`

**Body (Rider):**
```json
{
  "role": "rider",
  "name": "Sarker",
  "email": "sarker@example.com",
  "password": "1234567"
}
```

**Body (Driver):**
```json
{
  "role": "driver",
  "name": "Faysal Driver",
  "email": "driver@gmail.com",
  "password": "123456",
  "driverProfile": {
    "vehicleInfo": {
      "model": "Toyota Prius",
      "licensePlate": "DHK-4567",
      "color": "White"
    }
  }
}
```

#### 🔹 Login
**POST** `/api/v1/user/login`

```json
{
  "email": "sarker@example.com",
  "password": "1234567"
}
```

> 🔐 Authenticated via **JWT cookie**

---

### 🚖 Rider Features

#### 🟢 Request Ride
**POST** `/api/v1/rides/request`

```json
{
  "pickupLocation": {
    "lat": 23.8103,
    "lng": 90.4125,
    "address": "Gulshan, Dhaka"
  },
  "destinationLocation": {
    "lat": 23.7806,
    "lng": 90.2792,
    "address": "Dhanmondi, Dhaka"
  }
}
```
> 💰 Fare = 20 per kilometer (calculated automatically)

#### ❌ Cancel Ride
**POST** `/api/v1/rides/:rideId/cancel`

> Rider can cancel only before driver accepts

#### 📜 Ride History
**GET** `/api/v1/rides/history`

---

### 🚗 Driver Features

#### 🔍 Get Available Rides
**GET** `/api/v1/rides/available`

#### ✅ Accept a Ride
**POST** `/api/v1/rides/:rideId/accept`

#### 🔄 Update Ride Status
**PATCH** `/api/v1/rides/:rideId/status`

```json
{
  "status": "picked_up" // or "in_transit", "completed"
}
```

#### 🟢 Set Online/Offline
**PATCH** `/api/v1/user/online-status`

```json
{
  "isOnline": true
}
```

#### 💸 View Earnings
**GET** `/api/v1/driver/earnings`

---

### 💬 Ratings & Feedback

#### Rider → Driver
**PATCH** `/rider-feedback/:rideId`
```json
{
  "rating": 4,
  "feedback": "Safe journey"
}
```

#### Driver → Rider
**PATCH** `/driver-feedback/:rideId`
```json
{
  "rating": 5,
  "feedback": "Polite and on time"
}
```

---

### 🛠️ Admin Features

#### 👁 View Users
- **GET** `/all-riders`
- **GET** `/all-drivers`

#### 🧾 View Ride Summary
**GET** `/user-summary`

#### ✅ Approve Driver
**PATCH** `/drivers/approve/:id`

#### 🚫 Block/Unblock Users
**PATCH** `/users/block/:id`

#### ✏️ Update User
**PATCH** `/users/:id`

#### 🗑 Delete User
**DELETE** `/users/:id`

---

## 📘 Ride Lifecycle

```text
requested → accepted → picked_up → in_transit → completed
```

Each status update logs a **timestamp**, and cancellation creates a separate state:
- `cancelled_by_rider`
- `cancelled_by_driver`

---

## ❓ Planning Decisions & Answers

| Question | Answer |
|---------|--------|
| 🔁 Ride Matching | Drivers manually accept from available rides |
| ❌ Cancel Rules | Allowed only before driver accepts |
| 🧍 Multiple Rides | One active ride per user |
| 🚫 Suspended Driver | Cannot access ride endpoints |
| 🚗 Driver Already on Ride | Cannot accept another ride |
| 🌍 Location Format | Latitude, Longitude, and Address |
| 📦 User Model | Single model with `role` field and nested `driverProfile` |
| 🛡 Role Protection | Route guards using JWT + role middleware |
| 📜 Logging | All ride statuses logged with timestamps |
| 📊 Reports & Ratings | Ratings + feedback stored per ride, history auto created |

---




