# 🚀 ShopHub Backend API

A robust and scalable REST API backend for the ShopHub e-commerce platform. Built with Node.js, Express.js, and MongoDB, this API provides comprehensive e-commerce functionality including user authentication, product management, order processing, and payment integration.

## Frontend-Repo => https://github.com/RahulGurav82/Ecommerce-Frontend


## 🌟 Features

### 🔐 Authentication & Authorization
- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: bcryptjs for secure password hashing
- **Role-based Access**: Admin and customer role management
- **Cookie Management**: Secure HTTP-only cookie handling

### 🛍️ Product Management
- **CRUD Operations**: Complete product lifecycle management
- **Image Upload**: Cloudinary integration for product images
- **Category Management**: Organize products by categories
- **Inventory Tracking**: Real-time stock management
- **Search & Filtering**: Advanced product search capabilities

### 🛒 Order Management
- **Order Processing**: Complete order lifecycle management
- **Order Tracking**: Real-time order status updates
- **Order History**: Customer order history and details
- **Admin Dashboard**: Order management for administrators

### 💳 Payment Integration
- **Razorpay Integration**: Secure payment processing with Razorpay
- **PayPal Integration**: Alternative payment method with PayPal SDK
- **Payment Verification**: Secure payment verification and webhooks
- **Transaction Management**: Complete payment transaction handling

### 👥 User Management
- **User Registration**: Secure user account creation
- **Profile Management**: User profile updates and management
- **Address Management**: Multiple shipping addresses per user
- **User Reviews**: Product rating and review system

### 📊 Additional Features
- **File Upload**: Multer for handling file uploads
- **Image Processing**: Cloudinary for image optimization and storage
- **CORS Support**: Cross-origin resource sharing configuration
- **Environment Configuration**: Secure environment variable management

## 🛠️ Tech Stack

### Core Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js 5** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token for authentication

### Payment Processing
- **Razorpay** - Primary payment gateway integration

### Security & Utilities
- **bcryptjs** - Password hashing and encryption
- **CORS** - Cross-origin resource sharing
- **cookie-parser** - HTTP cookie parsing middleware
- **crypto** - Cryptographic functionality

### File Management
- **Multer** - Multipart/form-data handling for file uploads
- **Cloudinary** - Cloud-based image and video management

### Development Tools
- **Nodemon** - Development server with auto-restart
- **dotenv** - Environment variable management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account
- Razorpay account
- PayPal Developer account (optional)

### Clone the Repository
```bash
git clone https://github.com/RahulGurav82/Ecommerce-Backend
cd Ecommerce-Backend
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/shophub
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shophub

# JWT Configuration
CLIENT_SECRET_KEY

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Run Development Server
```bash
npm run dev
# or
nodemon server.js
```

The API will be available at `http://localhost:5000`

## 📁 Project Structure

```
server/
├── controllers/         # Route controllers
│   ├── auth.js         # Authentication controllers
│   ├── products.js     # Product management
│   ├── orders.js       # Order processing
│   ├── users.js        # User management
│   └── payments.js     # Payment processing
├── models/             # Mongoose models
│   ├── User.js         # User schema
│   ├── Product.js      # Product schema
│   ├── Order.js        # Order schema
│   └── Review.js       # Review schema
├── routes/             # API routes
│   ├── auth.js         # Authentication routes
│   ├── products.js     # Product routes
│   ├── orders.js       # Order routes
│   ├── users.js        # User routes
│   └── payments.js     # Payment routes
├── middleware/         # Custom middleware
│   ├── auth.js         # JWT authentication
│   ├── admin.js        # Admin authorization
│   └── upload.js       # File upload handling
├── utils/              # Utility functions
│   ├── cloudinary.js   # Cloudinary configuration
│   ├── razorpay.js     # Razorpay setup
│   └── paypal.js       # PayPal configuration
├── config/             # Configuration files
│   └── database.js     # MongoDB connection
└── server.js           # Main server file
```

## 🛣️ API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check-auth` - Verify authentication

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/admin/products` - Create product (Admin)
- `PUT /api/admin/products/:id` - Update product (Admin)
- `DELETE /api/admin/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `GET /api/admin/orders` - Get all orders (Admin)
- `PUT /api/admin/orders/:id` - Update order status (Admin)

### Payments
- `POST /api/payments/razorpay/create-order` - Create Razorpay order
- `POST /api/payments/razorpay/verify` - Verify Razorpay payment
- `POST /api/payments/paypal/create-order` - Create PayPal order
- `POST /api/payments/paypal/capture-order` - Capture PayPal payment

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/admin/users` - Get all users (Admin)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **CORS Configuration**: Controlled cross-origin access
- **Environment Variables**: Sensitive data protection
- **Input Validation**: Request data validation and sanitization
- **Role-based Access**: Admin and user role separation

## 💳 Payment Integration

### Razorpay Features
- Order creation and management
- Payment verification with webhooks
- Refund processing
- Multiple payment methods (UPI, Cards, Net Banking)


## 📊 Database Schema

### User Model
- Personal information and credentials
- Address management
- Order history references
- Role-based permissions

### Product Model
- Product details and specifications
- Category and pricing information
- Inventory management
- Image URLs and metadata

### Order Model
- Order items and quantities
- Customer and shipping information
- Payment and order status
- Timestamps and tracking

## 🚀 Deployment

### Environment Setup
- Set `NODE_ENV=production`
- Configure production database URL
- Set up production payment gateway credentials
- Configure CORS for production frontend URL

## 🧪 Testing

```bash
# Add test scripts to package.json
npm test
```

## 📈 Performance Optimizations

- **Database Indexing**: Optimized MongoDB queries
- **Image Optimization**: Cloudinary automatic optimization
- **Caching**: Strategic caching implementation
- **Pagination**: Efficient data pagination
- **Connection Pooling**: MongoDB connection optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Express.js** for the robust web framework
- **MongoDB** for flexible data storage
- **Razorpay** for seamless payment processing
- **Cloudinary** for efficient image management
- **PayPal** for additional payment options

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the API documentation
- Review environment variable configuration
- Ensure all dependencies are properly installed

---

<div align="center">
  <p>Built with ❤️ using Node.js and modern backend technologies</p>
  <p>
    <a href="#installation--setup">Get Started</a> •
    <a href="#api-endpoints">API Docs</a> •
    <a href="#contributing">Contribute</a>
  </p>
</div>
