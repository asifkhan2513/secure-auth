# Secure Auth Backend

A secure authentication system built with Node.js, Express, TypeScript, and MongoDB.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file with the following variables:

```env
PORT=8080
MONGO_URI="mongodb://localhost:27017/secure-auth"
JWT_SECRET="your-secret-key-here"

# Mail SMTP Details
MAIL_HOST="smtp.gmail.com"
MAIL_USER="your-email@gmail.com"
MAIL_PASS="your-app-password"
```

### 3. Build TypeScript to JavaScript

```bash
npm run build
```

### 4. Start the Server

```bash
npm start
```

### 5. Development Mode

```bash
npm run dev
```

## API Endpoints

### Authentication Routes

- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/sendotp` - Send OTP for email verification
- `POST /api/auth/login` - Login user
- `POST /api/auth/sendotp` - Send OTP for email verification

### Request Examples


#### Send OTP

```json
{
  "email": "john@example.com"
}
```

#### Signup

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```


## Project Structure

```
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middlewares/     # Custom middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── utils/           # Utility functions
├── mails/           # Email templates
├── dist/            # Compiled JavaScript (generated)
└── index.ts         # Main application file
```

## Features

- User registration and login
- Password hashing with bcrypt
- JWT token authentication
- Email OTP verification
- MongoDB integration
- TypeScript support
- Input validation
- Error handling

---

## ��� Session & Cookie Security Checklist

### ✅ Implemented:

- [x] JWT-based authentication
- [x] Token verification
- [x] User validation
- [x] Multiple token sources

### ��� Recommended Additions:

- [ ] HttpOnly cookies (add to login/signup)
- [ ] Secure flag for production
- [ ] SameSite attribute for CSRF protection
- [ ] Token refresh mechanism
- [ ] Token blacklisting for logout
- [ ] Session timeout

---

## ���️ Complete Security Checklist

### Authentication & Authorization:

- [x] JWT authentication
- [x] Password hashing (bcrypt)
- [x] User verification in middleware
- [x] Role-based access control (isAdmin)
- [ ] Token refresh mechanism
- [ ] Account lockout after failed attempts
- [ ] Two-factor authentication (2FA)

### Data Protection:

- [x] Input validation
- [x] String length limits
- [x] Enum validation
- [ ] XSS protection (sanitize HTML)
- [ ] SQL/NoSQL injection protection
- [ ] CSRF protection

### Network Security:

- [x] CORS configuration
- [ ] HTTPS enforcement (production)
- [ ] Rate limiting
- [ ] Helmet.js headers
- [ ] DDoS protection

### File Upload Security:

- [x] File count validation
- [x] Cloudinary integration
- [ ] File size limits
- [ ] File type validation
- [ ] Virus scanning

### Error Handling:

- [x] Consistent error responses
- [x] Error logging
- [ ] Don't expose stack traces in production
- [ ] Centralized error handler

### Monitoring & Logging:

- [x] Basic console logging
- [ ] Winston logger
- [ ] Request logging (Morgan)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring

---

## ��� Production Deployment Checklist

### Before Deployment:

1. [ ] Set NODE_ENV=production
2. [ ] Use strong JWT_SECRET
3. [ ] Configure proper CORS origins
4. [ ] Enable HTTPS
5. [ ] Set secure cookie flags
6. [ ] Add rate limiting
7. [ ] Install Helmet.js
8. [ ] Set up error logging
9. [ ] Configure MongoDB connection pooling
10. [ ] Set up backup strategy
11. [ ] Add health check endpoint
12. [ ] Configure process manager (PM2)
13. [ ] Set up monitoring (New Relic, DataDog)
14. [ ] Configure firewall rules
15. [ ] Set up SSL/TLS certificates

---
