# 🚀 Project Management Portal - Getting Started

## Overview

This is a full-featured Project Management Portal built with:
- **Frontend**: React + Vite + Material-UI + GSAP
- **Backend**: Node.js + Express + MongoDB + JWT
- **Database**: MongoDB

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- MongoDB (local or Atlas)
- Git

## 📋 Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd project-management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend root:

```env
PORT=3000
CONNECTION_STRING=mongodb://localhost:27017/project-management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

Start the backend:

```bash
npm run dev
```

Backend will run at `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend will run at `http://localhost:5173`

## 🎯 Basic Workflow

### 1. Authentication

1. Navigate to `http://localhost:5173`
2. You'll be redirected to login page
3. Register a new account or login
4. JWT token is automatically stored in localStorage

### 2. Dashboard

- View statistics (total projects, active projects, completed projects, team size)
- All numbers have count-up animations
- Quick navigation to projects and team pages

### 3. Projects Management

- **View Projects**: See all your projects in an animated grid
- **Create Project**: Click "New Project" button
  - Enter title and description
  - Add technologies (tech stack)
  - Set status (active/completed)
- **Edit Project**: Click edit button on any card
- **Delete Project**: Click delete button with confirmation

### 4. Team Management

- **View Members**: See all team members
- **Add Member**: Click "Add Member" button
  - Enter name, email, and role
- **Edit Member**: Click edit button on any card
- **Delete Member**: Click delete button with confirmation

## ✨ Features & Animations

### GSAP Animations Used

| Animation | Location | Effect |
|-----------|----------|--------|
| **Slide-in Text** | Hero section, pages | Text slides from sides |
| **Count-up** | Stats widgets | Numbers animate to final value |
| **Card Entrance** | Grids | Cards slide in with stagger |
| **Card Hover** | Project/Member cards | Cards lift on hover |
| **Dialog Animation** | Add/Edit dialogs | Dialog fades in and scales |
| **Button Float** | Hero section buttons | Buttons float up and down |
| **SVG Path** | Hero section | SVG paths draw themselves |
| **Page Transition** | Page navigation | Pages fade in smoothly |
| **Stepper Animation** | Timeline view | Timeline steps slide in |

### Component Highlights

**HeroSection**
- Animated text with GSAP
- Floating buttons
- SVG path animations
- Navigation CTA buttons

**StatsWidget**
- Count-up animation from 0 to actual value
- Color-coded widgets
- Hover effects

**ProjectsGrid & MembersGrid**
- Responsive grid layout
- Staggered entrance animations
- Hover lift effects
- Edit/Delete buttons

**Dialogs**
- Smooth fade-in and scale animation
- Form validation
- Loading states
- Tech stack management (projects)

**TimelineView**
- Project lifecycle timeline
- Status indicators
- MUI Stepper integration
- GSAP step animations

## 📊 API Reference

### Authentication

```bash
# Register
POST /api/auth/register
Body: { email, password }

# Login
POST /api/auth/login
Body: { email, password }
Response: { token, id }
```

### Projects

```bash
# List projects (with optional filters)
GET /api/projects?status=active&title=search
Headers: Authorization: Bearer <token>

# Get single project
GET /api/projects/:id
Headers: Authorization: Bearer <token>

# Create project
POST /api/projects
Headers: Authorization: Bearer <token>
Body: { title, description, techStack[], status }

# Update project
PUT /api/projects/:id
Headers: Authorization: Bearer <token>
Body: { title, description, techStack[], status }

# Delete project
DELETE /api/projects/:id
Headers: Authorization: Bearer <token>

# Get stats
GET /api/projects/stats
Headers: Authorization: Bearer <token>
```

### Members

```bash
# List members (with optional filters)
GET /api/members?role=Developer&name=search
Headers: Authorization: Bearer <token>

# Get single member
GET /api/members/:id
Headers: Authorization: Bearer <token>

# Create member
POST /api/members
Headers: Authorization: Bearer <token>
Body: { name, email, role }

# Update member
PUT /api/members/:id
Headers: Authorization: Bearer <token>
Body: { name, email, role }

# Delete member
DELETE /api/members/:id
Headers: Authorization: Bearer <token>
```

## 🔐 Security Best Practices

1. **JWT Tokens**: Change `JWT_SECRET` in production
2. **HTTPS**: Use HTTPS in production
3. **CORS**: Configure CORS appropriately
4. **Password**: Passwords are hashed with bcrypt
5. **Token Expiry**: Tokens expire after 1 hour
6. **Protected Routes**: Frontend routes require authentication

## 📁 Important Files

### Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── animations/gsapUtils.js
│   │   ├── HeroSection.jsx
│   │   ├── StatsWidget.jsx
│   │   ├── ProjectsGrid.jsx
│   │   ├── ProjectDialog.jsx
│   │   ├── MembersGrid.jsx
│   │   ├── MemberDialog.jsx
│   │   ├── TimelineView.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   ├── Members.jsx
│   │   ├── Login.jsx
│   │   └── ProjectDetail.jsx
│   ├── services/
│   │   └── api.js
│   ├── hooks/
│   │   └── useAuth.js
│   ├── App.jsx
│   └── index.css
├── .env
├── package.json
└── vite.config.js
```

### Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── dbConnect.js
│   │   └── swagger.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectsController.js
│   │   └── membersController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── constants.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── projectModel.js
│   │   └── memberModel.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── members.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## 🐛 Troubleshooting

### Frontend Issues

**Cannot connect to API**
- Ensure backend is running on port 3001
- Check browser console for errors
- Verify CORS is enabled on backend

**Animations not working**
- Clear browser cache
- Check if GSAP is installed: `npm list gsap`
- Verify ref assignments on elements
- Check browser console for errors

**Login issues**
- Clear localStorage: F12 → Application → Local Storage
- Try registering a new account
- Ensure backend is connected to MongoDB

### Backend Issues

**MongoDB connection error**
- Ensure MongoDB is running
- Check CONNECTION_STRING in .env
- Verify MongoDB port (default: 27017)

**Port already in use**
- Change PORT in .env
- Or kill process using port 3000

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [GSAP Documentation](https://gsap.com/docs/v3)
- [Material-UI Documentation](https://mui.com)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project!

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding! 🎉**
