# BxTrack Frontend

A modern, responsive blog management frontend built with React, Tailwind CSS, and React Router.


##  Tech Stack

- **Framework**: React 18.2.0
- **Routing**: React Router DOM 7.12.0
- **Styling**: Tailwind CSS 3.4.19
- **HTTP Client**: Axios 1.13.2
- **Rich Text Editor**: React Quill 2.0.0
- **Security**: DOMPurify 3.3.1


## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend running 

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the frontend root:**
   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000/api
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   The app will open in your browser at `http://localhost:3000`.



##  Architecture

### Overview

The frontend follows a component-based architecture with:

- **Pages**: Main route components (Home, Login, Register, PostForm, PostDetail)
- **Components**: Reusable UI components (Navbar, PostCard, ProtectedRoute)
- **Context**: Global state management (AuthContext)
- **Services**: API communication layer (api.js, auth.js, posts.js)
- **Routing**: Client-side routing with React Router

### State Management

- **AuthContext**: Manages user authentication state, token, and user data
- **Local State**: Component-level state using React hooks (useState, useEffect)
- **Local Storage**: Persists authentication tokens and user data

### Data Flow

1. User interacts with UI components
2. Components call service functions (auth.js, posts.js)
3. Services use axios to make HTTP requests to the backend API
4. Responses update context or local state
5. UI re-renders with new data

##  Features

### Authentication
- User registration with name, email, and password
- User login with email and password
- JWT token-based authentication
- Protected routes (require authentication)
- Automatic redirect for logged-in users (login/register pages)
- Persistent sessions via localStorage

### Posts Management
- View all posts with pagination
- View individual post details
- Create new posts with rich text editor
- Edit own posts
- Delete own posts
- Author-only edit/delete permissions



##  Project Structure

```
frontend/
├── public/
│   ├── index.html          # HTML template
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── PostCard.jsx    # Post preview card
│   │   └── ProtectedRoute.jsx # Route protection wrapper
│   ├── context/
│   │   └── AuthContext.js  # Authentication context provider
│   ├── pages/
│   │   ├── Home.jsx        # Posts listing page
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Registration page
│   │   ├── PostForm.jsx    # Create/Edit post form
│   │   └── PostDetail.jsx  # Post detail view
│   ├── services/
│   │   ├── api.js          # Axios instance configuration
│   │   ├── auth.js         # Authentication API calls
│   │   └── posts.js        # Posts API calls
│   ├── App.js              # Main app component with routes
│   ├── index.js            # App entry point
│   └── index.css           # Global styles and Tailwind imports
├── package.json
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── README.md
```

### Component Details

#### Pages

- **Home.jsx**: Displays paginated list of all posts
- **Login.jsx**: User login form with email and password
- **Register.jsx**: User registration form
- **PostForm.jsx**: Create or edit post with rich text editor
- **PostDetail.jsx**: View individual post with edit/delete options (for owners)

#### Components

- **Navbar.jsx**: Top navigation with links and user info
- **PostCard.jsx**: Reusable card component for post previews
- **ProtectedRoute.jsx**: HOC that redirects unauthenticated users

#### Services

- **api.js**: Configured axios instance with base URL and auth interceptors
- **auth.js**: Authentication API functions (register, login)
- **posts.js**: Posts API functions (CRUD operations)


## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | Backend API base URL | `http://localhost:5000/api` |

Create a `.env` file in the frontend root to override defaults:

```env
REACT_APP_BACKEND_URL=http://localhost:5000/api
```

**Note**: Environment variables must be prefixed with `REACT_APP_` to be accessible in the React app.


