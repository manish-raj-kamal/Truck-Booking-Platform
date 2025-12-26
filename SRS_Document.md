# Software Requirements Specification
## TruckSuvidha - Truck Booking System

---

## Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | December 25, 2024 | Development Team | Initial SRS Document |

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Scope](#12-scope)
   - 1.3 [Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
   - 1.4 [References](#14-references)
   - 1.5 [Overview](#15-overview)
2. [General Description](#2-general-description)
   - 2.1 [Product Perspective](#21-product-perspective)
   - 2.2 [Product Functions](#22-product-functions)
   - 2.3 [User Characteristics](#23-user-characteristics)
   - 2.4 [General Constraints](#24-general-constraints)
   - 2.5 [Assumptions and Dependencies](#25-assumptions-and-dependencies)
3. [Specific Requirements](#3-specific-requirements)
   - 3.1 [External Interface Requirements](#31-external-interface-requirements)
   - 3.2 [Functional Requirements](#32-functional-requirements)
   - 3.5 [Non-Functional Requirements](#35-non-functional-requirements)
   - 3.7 [Design Constraints](#37-design-constraints)
   - 3.9 [Other Requirements](#39-other-requirements)
4. [Analysis Models](#4-analysis-models)
   - 4.1 [Data Flow Diagrams (DFD)](#41-data-flow-diagrams-dfd)
5. [GitHub Link](#5-github-link)
6. [Deployed Link](#6-deployed-link)
7. [Client Approval Proof](#7-client-approval-proof)
8. [Client Location Proof](#8-client-location-proof)
9. [Transaction ID Proof](#9-transaction-id-proof)
10. [Email Acknowledgement](#10-email-acknowledgement)
11. [GST No.](#11-gst-no)
A. [Appendices](#a-appendices)

---

## 1. Introduction

The TruckSuvidha platform is a comprehensive web-based logistics solution designed to connect shippers with transporters across India. This Software Requirements Specification (SRS) document provides a detailed description of the system's requirements, functionality, and technical specifications.

### 1.1 Purpose

The purpose of this SRS is to define the requirements for the **TruckSuvidha** platform, a web-based logistics and truck booking system that facilitates the connection between customers (shippers) who need to transport goods and drivers/transporters who provide transportation services.

**Product Name:** TruckSuvidha - Truck Booking Platform

**Intended Audience:**
- Development Team (Frontend and Backend Developers)
- Quality Assurance and Testing Team
- Project Managers and Stakeholders
- System Administrators
- Client Representatives

**What the software will do:**
1. Enable customers to post loads/shipments with detailed requirements
2. Allow transporters/drivers to browse and bid on available loads
3. Facilitate secure payment processing through Razorpay integration
4. Provide real-time order status tracking throughout the delivery lifecycle
5. Offer administrative tools for managing users, loads, trucks, and platform content
6. Support multiple authentication methods including email/password and Google OAuth

**What the software will NOT do:**
1. Provide physical transportation services directly
2. Handle insurance claims or disputes
3. Manage fleet maintenance scheduling
4. Provide real-time GPS vehicle tracking (status-based tracking only)

---

### 1.2 Scope

**Product Name:** TruckSuvidha - Truck Booking Platform

**Product Overview:**
TruckSuvidha is a full-stack web application that serves as a digital marketplace for logistics services in India. The platform enables businesses and individuals to post shipment requirements, receive quotes from verified transporters, manage bookings, and track deliveries.

**Key Features:**
- Multi-role user management (Customer, Driver, Admin, SuperAdmin)
- Load posting and management system
- Quote/bidding system for transporters
- Secure payment processing with dynamic fee calculation
- Order lifecycle management with status tracking
- Responsive web design for desktop and mobile devices

**System Boundaries:**
- The system operates as a web-based platform accessible via modern web browsers
- Backend services are deployed on cloud infrastructure (Vercel)
- Database is hosted on MongoDB Atlas
- Payment processing is handled through Razorpay payment gateway

---

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|------------|
| SRS | Software Requirements Specification |
| API | Application Programming Interface |
| UI | User Interface |
| DB | Database |
| JWT | JSON Web Token - Used for secure authentication |
| OAuth | Open Authorization - Standard for token-based authentication |
| CRUD | Create, Read, Update, Delete operations |
| REST | Representational State Transfer - API architecture style |
| MT | Metric Ton - Unit of weight measurement |
| INR | Indian Rupee - Currency |
| GPS | Global Positioning System |
| OTP | One-Time Password |
| Load | Shipment or cargo that needs to be transported |
| Quote | Price bid submitted by a transporter for a load |
| Transporter | Driver or trucking company providing transport services |
| Shipper | Customer who needs goods transported |
| Admin | Platform administrator with management privileges |
| SuperAdmin | Highest privilege administrator with full system access |

---

### 1.4 References

| Document/Resource | Description |
|-------------------|-------------|
| MongoDB Documentation | https://docs.mongodb.com/ - Database reference |
| Express.js Documentation | https://expressjs.com/ - Backend framework reference |
| React Documentation | https://react.dev/ - Frontend framework reference |
| Razorpay API Documentation | https://razorpay.com/docs/ - Payment gateway integration |
| Vite Documentation | https://vitejs.dev/ - Build tool documentation |
| TailwindCSS Documentation | https://tailwindcss.com/ - CSS framework reference |
| Passport.js Documentation | http://www.passportjs.org/ - Authentication middleware |
| JWT.io | https://jwt.io/ - JSON Web Token reference |

---

### 1.5 Overview

This SRS document is organized as follows:

- **Section 1 (Introduction):** Provides an overview of the document purpose, product scope, definitions, and references.

- **Section 2 (General Description):** Describes the product perspective, major functions, user characteristics, constraints, and dependencies.

- **Section 3 (Specific Requirements):** Details all functional and non-functional requirements including external interfaces, user interfaces, and system capabilities.

- **Section 4 (Analysis Models):** Presents data flow diagrams and system architecture models.

- **Sections 5-11:** Contains project links, deployment information, and client documentation.

- **Appendices:** Includes supplementary information and technical details.

---

## 2. General Description

### 2.1 Product Perspective

TruckSuvidha is a standalone web-based logistics platform that operates independently while integrating with third-party services for specific functionalities.

**System Architecture:**

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  React 18 + Vite Frontend (SPA)                         │    │
│  │  - TailwindCSS for styling                              │    │
│  │  - React Router for navigation                          │    │
│  │  - Framer Motion for animations                         │    │
│  │  - TanStack React Query for data fetching               │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS (REST API)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SERVER LAYER                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Node.js + Express.js Backend                           │    │
│  │  - JWT Authentication                                   │    │
│  │  - Passport.js (Google OAuth)                           │    │
│  │  - RESTful API endpoints                                │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  MongoDB Atlas  │  │    Razorpay     │  │  Google OAuth   │
│   (Database)    │  │   (Payments)    │  │ (Authentication)│
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Third-Party Integrations:**
1. **MongoDB Atlas:** Cloud-hosted NoSQL database for data persistence
2. **Razorpay:** Payment gateway for secure transaction processing
3. **Google OAuth 2.0:** Social login authentication
4. **Vercel:** Cloud deployment platform

---

### 2.2 Product Functions

The TruckSuvidha platform provides the following major functions:

#### 2.2.1 User Management
- User registration with email/password or Google OAuth
- User authentication and authorization
- Profile management (name, avatar, password)
- Role-based access control (Customer, Driver, Admin, SuperAdmin)
- OTP-based password recovery

#### 2.2.2 Load Management
- Post new loads with detailed specifications
  - Load type (Full/Part load)
  - Source and destination cities
  - Material type and weight
  - Truck type requirements
  - Scheduled pickup date
  - Contact information
- View, edit, and cancel posted loads
- Load status tracking throughout lifecycle

#### 2.2.3 Quote/Bidding System
- Drivers can browse available loads
- Submit quotes/bids on open loads
- Quote includes price, estimated delivery time, and message
- Load owners can accept or reject quotes
- Automatic driver assignment upon quote acceptance

#### 2.2.4 Order Lifecycle Management
- Status progression: Open → Quoted → Assigned → Picked Up → In Transit → Delivered → Completed
- Status update notifications
- Cancellation handling with reason tracking

#### 2.2.5 Payment Processing
- Dynamic booking fee calculation based on:
  - Base fee (₹99)
  - Weight-based fee
  - Material type fee
  - Truck type fee
- Razorpay order creation and verification
- Payment history tracking
- Transparent fee breakdown display

#### 2.2.6 Administrative Functions
- User management (view, edit roles, delete)
- Load management (view all, update status, assign drivers)
- Truck management (add, edit, delete trucks)
- Social media link management
- Contact page content management (SuperAdmin only)

#### 2.2.7 Platform Features
- Responsive design for all devices
- Dynamic landing page with animations
- Demo mode for feature exploration
- Contact page with inquiry submission

---

### 2.3 User Characteristics

The TruckSuvidha platform serves multiple user categories with varying levels of technical expertise:

| User Type | Description | Technical Expertise | Primary Tasks |
|-----------|-------------|---------------------|---------------|
| **Guest** | Unregistered visitors | Basic internet skills | View landing page, browse platform features, register/login |
| **Customer (Shipper)** | Businesses or individuals needing freight transport | Basic to intermediate computer skills, familiar with online transactions | Post loads, review quotes, accept bids, make payments, track orders |
| **Driver (Transporter)** | Truck owners, drivers, or transport companies | Basic computer skills, may use mobile devices primarily | Browse loads, submit quotes, update delivery status, manage assignments |
| **Admin** | Platform administrators | Intermediate technical knowledge | Manage users, loads, trucks, social media content |
| **SuperAdmin** | System administrators with full access | Advanced technical knowledge | All admin functions plus contact page editing, system configuration |

**User Demographics:**
- Primary users are logistics operators in India
- Age range typically 25-55 years
- Mix of urban and rural users
- May have varying levels of English proficiency (platform supports English with Hindi labels for truck sizes)

---

### 2.4 General Constraints

#### 2.4.1 Hardware Constraints
- Users require a device capable of running a modern web browser
- Minimum screen resolution: 320px width (mobile responsive)
- Internet connectivity required for all operations

#### 2.4.2 Software Constraints
- **Frontend Browser Support:**
  - Google Chrome (v90+)
  - Mozilla Firefox (v88+)
  - Microsoft Edge (v90+)
  - Safari (v14+)
- JavaScript must be enabled in the browser

#### 2.4.3 Regulatory/Policy Constraints
- Must comply with Indian data protection regulations
- Payment processing must comply with RBI guidelines
- GST compliance for commercial transactions

#### 2.4.4 Security Constraints
- All sensitive data must be encrypted in transit (HTTPS)
- Passwords must be hashed using bcrypt
- JWT tokens expire after 24 hours
- Session cookies are HTTP-only in production

#### 2.4.5 Operational Constraints
- Database hosted on MongoDB Atlas free/shared tier initially
- Vercel deployment with serverless function limitations
- Razorpay transaction limits based on account type

---

### 2.5 Assumptions and Dependencies

#### Assumptions
1. Users have access to a stable internet connection
2. Users have valid email addresses for registration
3. Razorpay API keys and credentials are properly configured
4. MongoDB Atlas cluster is operational and accessible
5. Google OAuth credentials are valid for social login
6. Users understand basic logistics terminology
7. Payment transactions are in Indian Rupees (INR)

#### Dependencies
| Dependency | Type | Impact if Changed |
|------------|------|-------------------|
| MongoDB Atlas | Database Service | Complete data storage functionality affected |
| Razorpay | Payment Gateway | Payment processing disabled |
| Google OAuth | Authentication Service | Social login functionality unavailable |
| Vercel | Hosting Platform | Application unavailable if service down |
| Node.js (v18+) | Runtime Environment | Backend requires Node.js runtime |
| npm | Package Manager | Dependency installation impacted |

---

## 3. Specific Requirements

### 3.1 External Interface Requirements

#### 3.1.1 User Interfaces

**General UI Requirements:**
- Responsive design supporting screens from 320px to 2560px width
- Dark/light theme compatibility
- Consistent navigation across all pages
- Loading states and error messages for all async operations
- Accessible form controls with proper labeling

**Page Interfaces:**

| Page | Description | Key UI Elements |
|------|-------------|-----------------|
| Landing Page | Public homepage with platform introduction | Hero section, animated sections, feature highlights, CTA buttons |
| Login Page | User authentication interface | Email/password fields, Google OAuth button, forgot password link |
| Register Page | New user registration | Form with name, email, password, role selection, Google OAuth option |
| Load Board | List of available loads | Filterable/searchable load cards, status indicators |
| Post Load | Load creation form | Multi-field form with validation, fee calculator, payment integration |
| Load Details | Individual load information | Load specs, quotes list, status timeline, action buttons |
| Truck Board | Available trucks display | Truck cards with specifications and photos |
| Profile Page | User profile management | Avatar upload, name editing, password change |
| Admin Dashboards | Administrative interfaces | Data tables, CRUD operations, bulk actions |
| Contact Page | Contact information and inquiry form | Contact details, inquiry form, social media links |
| Demo Page | Interactive feature demonstration | Step-by-step animated workflow demos |

#### 3.1.2 Hardware Interfaces

The TruckSuvidha platform is a web-based application and does not directly interface with hardware components. However, the following hardware considerations apply:

- **Client Devices:** The platform supports access from desktops, laptops, tablets, and smartphones
- **Camera Access:** Required for avatar photo upload functionality (browser permission)
- **Touch Input:** Full support for touch devices (mobile/tablet)

#### 3.1.3 Software Interfaces

| Interface | Description | Protocol/Format |
|-----------|-------------|-----------------|
| **MongoDB Atlas** | Cloud database for data persistence | MongoDB Wire Protocol / BSON |
| **Razorpay API** | Payment order creation and verification | REST API / JSON |
| **Google OAuth 2.0** | Social authentication | OAuth 2.0 / JWT |
| **Email Service (Nodemailer)** | OTP delivery for password reset | SMTP |

**API Endpoints Structure:**

```
Base URL: /api

Authentication:
- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- GET /auth/google - Google OAuth initiation
- GET /auth/google/callback - Google OAuth callback

Users:
- GET /api/users - List all users (Admin)
- GET /api/users/profile - Get current user profile
- PUT /api/users/profile - Update profile
- PUT /api/users/password - Change password
- PUT /api/users/avatar - Update avatar
- PUT /api/users/:id - Update user (Admin)
- DELETE /api/users/:id - Delete user (Admin)

Loads:
- GET /api/loads - List all loads
- GET /api/loads/:id - Get load details
- POST /api/loads - Create new load
- PUT /api/loads/:id - Update load
- PUT /api/loads/:id/status - Update load status
- PUT /api/loads/:id/cancel - Cancel load
- PUT /api/loads/:id/assign - Assign driver
- DELETE /api/loads/:id - Delete load

Quotes:
- GET /api/quotes/load/:loadId - Get quotes for a load
- GET /api/quotes/my - Get user's quotes
- POST /api/quotes - Submit quote
- PUT /api/quotes/:id/accept - Accept quote
- PUT /api/quotes/:id/reject - Reject quote
- DELETE /api/quotes/:id - Withdraw quote

Payments:
- POST /api/payments/calculate-fee - Calculate booking fee
- POST /api/payments/create-order - Create Razorpay order
- POST /api/payments/verify - Verify payment
- GET /api/payments/history - Get payment history
- GET /api/payments/:id - Get payment details

Trucks:
- GET /api/trucks - List all trucks
- POST /api/trucks - Add truck
- PUT /api/trucks/:id - Update truck
- DELETE /api/trucks/:id - Delete truck

OTP:
- POST /api/otp/send - Send OTP
- POST /api/otp/verify - Verify OTP
- POST /api/otp/reset-password - Reset password with OTP

Social Media:
- GET /api/social-media - Get social media links
- PUT /api/social-media - Update social media links

Contact:
- GET /api/contact - Get contact information
- PUT /api/contact - Update contact information
- POST /api/contact/inquiry - Submit inquiry
```

#### 3.1.4 Communications Interfaces

| Communication Type | Protocol | Description |
|--------------------|----------|-------------|
| Client-Server | HTTPS (TLS 1.2+) | All API communications are encrypted |
| API Requests | REST over HTTPS | JSON request/response format |
| WebSocket | Not implemented | Future enhancement for real-time updates |
| Email | SMTP (TLS) | OTP delivery via Nodemailer |

**CORS Configuration:**
- Origin: Frontend URL (production/development)
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: Content-Type, Authorization
- Credentials: Enabled

---

### 3.2 Functional Requirements

#### 3.2.1 User Registration and Authentication

##### 3.2.1.1 Introduction
The system shall provide secure user registration and authentication mechanisms, supporting both traditional email/password and Google OAuth social login methods.

##### 3.2.1.2 Inputs
- **Email Registration:**
  - Email address (required, valid email format)
  - Password (required, minimum security requirements)
  - Name (required)
  - Role selection (customer/driver)
  
- **Google OAuth:**
  - Google account credentials (handled by Google)
  - Role selection (first-time users)

##### 3.2.1.3 Processing
1. **Email Registration:**
   - Validate email format and uniqueness
   - Hash password using bcrypt (10 rounds)
   - Create user document in MongoDB
   - Return success response with user ID

2. **Login:**
   - Verify email exists in database
   - Compare password hash
   - Generate JWT token (24-hour expiry)
   - Return token and user details

3. **Google OAuth:**
   - Redirect to Google consent screen
   - Receive authorization code
   - Exchange for access token
   - Retrieve user profile from Google
   - Create/update user in database
   - Generate JWT token

##### 3.2.1.4 Outputs
- **Success:** JWT token, user object (id, email, name, role, avatar)
- **Failure:** Error message with appropriate HTTP status code

##### 3.2.1.5 Error Handling
| Error Condition | Response |
|-----------------|----------|
| Invalid email format | 400 - "Invalid email format" |
| Email already exists | 409 - "Email already in use" |
| Missing required fields | 400 - "Email and password required" |
| Invalid credentials | 401 - "Invalid credentials" |
| Google OAuth failure | Redirect to login with error |

---

#### 3.2.2 Load Posting

##### 3.2.2.1 Introduction
Customers can post shipment requirements (loads) specifying details about the cargo, pickup/delivery locations, and transportation needs. A booking fee is collected via Razorpay before the load is published.

##### 3.2.2.2 Inputs
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| type | String | Yes | "full" or "part" load |
| sourceCity | String | Yes | Pickup city |
| destinationCity | String | Yes | Delivery city |
| material | String | Yes | Type of cargo |
| weightMT | Number | No | Weight in metric tons |
| truckType | String | No | Required truck type/size |
| trucksRequired | Number | No | Number of trucks needed (default: 1) |
| scheduledDate | Date | Yes | Pickup date |
| pickupAddress | String | No | Detailed pickup address |
| deliveryAddress | String | No | Detailed delivery address |
| contactPhone | String | No | Contact number |
| notes | String | No | Additional instructions |

##### 3.2.2.3 Processing
1. Calculate booking fee based on load parameters:
   - Base fee: ₹99
   - Weight fee: ₹10 per MT (max ₹200)
   - Material fee: ₹50-200 based on type
   - Truck type fee: ₹50-300 based on size
   - Maximum total: ₹1000

2. Create Razorpay order with calculated amount
3. Display payment modal to user
4. On payment success:
   - Verify Razorpay signature
   - Create load document with status "open"
   - Link payment record to load
5. Return load details

##### 3.2.2.4 Outputs
- **Success:** Load object with ID, status, and all details
- **Payment Record:** Payment ID, amount, fee breakdown

##### 3.2.2.5 Error Handling
| Error Condition | Response |
|-----------------|----------|
| Missing required fields | 400 - "Missing required fields" |
| Invalid date (past) | 400 - "Scheduled date must be in future" |
| Payment creation failed | 500 - "Failed to create payment order" |
| Payment verification failed | 400 - "Payment verification failed" |
| Database error | 500 - Internal server error |

---

#### 3.2.3 Quote/Bidding System

##### 3.2.3.1 Introduction
Drivers can submit quotes (bids) on available loads. Load owners can review, accept, or reject quotes. Accepting a quote automatically assigns the driver to the load.

##### 3.2.3.2 Inputs
**Quote Submission:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| loadId | ObjectId | Yes | Target load ID |
| amount | Number | Yes | Quote amount in INR |
| message | String | No | Message to load owner |
| estimatedDeliveryDays | Number | No | Estimated delivery time |

##### 3.2.3.3 Processing
1. **Submit Quote:**
   - Verify user is a driver
   - Verify load exists and is open/quoted
   - Check user hasn't already quoted
   - Create quote document
   - Update load status to "quoted" if first quote

2. **Accept Quote:**
   - Verify user owns the load or is admin
   - Update quote status to "accepted"
   - Reject all other pending quotes
   - Assign driver to load
   - Update load status to "assigned"

3. **Reject Quote:**
   - Verify user owns the load or is admin
   - Update quote status to "rejected"

##### 3.2.3.4 Outputs
- Quote object with transporter details
- Updated load object (on acceptance)

##### 3.2.3.5 Error Handling
| Error Condition | Response |
|-----------------|----------|
| Non-driver submitting quote | 403 - "Only drivers can submit quotes" |
| Duplicate quote | 409 - "Already submitted a quote" |
| Load not accepting quotes | 400 - "Load no longer accepting quotes" |
| Quoting on own load | 403 - "Cannot quote on your own load" |

---

#### 3.2.4 Order Status Management

##### 3.2.4.1 Introduction
The system tracks load status throughout the delivery lifecycle, allowing appropriate users to update status at each stage.

##### 3.2.4.2 Inputs
| Field | Type | Description |
|-------|------|-------------|
| status | String | New status value |
| note | String | Optional status change note |

**Valid Status Transitions:**
```
open → quoted → assigned → picked_up → in_transit → delivered → completed
                    ↓
                cancelled (from open, quoted, assigned)
```

##### 3.2.4.3 Processing
1. Validate user has permission to update status
2. Validate status transition is allowed
3. Add entry to statusHistory array
4. Update current status
5. Return updated load

##### 3.2.4.4 Outputs
- Updated load object with new status
- Status history record

##### 3.2.4.5 Error Handling
| Error Condition | Response |
|-----------------|----------|
| Invalid status | 400 - "Invalid status value" |
| Unauthorized update | 403 - "Not authorized to update status" |
| Invalid transition | 400 - "Invalid status transition" |

---

#### 3.2.5 Payment Processing

##### 3.2.5.1 Introduction
The system integrates with Razorpay for secure payment processing, calculating dynamic booking fees and handling payment verification.

##### 3.2.5.2 Inputs
**Fee Calculation:**
- Load details (type, weight, material, truck type)

**Payment Verification:**
- razorpay_order_id
- razorpay_payment_id
- razorpay_signature

##### 3.2.5.3 Processing
1. **Fee Calculation:**
   ```
   baseFee = 99
   weightFee = min(weightMT * 10, 200)
   materialFee = based on material type (50-200)
   truckTypeFee = based on truck size (50-300)
   totalFee = min(baseFee + weightFee + materialFee + truckTypeFee, 1000)
   ```

2. **Order Creation:**
   - Calculate total fee
   - Create Razorpay order
   - Store payment record with status "created"

3. **Payment Verification:**
   - Verify Razorpay signature using HMAC SHA256
   - Update payment status to "captured"
   - Create associated load
   - Link payment to load

##### 3.2.5.4 Outputs
- Fee breakdown object
- Razorpay order details
- Payment confirmation with load ID

##### 3.2.5.5 Error Handling
| Error Condition | Response |
|-----------------|----------|
| Razorpay not configured | 500 - "Payment system not configured" |
| Invalid signature | 400 - "Payment verification failed" |
| Order not found | 404 - "Payment order not found" |

---

#### 3.2.6 User Profile Management

##### 3.2.6.1 Introduction
Users can view and update their profile information, including name, avatar, and password.

##### 3.2.6.2 Inputs
**Profile Update:**
- name (optional)

**Password Update:**
- currentPassword (required for existing password)
- newPassword (required)

**Avatar Update:**
- Base64 encoded image data

##### 3.2.6.3 Processing
1. Verify user authentication
2. Validate input data
3. Update user document
4. For password: hash new password with bcrypt
5. Generate new JWT with updated info if needed

##### 3.2.6.4 Outputs
- Updated user object
- New JWT token (for name changes)

##### 3.2.6.5 Error Handling
| Error Condition | Response |
|-----------------|----------|
| Invalid current password | 401 - "Current password is incorrect" |
| User not found | 404 - "User not found" |
| Invalid image data | 400 - "Invalid image data" |

---

#### 3.2.7 Administrative Functions

##### 3.2.7.1 Introduction
Admin and SuperAdmin users have access to platform management functions including user management, load management, truck management, and content management.

##### 3.2.7.2 Inputs
Varies by function - includes user IDs, load IDs, update data, etc.

##### 3.2.7.3 Processing
**User Management:**
- List all users with pagination
- Update user roles
- Delete user accounts

**Load Management:**
- View all loads with filtering
- Update load status
- Assign drivers to loads
- Delete loads

**Truck Management:**
- CRUD operations on trucks
- Update truck availability status

**Content Management (SuperAdmin):**
- Update contact page information
- Manage social media links

##### 3.2.7.4 Outputs
- Success/failure responses
- Updated data objects

##### 3.2.7.5 Error Handling
| Error Condition | Response |
|-----------------|----------|
| Insufficient permissions | 403 - "Admin access required" |
| Resource not found | 404 - "Resource not found" |
| Cannot delete self | 400 - "Cannot delete your own account" |

---

### 3.5 Non-Functional Requirements

#### 3.5.1 Performance

| Metric | Requirement |
|--------|-------------|
| API Response Time | 95% of requests < 500ms |
| Page Load Time | Initial load < 3 seconds on 3G |
| Database Query Time | Average < 100ms |
| Concurrent Users | Support 100+ simultaneous users |
| Payment Processing | Complete within 5 seconds |

#### 3.5.2 Reliability

| Metric | Requirement |
|--------|-------------|
| System Uptime | 99% availability (excluding scheduled maintenance) |
| Data Integrity | Zero data loss for completed transactions |
| Error Rate | < 0.1% for critical operations |
| Recovery Time | < 30 minutes for critical failures |
| Data Backup | Daily automated backups (MongoDB Atlas) |

#### 3.5.3 Availability

| Metric | Requirement |
|--------|-------------|
| Service Hours | 24/7 availability |
| Planned Downtime | Maximum 4 hours/month with advance notice |
| Geographic Availability | Accessible from all Indian states |
| CDN | Static assets served via Vercel Edge Network |

#### 3.5.4 Security

| Requirement | Implementation |
|-------------|----------------|
| Data Encryption | TLS 1.2+ for all communications |
| Password Storage | bcrypt hashing with salt (10 rounds) |
| Authentication | JWT tokens with 24-hour expiry |
| Authorization | Role-based access control (RBAC) |
| Input Validation | Server-side validation for all inputs |
| SQL Injection | N/A (NoSQL - but proper input sanitization) |
| XSS Protection | React's built-in XSS protection |
| CSRF Protection | SameSite cookies, token-based auth |
| Session Management | Secure, HTTP-only cookies in production |

#### 3.5.5 Maintainability

| Aspect | Requirement |
|--------|-------------|
| Code Documentation | JSDoc comments for all functions |
| Code Organization | Modular architecture (MVC pattern) |
| Version Control | Git with meaningful commit messages |
| API Documentation | Self-documenting endpoint structure |
| Error Logging | Console logging for debugging |
| Environment Config | Environment variables for all secrets |

#### 3.5.6 Portability

| Aspect | Requirement |
|--------|-------------|
| Browser Support | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| Mobile Responsiveness | Full functionality on screens 320px+ |
| Deployment | Containerizable for any Node.js hosting |
| Database | MongoDB (any MongoDB-compatible service) |
| OS Independence | Platform-agnostic (web-based) |

---

### 3.7 Design Constraints

1. **Technology Stack:**
   - Frontend must use React 18 with Vite
   - Backend must use Node.js with Express.js
   - Database must be MongoDB
   - Payment gateway fixed to Razorpay

2. **Deployment:**
   - Must be deployable on Vercel platform
   - Serverless function timeout: 10 seconds
   - Maximum request payload: 10MB

3. **Authentication:**
   - Must support Google OAuth 2.0
   - JWT must be used for session management

4. **Currency:**
   - All monetary values in Indian Rupees (INR)
   - Payment amounts in paise (smallest unit)

5. **Language:**
   - Primary UI language: English
   - Truck sizes include Hindi translations

---

### 3.9 Other Requirements

1. **Internationalization:**
   - Date formats: Indian standard (DD-MM-YYYY)
   - Currency format: ₹X,XX,XXX.XX (Indian numbering)

2. **Accessibility:**
   - Semantic HTML structure
   - ARIA labels for interactive elements
   - Keyboard navigation support

3. **SEO:**
   - Proper meta tags on all pages
   - Semantic heading structure
   - Descriptive page titles

4. **Analytics:**
   - Ready for Google Analytics integration
   - Event tracking for key user actions

---

## 4. Analysis Models

### 4.1 Data Flow Diagrams (DFD)

#### Level 0 - Context Diagram

```
                                    ┌─────────────────────┐
                                    │                     │
     ┌──────────────┐               │                     │               ┌──────────────┐
     │   Customer   │◄──────────────│                     │──────────────►│    Driver    │
     │  (Shipper)   │               │    TruckSuvidha     │               │ (Transporter)│
     └──────────────┘               │      Platform       │               └──────────────┘
           │                        │                     │                     │
           │ Post Loads             │                     │         Browse Loads│
           │ Make Payments          │                     │         Submit Quotes
           │ Track Orders           │                     │         Update Status
           │                        │                     │                     │
           ▼                        │                     │                     ▼
     ┌──────────────┐               │                     │               ┌──────────────┐
     │   Razorpay   │◄──────────────│                     │──────────────►│    Admin     │
     │   (Payments) │               │                     │               │  (Management)│
     └──────────────┘               └─────────────────────┘               └──────────────┘
                                              │
                                              │
                                              ▼
                                    ┌─────────────────────┐
                                    │   MongoDB Atlas     │
                                    │    (Database)       │
                                    └─────────────────────┘
```

#### Level 1 - System DFD

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    TruckSuvidha System                                   │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐     ┌────────────┐ │
│  │     1.0      │     │       2.0        │     │       3.0        │     │    4.0     │ │
│  │    User      │────►│      Load        │────►│      Quote       │────►│   Order    │ │
│  │ Management   │     │   Management     │     │   Management     │     │  Tracking  │ │
│  └──────────────┘     └──────────────────┘     └──────────────────┘     └────────────┘ │
│         │                      │                        │                      │        │
│         ▼                      ▼                        ▼                      ▼        │
│  ┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐     ┌────────────┐ │
│  │   D1: User   │     │    D2: Load      │     │    D3: Quote     │     │ D4: Status │ │
│  │    Store     │     │     Store        │     │     Store        │     │   History  │ │
│  └──────────────┘     └──────────────────┘     └──────────────────┘     └────────────┘ │
│                                │                                                        │
│                                ▼                                                        │
│                       ┌──────────────────┐                                              │
│                       │       5.0        │                                              │
│                       │     Payment      │◄───────────────────────────────────────┐     │
│                       │   Processing     │                                        │     │
│                       └──────────────────┘                                        │     │
│                                │                                                  │     │
│                                ▼                                                  │     │
│                       ┌──────────────────┐                              ┌─────────┴───┐ │
│                       │   D5: Payment    │                              │   Razorpay  │ │
│                       │     Store        │                              │     API     │ │
│                       └──────────────────┘                              └─────────────┘ │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Entity Relationship Diagram (ERD)

```
┌─────────────────┐     1:N     ┌─────────────────┐     1:N     ┌─────────────────┐
│      User       │─────────────│      Load       │─────────────│      Quote      │
├─────────────────┤             ├─────────────────┤             ├─────────────────┤
│ _id (PK)        │             │ _id (PK)        │             │ _id (PK)        │
│ email           │             │ type            │             │ load (FK)       │
│ passwordHash    │             │ sourceCity      │             │ transporter(FK) │
│ name            │             │ destinationCity │             │ amount          │
│ role            │             │ material        │             │ message         │
│ googleId        │             │ weightMT        │             │ estimatedDays   │
│ avatar          │             │ truckType       │             │ status          │
│ authProvider    │             │ trucksRequired  │             │ createdAt       │
│ createdAt       │             │ scheduledDate   │             │ respondedAt     │
└─────────────────┘             │ status          │             └─────────────────┘
        │                       │ postedBy (FK)   │
        │                       │ assignedTo (FK) │
        │                       │ paymentId (FK)  │
        │                       │ statusHistory   │
        │                       │ createdAt       │
        │                       └─────────────────┘
        │                               │
        │     1:N                       │ 1:1
        ▼                               ▼
┌─────────────────┐             ┌─────────────────┐
│     Truck       │             │    Payment      │
├─────────────────┤             ├─────────────────┤
│ _id (PK)        │             │ _id (PK)        │
│ plateNumber     │             │ razorpayOrderId │
│ model           │             │ razorpayPaymentId│
│ capacityWeight  │             │ razorpaySignature│
│ truckSize       │             │ amount          │
│ gpsAvailable    │             │ currency        │
│ truckPhoto      │             │ status          │
│ currentLocation │             │ feeBreakdown    │
│ status          │             │ loadDetails     │
│ createdAt       │             │ userId (FK)     │
└─────────────────┘             │ loadId (FK)     │
                                │ createdAt       │
                                │ paidAt          │
                                └─────────────────┘
```

---

## 5. GitHub Link

**Repository URL:** [TODO: Add GitHub Repository Link]

```
https://github.com/[username]/Truck-Booking
```

---

## 6. Deployed Link

**Live Application URL:** [TODO: Add Deployed Application Link]

```
https://somya-truck-booking.vercel.app
```

---

## 7. Client Approval Proof

[TODO: Add client approval documentation, screenshots, or signed approval documents]

---

## 8. Client Location Proof

[TODO: Add client location proof - may include business address, registration documents, or meeting location details]

---

## 9. Transaction ID Proof

[TODO: Add transaction ID proof from payment gateway or bank transfers related to the project]

---

## 10. Email Acknowledgement

[TODO: Add email acknowledgement screenshots or correspondence with the client regarding project approval and acceptance]

---

## 11. GST No.

[TODO: Add GST Number if applicable]

**GST Number:** 

---

## A. Appendices

### A.1 Appendix 1 - Technology Stack Details

**Frontend Technologies:**
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI library |
| Vite | 5.4.10 | Build tool |
| TailwindCSS | 3.4.17 | CSS framework |
| React Router | 6.26.2 | Client-side routing |
| Framer Motion | 12.23.26 | Animations |
| TanStack React Query | 5.56.2 | Data fetching |
| Axios | 1.7.7 | HTTP client |
| Lucide React | 0.562.0 | Icons |
| React Easy Crop | 5.5.6 | Image cropping |
| JWT Decode | 4.0.0 | Token parsing |

**Backend Technologies:**
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express | 4.19.2 | Web framework |
| Mongoose | 9.0.2 | MongoDB ODM |
| Passport | 0.7.0 | Authentication |
| passport-google-oauth20 | 2.0.0 | Google OAuth |
| JWT | 9.0.2 | Token generation |
| bcryptjs | 2.4.3 | Password hashing |
| Razorpay | 2.9.6 | Payment processing |
| Nodemailer | 7.0.12 | Email sending |
| Multer | 2.0.2 | File uploads |

---

### A.2 Appendix 2 - User Role Permissions Matrix

| Feature/Action | Guest | Customer | Driver | Admin | SuperAdmin |
|----------------|-------|----------|--------|-------|------------|
| View Landing Page | ✅ | ✅ | ✅ | ✅ | ✅ |
| Register/Login | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Profile | ❌ | ✅ | ✅ | ✅ | ✅ |
| Edit Profile | ❌ | ✅ | ✅ | ✅ | ✅ |
| Post Load | ❌ | ✅ | ❌ | ✅ | ✅ |
| View Load Board | ❌ | ✅ | ✅ | ✅ | ✅ |
| Submit Quote | ❌ | ❌ | ✅ | ✅ | ✅ |
| Accept/Reject Quotes | ❌ | ✅ (own) | ❌ | ✅ | ✅ |
| Update Load Status | ❌ | ❌ | ✅ (assigned) | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage All Loads | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage Trucks | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage Social Media | ❌ | ❌ | ❌ | ✅ | ✅ |
| Edit Contact Page | ❌ | ❌ | ❌ | ❌ | ✅ |

---

**Document Version:** 1.0  
**Last Updated:** December 25, 2024  
**Prepared By:** Development Team  
**Project:** TruckSuvidha - Truck Booking Platform
