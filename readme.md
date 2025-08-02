
```markdown
# 🚗 Ride Booking API Documentation

This is the API for a ride booking system. It allows riders to request rides, and drivers to view, accept, update, and complete those rides.

## 🌐 Base URL

```

[http://localhost:5000/api](http://localhost:5000/api)

```

---

## 🛣️ Ride Endpoints

### ✅ Create a New Ride (Rider)
```

POST /rides

````
**Headers:**  
`Authorization: Bearer <token>`

**Body:**
```json
{
  "pickupLocation": {
    "lat": 23.78,
    "lng": 90.39,
    "address": "Banani, Dhaka"
  },
  "destinationLocation": {
    "lat": 23.75,
    "lng": 90.36,
    "address": "Gulshan, Dhaka"
  }
}
````

---

### 📦 Get All Rides of the Rider

```
GET /rides
```

**Headers:**
`Authorization: Bearer <token>`

---

### 🚘 Get All Available Rides (for Drivers)

```
GET /rides/available
```

**Headers:**
`Authorization: Bearer <token>`

---

### 🔍 Get Single Ride by ID

```
GET /rides/:rideId
```

**Headers:**
`Authorization: Bearer <token>`

---

### 🛠️ Update Ride Info

```
PATCH /rides/:rideId
```

**Headers:**
`Authorization: Bearer <token>`

**Body (example):**

```json
{
  "status": "accepted",
  "driver": "driverId_here"
}
```

---

### 🗑️ Delete a Ride

```
DELETE /rides/:rideId
```

**Headers:**
`Authorization: Bearer <token>`

---

### ❌ Cancel a Ride (Rider or Driver)

```
POST /rides/:rideId/cancel
```

**Headers:**
`Authorization: Bearer <token>`

---

### 🧍‍♂️ Accept a Ride (Driver)

```
POST /rides/:rideId/accept
```

**Headers:**
`Authorization: Bearer <token>`

---

### 🔄 Update Ride Status (Driver)

```
PATCH /rides/:rideId/status
```

**Headers:**
`Authorization: Bearer <token>`

**Body (example):**

```json
{
  "status": "in_transit"
}
```

**Valid status values:**

* accepted
* picked\_up
* in\_transit
* completed
* cancelled\_by\_rider
* cancelled\_by\_driver

---

## 🔐 Authentication

All endpoints require JWT authentication.
Use the token in the header:

```
Authorization: Bearer <your_token>
```

---

## 🧪 How to Test in Postman

1. Set base URL: `http://localhost:5000/api`
2. Go to **Authorization** tab, select **Bearer Token**, and paste your token.
3. Use the endpoints as described above.
4. Set `Content-Type: application/json` for POST and PATCH requests.
5. Use correct rideId when testing `/:rideId` endpoints.

---

Happy Testing! 🚀

```

---

You can copy and paste this into your `README.md` file directly. Let me know if you want the same in Bangla or styled with badges.
```
