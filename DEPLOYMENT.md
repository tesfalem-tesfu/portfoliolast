# Portfolio Deployment Guide - Render

## Prerequisites
- Render account (https://render.com)
- GitHub repository with your portfolio code
- MySQL database (will be created on Render)

## Step 1: Prepare Your Repository

### 1.1 Add Render Configuration Files
- `frontend/render.yaml` - Frontend service configuration
- `backend/render.yaml` - Backend service configuration
- `frontend/.env.production` - Production environment variables

### 1.2 Update package.json if needed
- Ensure build scripts are correct
- Add production build command if needed

## Step 2: Deploy Backend

### 2.1 Create Backend Service
1. Go to Render Dashboard
2. Click "New +" -> "Web Service"
3. Connect your GitHub repository
4. Select `backend` folder as root directory
5. Runtime: Node
6. Build Command: `npm install`
7. Start Command: `npm start`
8. Environment Variables:
   ```
   NODE_VERSION=18
   PORT=10000
   NODE_ENV=production
   JWT_SECRET=your_secure_jwt_secret_here
   ```

### 2.2 Create Database
1. Go to Render Dashboard
2. Click "New +" -> "PostgreSQL" (or MySQL if available)
3. Name: `portfolio-db`
4. Database name: `portfolio_db`
5. Copy connection details

### 2.3 Update Backend Environment Variables
Add database connection variables:
```
DB_HOST=your-db-host.render.com
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=portfolio_db
```

### 2.4 Run Database Setup
1. Deploy the backend service
2. Once deployed, go to "Shell" tab
3. Run: `npm run setup-db`

## Step 3: Deploy Frontend

### 3.1 Create Frontend Service
1. Go to Render Dashboard
2. Click "New +" -> "Static Site"
3. Connect your GitHub repository
4. Select `frontend` folder as root directory
5. Build Command: `npm run build`
6. Publish Directory: `build`
7. Environment Variables:
   ```
   NODE_VERSION=18
   REACT_APP_API_URL=https://your-backend-name.onrender.com
   ```

### 3.2 Configure Routes
Add custom redirects in Render dashboard:
```
Source: /api/*
Destination: https://your-backend-name.onrender.com/api/*
Type: Rewrite
```

## Step 4: Security Configuration

### 4.1 Enable HTTPS
- Render provides automatic SSL certificates
- Update all hardcoded HTTP URLs to HTTPS

### 4.2 Environment Variables
Set these in Render dashboard (never commit to git):
```
JWT_SECRET=your_super_secure_jwt_secret
DB_PASSWORD=your_secure_db_password
EMAIL_PASS=your_email_app_password
```

### 4.3 Rate Limiting
- API endpoints already have rate limiting
- Consider adjusting limits based on traffic

## Step 5: Custom Domain (Optional)

### 5.1 Point Domain to Render
1. Go to your domain registrar
2. Add CNAME record pointing to `your-app-name.onrender.com`
3. In Render dashboard, add custom domain

### 5.2 SSL Certificate
- Render automatically provides SSL for custom domains
- May take a few minutes to provision

## Step 6: Testing

### 6.1 Test Backend API
```bash
curl https://your-backend-name.onrender.com/api/portfolio/profile
```

### 6.2 Test Frontend
- Visit your frontend URL
- Test all sections load correctly
- Test contact form functionality
- Test navigation between sections

## Step 7: Monitoring

### 7.1 Render Logs
- Check service logs for errors
- Monitor database connection logs
- Set up alerts if needed

### 7.2 Performance
- Monitor response times
- Check database query performance
- Optimize if needed

## Troubleshooting

### Common Issues:
1. **Database Connection Failed**
   - Check environment variables
   - Verify database is running
   - Check network connectivity

2. **Frontend Build Failed**
   - Check build logs
   - Verify all dependencies installed
   - Check for environment variable issues

3. **API Calls Failed**
   - Check CORS configuration
   - Verify API URLs are correct
   - Check rate limiting settings

4. **Images Not Loading**
   - Verify image paths in public folder
   - Check build output includes images
   - Verify image URLs are correct

## Security Best Practices

1. **Never commit secrets to git**
2. **Use strong, unique passwords**
3. **Enable rate limiting**
4. **Keep dependencies updated**
5. **Monitor for suspicious activity**
6. **Regular backups of database**

## Maintenance

1. **Regular Updates**: Update dependencies monthly
2. **Database Backups**: Enable automatic backups
3. **Security Scans**: Run security scans regularly
4. **Performance Monitoring**: Monitor site performance
5. **SSL Renewal**: SSL auto-renews, but monitor expiration

## Deployment Commands

```bash
# Local testing before deployment
cd frontend && npm run build
cd backend && npm install && npm start

# Git push to trigger deployment
git add .
git commit -m "Deploy to production"
git push origin main
```

Your portfolio should now be safely deployed on Render!
