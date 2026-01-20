# User Management Dashboard

A professional, production-ready user management dashboard built with React, Vite, and modern web technologies. Features real-time search, sorting, CRUD operations, and a fully responsive design.

##  Features

- **User Management**: Create, read, update, and delete users with API integration
- **Real-time Search**: Debounced search with case-insensitive filtering
- **Sorting**: Alphabetical sorting toggle for user lists
- **Responsive Design**: Mobile-first design with 3 responsive breakpoints
- **Professional UI**: Gradient dashboard header with statistics cards
- **Error Handling**: Comprehensive error states with retry functionality
- **Loading States**: Smooth loading indicators and state management
- **Keyboard Accessibility**: Full keyboard navigation support (ESC, Tab)
- **Performance Optimized**: Code splitting, minification, and lazy loading

##  Quick Start

### Prerequisites
- Node.js 18+ and npm 9+

### Installation

```bash
# Clone or navigate to the project
cd UserDashboard

# Install dependencies
npm install
```

### Development

```bash
# Terminal 1: Start the development server (port 5173)
npm run dev

# Terminal 2: Start the JSON API server (port 3001)
npm run server

# Or run both concurrently
npm run dev:full
```

### Production Build

```bash
# Build for production (output to dist/)
npm run build

# Preview production build locally
npm run preview
```

##  Project Structure

```
UserDashboard/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Table.jsx
│   │   ├── UserDetail.jsx
│   │   ├── DashboardHeader.jsx
│   │   └── StatsCard.jsx
│   ├── styles/          # Component-specific CSS
│   │   ├── Table.css
│   │   ├── UserDetail.css
│   │   ├── UserList.css
│   │   ├── AddUser.css
│   │   ├── DashboardHeader.css
│   │   └── StatsCard.css
│   ├── utils/           # Utility functions
│   │   ├── api.js       # API client functions
│   │   └── debounce.js  # Debounce utility
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # React entry point
│   ├── UserList.jsx     # Main dashboard container
│   ├── AddUser.jsx      # Add user form
│   ├── App.css
│   └── index.css        # Global styles
├── db.json              # JSON server database
├── index.html           # HTML entry point
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── eslint.config.js     # ESLint configuration
```

##  Configuration

### API Configuration

Update the API base URL in [src/utils/api.js](src/utils/api.js) if deploying to production:

```javascript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001';
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=User Management Dashboard
```

##  Customization

### Color Scheme

Edit CSS files to customize colors:
- **Primary**: #3b82f6 (Blue)
- **Success**: #10b981 (Green)  
- **Gradient**: #667eea → #764ba2 (Purple)
- **Error**: #ef4444 (Red)

### Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

##  API Endpoints

The dashboard uses a JSON server with the following endpoints:

- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch single user
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

##  Quality Assurance

```bash
# Run ESLint checks
npm run lint
```

##  Build Output

The production build is optimized with:
- Minified JavaScript and CSS
- Code splitting (vendor chunk separation)
- Console and debugger removal
- Compression-friendly output

##  Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting service
3. Configure server redirects to `index.html` for SPA routing

### Docker

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

##  Troubleshooting

### Port Already in Use

If port 5173 or 3001 is already in use:
- Change port in `vite.config.js` or `json-server` command
- Kill the process: `netstat -ano | findstr :5173` (Windows)

### CORS Issues

If API requests fail, verify json-server is running on port 3001:
```bash
npm run server
```

### Build Errors

Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

##  License

MIT License - Feel free to use this project for personal or commercial purposes.

##  Support

For issues or questions, please check the project structure or review component documentation in the code.

---

**Version**: 1.0.0 | **Last Updated**: January 2026
