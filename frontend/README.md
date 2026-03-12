# Project Management Portal - Frontend

A modern React + Vite frontend for the Project Management Portal with Material-UI components and GSAP animations.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will run at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── animations/
│   │   └── gsapUtils.js        # GSAP animation utilities
│   ├── HeroSection.jsx         # Hero with GSAP animations
│   ├── StatsWidget.jsx         # Statistics with count-up
│   ├── ProjectsGrid.jsx        # Projects display
│   ├── ProjectDialog.jsx       # Create/Edit projects
│   ├── MembersGrid.jsx         # Team display
│   ├── MemberDialog.jsx        # Create/Edit members
│   ├── TimelineView.jsx        # Project timeline
│   ├── Navbar.jsx              # Navigation
│   ├── ProjectCard.jsx         # Project component
│   └── MemberCard.jsx          # Member component
├── pages/
│   ├── Dashboard.jsx           # Home page
│   ├── Projects.jsx            # Projects management
│   ├── Members.jsx             # Team management
│   └── Login.jsx               # Authentication
├── services/
│   └── api.js                  # API client
├── App.jsx                     # Main app
├── main.jsx                    # Entry point
└── index.css                   # Global styles
```

## ✨ Key Features

### 🎨 Components

- **HeroSection**: Animated hero banner with GSAP
- **StatsWidget**: Count-up animation statistics
- **ProjectsGrid**: Responsive project cards with hover effects
- **ProjectDialog**: Create/Edit projects with validation
- **MembersGrid**: Team member cards
- **MemberDialog**: Add/Edit team members
- **TimelineView**: Project timeline with MUI Stepper
- **Navbar**: Navigation with authentication

### 🎬 Animations

- **Text Sliding**: Characters sliding into view
- **Card Entrance**: Staggered card animations
- **Count-up**: Number animations for stats
- **Dialog Animations**: Fade-in and scale effects
- **Hover Effects**: Interactive card animations
- **SVG Paths**: SVG drawing animations
- **Page Transitions**: Smooth page transitions

### 🔐 Authentication

- JWT token management
- Automatic token injection in requests
- Protected routes
- Auto-logout on 401 error
- Registration and login support

## 🛠 Technologies

- **React 19**: UI framework
- **Vite**: Build tool
- **Material-UI (MUI)**: Component library
- **GSAP**: Animation library
- **React Router**: Navigation
- **Axios**: HTTP client

## 📚 API Integration

Base URL: `http://localhost:3000/api`

**Auth:**
- `POST /auth/register`
- `POST /auth/login`

**Projects:**
- `GET /projects`
- `POST /projects`
- `PUT /projects/:id`
- `DELETE /projects/:id`
- `GET /projects/stats`

**Members:**
- `GET /members`
- `POST /members`
- `PUT /members/:id`
- `DELETE /members/:id`

## 🎯 Best Practices

✅ Component reusability  
✅ Centralized animation utilities  
✅ Error handling  
✅ Loading states  
✅ Responsive design  
✅ Clean code structure  
✅ Type consistency  
✅ Accessibility  

## 📝 License

MIT

