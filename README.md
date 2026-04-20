# Professional Portfolio

A modern, full-stack portfolio application built with Node.js, React, and MySQL. This professional-grade portfolio showcases advanced web development capabilities with a beautiful UI, smooth animations, and comprehensive content management system.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Animations**: Smooth scroll animations and micro-interactions using Framer Motion
- **Components**: Hero, About, Skills, Projects, Experience, Education, Testimonials, Contact
- **Admin Panel**: Complete content management system
- **TypeScript Ready**: Structured for easy TypeScript migration
- **SEO Optimized**: Meta tags, semantic HTML, and structured data

### Backend (Node.js/Express)
- **RESTful API**: Clean, well-documented API endpoints
- **Authentication**: JWT-based authentication with admin panel
- **Database**: MySQL with optimized queries and transactions
- **File Upload**: Multer for image and document uploads
- **Email Service**: Nodemailer for contact form notifications
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Error Handling**: Comprehensive error handling and logging

### Database (MySQL)
- **Relational Design**: Normalized schema with proper relationships
- **Seed Data**: Professional sample data included
- **Optimized**: Indexes and efficient queries
- **Scalable**: Designed for growth and performance

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MySQL** (v8.0 or higher)
- **npm** (comes with Node.js)
- **Git**

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd professional-portfolio
```

### 2. Install Dependencies

```bash
# Install all dependencies (root, backend, and frontend)
npm run install-deps

# Or install manually:
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 3. Database Setup

#### Option A: Automatic Setup (Recommended)

```bash
# Create .env file from example
cd backend
cp .env.example .env

# Edit .env with your database credentials
# Then run the setup script
npm run setup-db
```

#### Option B: Manual Setup

1. Create a MySQL database:
```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Import the database schema and seed data:
```bash
cd backend
node scripts/setupDatabase.js
```

### 4. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# File Upload Configuration
MAX_FILE_SIZE=5000000
UPLOAD_PATH=uploads/
```

## 🚀 Running the Application

### Development Mode

Start both frontend and backend concurrently:

```bash
# From the root directory
npm run dev
```

Or run them separately:

```bash
# Backend (in one terminal)
npm run server

# Frontend (in another terminal)
npm run client
```

### Production Mode

```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Admin Panel**: http://localhost:3000/admin
- **API Health Check**: http://localhost:5000/api/health

## 🔐 Default Admin Credentials

After setting up the database, you can login with:

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials in production!

## 📁 Project Structure

```
professional-portfolio/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── middleware/
│   │   ├── auth.js             # Authentication middleware
│   │   └── validation.js       # Input validation
│   ├── routes/
│   │   ├── admin.js            # Admin panel routes
│   │   ├── auth.js             # Authentication routes
│   │   ├── contact.js          # Contact form routes
│   │   └── portfolio.js        # Portfolio data routes
│   ├── scripts/
│   │   └── setupDatabase.js    # Database setup script
│   ├── uploads/                # File upload directory
│   ├── .env.example            # Environment variables template
│   ├── package.json
│   └── server.js               # Express server
├── frontend/
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # API services
│   │   ├── utils/              # Utility functions
│   │   ├── App.js              # Main App component
│   │   └── index.js            # Entry point
│   ├── package.json
│   └── tailwind.config.js      # Tailwind CSS config
├── package.json                # Root package.json
└── README.md
```

## 🎨 Customization

### Personal Information

Edit the database seed data in `backend/scripts/setupDatabase.js` or use the admin panel to update:

- Personal details (name, title, bio)
- Contact information
- Social media links
- Profile picture

### Styling

The application uses Tailwind CSS. Customize the theme in `frontend/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Adding Content

Use the admin panel at `/admin` to:
- Add/edit projects
- Update skills
- Manage experience
- Add testimonials
- Handle contact messages

## 📱 API Endpoints

### Portfolio Data
- `GET /api/portfolio/profile` - Get profile information
- `GET /api/portfolio/skills` - Get all skills
- `GET /api/portfolio/projects` - Get all projects
- `GET /api/portfolio/experience` - Get work experience
- `GET /api/portfolio/education` - Get education details
- `GET /api/portfolio/testimonials` - Get client testimonials

### Contact
- `POST /api/contact` - Send contact message

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Admin (Protected)
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `PUT /api/admin/profile` - Update profile
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

## 🚀 Deployment

### Environment Setup

1. Set production environment variables
2. Configure production database
3. Set up email service
4. Update CORS origins

### Build Process

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker Deployment (Optional)

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MySQL service is running
   - Verify .env database credentials
   - Ensure database exists

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes: `lsof -ti:5000 | xargs kill`

3. **Frontend Not Loading**
   - Check if backend is running on port 5000
   - Verify proxy configuration in frontend/package.json

4. **Email Not Working**
   - Verify email credentials in .env
   - Check if app password is correct (for Gmail)
   - Ensure less secure apps are enabled

### Logs

- Backend logs: Check console output
- Frontend logs: Browser developer tools
- Database logs: MySQL error logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Express.js for the robust backend framework
- MySQL for the reliable database system

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information
4. Contact: [tesfutesfalemmarkos@gmail.com]
5. phone +251922935284

---

**Built with ❤️ by [Tesfalem Markos Dola]**
