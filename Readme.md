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

## 🔐 Security Features

- **Secure Cookies**: HTTP-only cookies with secure flags
- **JWT Authentication**: Token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Protection against brute force attacks
- **CORS Protection**: Configurable cross-origin requests
- **Helmet Security**: Security headers
- **Input Validation**: Request validation and sanitization

## 📡 API Endpoints

### Authentication Routes (Base URL: `/api/auth`)

- `POST /signup` - Register a new user
- `POST /login` - Login user (sets secure cookies)
- `POST /logout` - Logout user (clears cookies)
- `POST /sendotp` - Send OTP for email verification
- `GET /profile` - Get user profile (protected route)

### Request Examples

#### Signup

```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login (Sets Secure Cookies)

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Access Protected Route

```bash
curl -X GET http://localhost:8080/api/auth/profile \
  -b cookies.txt
```

#### Logout

```bash
curl -X POST http://localhost:8080/api/auth/logout \
  -b cookies.txt
```

### Response Format

All responses follow this structure:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": {}, // Optional data
  "error": "Error details" // Only in development
}
```

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

## 🍪 Cookie Security Implementation

This authentication system implements secure cookie-based authentication with the following features:

### Cookie Configuration

- **HTTP-Only Cookies**: `jwt` cookie is HTTP-only (cannot be accessed via JavaScript)
- **Secure Flag**: Cookies are marked secure in production (HTTPS only)
- **SameSite**: Set to `strict` to prevent CSRF attacks
- **Path**: Set to `/` for application-wide access
- **Max Age**: 30 days expiration

### Dual Cookie Strategy

1. **`jwt` Cookie**: HTTP-only, most secure, used by server middleware
2. **`token` Cookie**: Accessible to JavaScript, for frontend convenience

### Authentication Flow

1. **Login/Signup**: Sets both secure cookies automatically
2. **Protected Routes**: Middleware checks cookies in priority order
3. **Logout**: Clears both cookies securely

### Testing Cookie Authentication

```bash
# Run the cookie test (requires server to be running)
node test-cookies.js
```

## 🚀 Production Deployment

### Environment Setup

```bash
# Set environment to production
export NODE_ENV=production

# Build the application
npm run build

# Start the server
npm start
```

### Production Checklist

- [ ] Set strong `JWT_SECRET` (minimum 32 characters)
- [ ] Configure proper CORS origins (remove wildcard)
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure MongoDB connection string
- [ ] Set up email SMTP credentials
- [ ] Configure rate limiting based on your needs
- [ ] Set up monitoring and logging
- [ ] Configure firewall rules
- [ ] Set up backup strategy

## 📊 Project Structure

```
secure-auth/
├── config/              # Database configuration
├── controllers/         # Route controllers with cookie handling
├── middlewares/         # Authentication middleware
├── models/             # Mongoose models
├── routes/             # API routes
├── utils/              # Utility functions
├── mails/              # Email templates
├── dist/               # Compiled JavaScript (generated)
├── test-cookies.js     # Cookie authentication test
├── .env                # Environment variables
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm run dev:nodemon` - Alternative development with nodemon
- `npm run clean` - Clean build directory
- `npm run type-check` - Type check without building

## 🛡️ Security Features Summary

✅ **Authentication & Authorization**

- JWT-based authentication with secure cookies
- Password hashing with bcrypt (12 salt rounds)
- Protected routes with middleware
- Automatic token validation

✅ **Cookie Security**

- HTTP-only cookies for maximum security
- Secure flag for HTTPS environments
- SameSite strict for CSRF protection
- Proper cookie clearing on logout

✅ **Network Security**

- Rate limiting (100 requests/15min general, 5 auth requests/15min)
- CORS protection with configurable origins
- Helmet.js security headers
- Request size limits

✅ **Data Protection**

- Input validation and sanitization
- MongoDB injection protection
- Error handling without information leakage
- Environment-based error responses
