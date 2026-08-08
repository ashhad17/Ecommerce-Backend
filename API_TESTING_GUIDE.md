# Backend API Testing Guide

Base URL: http://localhost:5000/api/v1

> The backend uses cookie-based auth. After login, the token is returned in the response body and also stored in the `token` cookie.

## 1) New server behavior

### Health check
Method: GET /health

Expected response:
```json
{
  "success": true,
  "message": "Server is healthy"
}
```

Expected status: 200

### Unknown route
Method: GET /does-not-exist

Expected response:
```json
{
  "success": false,
  "message": "Route not found"
}
```

Expected status: 404

### Validation error example
If a request body is invalid, the API now returns a structured response like:
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email"
    }
  ]
}
```

Expected status: 400

---

## 2) User APIs

### Register user
Method: POST /register

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "12345678",
  "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQwAAwABJQ1i7QAAAABJRU5ErkJggg=="
}
```

Expected response:
```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "<jwt-token>"
}
```

Expected status: 201

### Login user
Method: POST /login

Request body:
```json
{
  "email": "john@example.com",
  "password": "12345678"
}
```

Expected response:
```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "<jwt-token>"
}
```

Expected status: 200

### Logout user
Method: GET /logout

Expected response:
```json
{
  "success": true,
  "message": "User logged out"
}
```

Expected status: 200

### Forgot password
Method: POST /password/forgot

Request body:
```json
{
  "email": "john@example.com"
}
```

Expected response:
```json
{
  "success": true,
  "message": "Email sent to john@example.com successfully"
}
```

Expected status: 200

### Reset password
Method: PUT /password/reset/:token

Request body:
```json
{
  "password": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

Expected response:
```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "<jwt-token>"
}
```

Expected status: 200

### Get profile
Method: GET /profile

Auth required: yes

Expected response:
```json
{
  "success": true,
  "user": {
    "_id": "<user-id>",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

Expected status: 200

### Update password
Method: PUT /password/update

Auth required: yes

Request body:
```json
{
  "oldPassword": "12345678",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

Expected response:
```json
{
  "success": true,
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "<jwt-token>"
}
```

Expected status: 200

### Update profile
Method: PUT /profile/update

Auth required: yes

Request body:
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQwAAwABJQ1i7QAAAABJRU5ErkJggg=="
}
```

Expected response:
```json
{
  "success": true,
  "user": {
    "name": "John Updated",
    "email": "john.updated@example.com",
    "role": "user"
  }
}
```

Expected status: 200

### Admin: get all users
Method: GET /admin/users

Auth required: yes
Role required: admin

Expected response:
```json
{
  "success": true,
  "users": []
}
```

Expected status: 201

---

## 3) Product APIs

### Create product (admin only)
Method: POST /admin/product/new

Auth required: yes
Role required: admin

Request body:
```json
{
  "name": "Wireless Headphones",
  "description": "Noise cancelling over-ear headphones",
  "price": 1999,
  "info": "Bluetooth 5.3, 40-hour battery",
  "category": "Electronics",
  "Stock": 25,
  "images": [
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQwAAwABJQ1i7QAAAABJRU5ErkJggg=="
  ]
}
```

Expected response:
```json
{
  "success": true,
  "data": {
    "name": "Wireless Headphones",
    "price": 1999,
    "category": "Electronics",
    "Stock": 25
  }
}
```

Expected status: 200

### Get all products
Method: GET /product

Optional query params:
- `keyword=Headphones`
- `category=Electronics`
- `price[gte]=1000`
- `price[lte]=3000`

Expected response:
```json
{
  "success": true,
  "products": [],
  "productsCount": 0,
  "resultPerPage": 6,
  "filteredProductCount": 0
}
```

Expected status: 201

### Get product details
Method: GET /product/:id

Expected response:
```json
{
  "succes": true,
  "Product": {
    "_id": "<product-id>",
    "name": "Wireless Headphones",
    "price": 1999
  }
}
```

Expected status: 201

### Create or update review
Method: PUT /review/new

Auth required: yes

Request body:
```json
{
  "productId": "<product-id>",
  "ratings": 5,
  "comment": "Excellent product",
  "title": "Great quality",
  "recommend": true
}
```

Expected response:
```json
{
  "success": true
}
```

Expected status: 200

### Get product reviews
Method: GET /reviews?id=<product-id>

Expected response:
```json
{
  "success": true,
  "reviews": []
}
```

Expected status: 200

### Delete review (admin only)
Method: DELETE /product/reviews/delete?productId=<product-id>&id=<review-id>

Auth required: yes
Role required: admin

Expected response:
```json
{
  "success": true
}
```

Expected status: 200

---

## 4) Order APIs

### Create order
Method: POST /order/new

Auth required: yes

Request body:
```json
{
  "shippingInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main Street",
    "city": "Delhi",
    "state": "Delhi",
    "country": "India",
    "pinCode": 110001,
    "phoneNo": 9876543210,
    "email": "john@example.com"
  },
  "orderItems": [
    {
      "name": "Wireless Headphones",
      "price": 1999,
      "quantity": 1,
      "image": "https://example.com/image.jpg",
      "productId": "<product-id>"
    }
  ],
  "paymentInfo": {
    "id": "pay_test_123",
    "status": "succeeded"
  },
  "itemsPrice": 1999,
  "taxPrice": 100,
  "shippingPrice": 50,
  "totalPrice": 2149
}
```

Expected response:
```json
{
  "success": true,
  "order": {
    "_id": "<order-id>",
    "user": "<user-id>",
    "orderStatus": "Processing"
  }
}
```

Expected status: 201

### Get single order
Method: GET /order/:id

Auth required: yes

Expected response:
```json
{
  "success": true,
  "order": {
    "_id": "<order-id>",
    "user": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

Expected status: 200

### Get my orders
Method: GET /orders/myOrders

Auth required: yes

Expected response:
```json
{
  "success": true,
  "userOrders": []
}
```

Expected status: 200

### Admin: get all orders
Method: GET /admin/orders

Auth required: yes
Role required: admin

Expected response:
```json
{
  "success": true,
  "totalAmount": 0,
  "orders": []
}
```

Expected status: 200

### Admin: update order status
Method: PUT /admin/order/:id

Auth required: yes
Role required: admin

Request body:
```json
{
  "status": "Shipped"
}
```

Expected response:
```json
{
  "success": true
}
```

Expected status: 200

---

## 5) Payment APIs

### Process payment
Method: POST /payment/process

Auth required: yes

Request body:
```json
{
  "amount": 2149
}
```

Expected response:
```json
{
  "sucess": true,
  "client_secret": "<stripe-client-secret>"
}
```

Expected status: 200

### Get Stripe API key
Method: GET /stripeapikey

Expected response:
```json
{
  "stripeApiKey": "<stripe-public-key>"
}
```

Expected status: 200

---

## 6) Implemented backend improvements

The backend now includes the missing pieces you asked for:

1. Input validation
   - Added request body validation for auth, product, review, order, and payment routes.

2. Rate limiting and security hardening
   - Added rate limiting, helmet security headers, and stricter CORS configuration.

3. Health check endpoint
   - Added GET /health for quick server availability checks.

4. 404 handling
   - Added a catch-all middleware for unknown routes.

5. Stock validation on order creation
   - Orders now verify that each product exists and has enough stock before placement.

6. Admin protection for delete order
   - Delete order is now protected by authentication and admin role checks.

7. Review validation
   - Reviews now require a valid product ID and ratings between 1 and 5.

8. Recommended next improvements
   - Add environment variable validation on startup.
   - Add optional avatar handling for registration when no image is provided.
   - Add integration tests for the main flows.
