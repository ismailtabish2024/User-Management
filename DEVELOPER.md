<!-- Comprehensive project documentation for developers -->

# Developer Guide

## Getting Started

This project is a production-ready User Management Dashboard built with React 19, Vite, and pure CSS.

### Quick Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development
npm run dev:full  # Runs both Vite dev server and JSON API server

# Or run them separately in two terminals:
# Terminal 1
npm run dev

# Terminal 2
npm run server
```

## Architecture Overview

### Technology Stack
- **Frontend**: React 19 with Hooks (functional components only)
- **Build Tool**: Vite 7 for fast development and optimized production builds
- **Styling**: Pure CSS with Flexbox (no CSS-in-JS, no Tailwind, no Bootstrap)
- **API Client**: Fetch API with async/await (custom utility, no axios)
- **State Management**: React Hooks (useState, useEffect, useCallback, useRef)
- **Routing**: React Router v7 for navigation between pages
- **Linting**: ESLint with React plugin configuration
- **Database**: JSON Server for development

### Project Structure

```
src/
├── components/
│   ├── Table.jsx              # Displays user data in table format
│   ├── UserDetail.jsx         # Modal for viewing/editing/deleting users
│   ├── DashboardHeader.jsx    # Header with gradient background
│   └── StatsCard.jsx          # Reusable statistics card component
├── styles/
│   ├── Table.css              # Table styling and responsiveness
│   ├── UserDetail.css         # Modal and form styling
│   ├── UserList.css           # Dashboard layout and search
│   ├── AddUser.css            # Form styling
│   ├── DashboardHeader.css    # Header styling
│   ├── StatsCard.css          # Card styling
│   ├── App.css                # Global component styles
│   └── index.css              # Global application styles
├── utils/
│   ├── api.js                 # API client functions (fetchUsers, createUser, updateUser, deleteUser)
│   └── debounce.js            # Debounce utility for search optimization
├── App.jsx                    # Main application component with routing
├── main.jsx                   # React entry point
├── UserList.jsx               # Main dashboard container component
├── AddUser.jsx                # Form for creating new users
├── index.css                  # Global styles
└── App.css                    # App component styles
```

## Component Architecture

### UserList.jsx (Main Dashboard)
**Role**: Container component that manages all dashboard state and logic

**State**:
- `userData`: Array of all users from API
- `filteredData`: Filtered and sorted users based on search/sort
- `loading`: Boolean for loading state
- `error`: Error message string
- `searchTerm`: Current search query
- `selectedUser`: User object for detail modal
- `sortAlphabetically`: Boolean for sort toggle

**Key Features**:
- Fetches users on component mount
- Implements debounced search filtering
- Provides alphabetical sort toggle
- Handles user selection for modal
- Manages error states with retry functionality

### Table.jsx (User Data Display)
**Role**: Presentational component for displaying user table

**Props**:
- `data`: Array of users to display
- `onSelectUser`: Callback when user row is clicked
- `selectedUser`: Currently selected user for highlighting

**Features**:
- Responsive table with 8 columns (ID, Name, Username, Email, Phone, Website, City, Company)
- Row selection highlighting with blue background and border accent
- "View" button to trigger detail modal
- Mobile-friendly vertical stacking at breakpoints

### UserDetail.jsx (Modal for User Operations)
**Role**: Modal component for viewing and editing user details

**Props**:
- `user`: User object to display/edit
- `isOpen`: Boolean to control modal visibility
- `onClose`: Callback to close modal
- `onUserUpdated`: Callback after successful update
- `onUserDeleted`: Callback after successful deletion

**Modes**:
- **View**: Read-only display of user information
- **Edit**: Editable form with nested object handling (address, company)
- **Delete**: Confirmation before deletion

**Features**:
- ESC key closes modal
- Edit form updates nested objects dynamically
- Delete confirmation before removal
- API integration with error handling

### AddUser.jsx (Create New User)
**Role**: Form component for adding new users

**Features**:
- Form validation (required fields)
- Creates user via API
- Redirects to home after success
- Error handling and user feedback

### DashboardHeader.jsx (Visual Header)
**Role**: Branded header with app title and gradient background

**Features**:
- Gradient background (purple theme)
- Responsive font sizing
- Professional appearance

### StatsCard.jsx (Statistics Display)
**Role**: Reusable card component for displaying metrics

**Props**:
- `icon`: Emoji or icon string
- `title`: Metric title
- `value`: Metric value to display
- `color`: Color theme (blue, green, purple, orange)

**Features**:
- Hover elevation effect
- Color-coded left border accent
- Responsive padding at breakpoints

## Data Flow

### User Fetching
```
1. UserList.jsx mounts
2. useEffect triggers fetchUsers() from api.js
3. API client makes GET request to http://localhost:3001/users
4. Response stored in userData state
5. filteredData is derived from userData
6. Table.jsx receives filteredData as props and renders
```

### Search & Filter
```
1. User types in search input
2. onChange event fires with debounce delay (300ms)
3. searchTerm state updates
4. applyFiltersAndSort() recalculates filteredData
5. Case-insensitive matching applied to name, email, phone, website
6. Table re-renders with filtered results
```

### User Edit
```
1. User clicks "View" button on table row
2. selectedUser state set, UserDetail modal opens
3. User modifies form fields (e.g., address.street)
4. handleInputChange splits nested keys and updates state
5. User clicks "Save Changes"
6. updateUser(userId, userData) called via api.js
7. API sends PUT request with updated data
8. Response confirms update
9. userData state updated with new user data
10. UserDetail closes, Table re-renders
```

### User Delete
```
1. User clicks "View" button
2. In modal, clicks "Delete User"
3. Confirmation prompt appears
4. User confirms deletion
5. deleteUser(userId) called via api.js
6. API sends DELETE request
7. User removed from userData array
8. Table re-renders without deleted user
9. Modal closes
```

## Styling System

### CSS Architecture
- **No CSS frameworks**: Pure CSS with Flexbox only
- **No Tailwind**: All styles written in separate CSS files
- **No CSS-in-JS**: Component-scoped CSS files in `/styles` directory
- **Organization**: Each component has corresponding CSS file

### Responsive Breakpoints
```css
Desktop: > 1024px     /* Full-width layouts, all features visible */
Tablet:  768-1024px   /* Adjusted spacing, simplified grid */
Mobile:  < 768px      /* Single column, touch-friendly sizes */
```

### Color Palette
```
Primary Blue:     #3b82f6
Success Green:    #10b981
Error Red:        #ef4444
Warning Orange:   #f59e0b
Gradient Purple:  #667eea → #764ba2
Neutral Gray:     #6b7280
Light Gray:       #f3f4f6
```

### Flexbox Patterns

**Centering**:
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
```

**Responsive Grid** (Dashboard stats):
```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
```

**Vertical Stack** (Mobile):
```css
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

## API Integration

### Environment Variables
```env
VITE_API_URL=http://localhost:3001           # API base URL
VITE_API_TIMEOUT=10000                       # Request timeout in ms
VITE_APP_NAME=User Management Dashboard      # App display name
VITE_APP_VERSION=1.0.0                       # App version
```

### API Functions (src/utils/api.js)

#### fetchUsers()
```javascript
// Fetches all users
// Returns: Promise<Array<User>>
// Throws: Error with descriptive message
```

#### createUser(userData)
```javascript
// Creates new user
// Parameters: userData = { name, email, username, phone, website, address, company }
// Returns: Promise<User>
```

#### updateUser(userId, userData)
```javascript
// Updates existing user
// Parameters: userId (number), userData (partial or full User object)
// Returns: Promise<User>
```

#### deleteUser(userId)
```javascript
// Deletes user
// Parameters: userId (number)
// Returns: Promise<void>
```

### Error Handling
All API functions include:
- Request timeout protection (10 seconds default)
- Meaningful error messages
- Console logging for debugging
- Try-catch blocks with specific error handling

## Performance Optimizations

### 1. Debounced Search
```javascript
// Prevents excessive re-renders during typing
const debouncedSearch = useCallback(
  debounce((term) => {
    setSearchTerm(term);
  }, 300),
  []
);
```

### 2. Optimized Re-renders
- `useCallback` for event handlers
- `useRef` for stable references
- Conditional rendering based on state

### 3. Build Optimizations (Vite)
- Code splitting: Vendor chunk separated from app code
- Minification: Production build removes console/debugger
- Tree shaking: Unused code removed
- Asset optimization: CSS and JS compressed

## Development Workflow

### Running Development Server

```bash
# Option 1: Both servers in one command
npm run dev:full

# Option 2: Separate terminals
npm run dev      # Vite dev server on port 5173
npm run server   # JSON API server on port 3001
```

### Making Changes

1. **Component**: Edit file in `src/components/`
2. **Styling**: Edit corresponding CSS in `src/styles/`
3. **Utilities**: Update files in `src/utils/`
4. **Vite HMR**: Changes automatically reflected in browser

### Testing Changes

1. **Manual Testing**: Navigate UI, test all features
2. **DevTools**: Check console for errors
3. **Network Tab**: Verify API requests
4. **Responsive**: Test at multiple breakpoints

### Linting

```bash
# Run ESLint
npm run lint

# Check for code quality issues
# Review output and fix issues manually
```

## Building for Production

### Build Process

```bash
# Create optimized production bundle
npm run build

# Output created in dist/ directory
# - dist/index.html
# - dist/assets/index-[hash].js
# - dist/assets/index-[hash].css
# - dist/assets/vendor-[hash].js
```

### Verifying Build

```bash
# Preview production build locally
npm run preview

# Navigates to http://localhost:4173
# Test all features work in production build
```

### Build Analysis

```bash
# Check bundle size
npm run build

# Review output:
# - Total size (should be < 500KB gzipped)
# - Chunk sizes
# - Asset counts
```

## Debugging Tips

### Common Issues & Solutions

**Search not working?**
- Check debounce delay (300ms default in UserList)
- Verify search term state is updating
- Check filter logic in applyFiltersAndSort()

**Modal not opening?**
- Verify selectedUser state is set
- Check UserDetail isOpen prop
- Inspect UserDetail.jsx onClose callback

**Styling not applying?**
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file is imported
- Verify className matches CSS selector
- Check media query breakpoints

**API failing?**
- Verify json-server is running: `npm run server`
- Check port 3001 is not in use
- Verify API_BASE_URL in api.js
- Check network tab in DevTools

## Code Standards

### React Patterns
- Use functional components only (no class components)
- Hooks for state (useState) and side effects (useEffect)
- Use const for all declarations
- Name components with PascalCase
- Name functions/variables with camelCase

### CSS Patterns
- BEM-inspired naming: `.component-name`, `.component-name__element`
- Mobile-first: base styles, then media queries
- Group related properties together
- Use CSS variables for colors (optional)

### File Organization
- One main component per file
- Keep related styles in separate CSS file
- Keep utilities isolated in utils/ folder
- Index files for easy imports (optional)

### Comments
- Add comments for complex logic
- Document component props with JSDoc
- Explain WHY not WHAT

## Deployment Checklist

- [ ] All features tested locally
- [ ] npm run lint passes without errors
- [ ] npm run build successful without warnings
- [ ] npm run preview works correctly
- [ ] Environment variables configured for production
- [ ] API endpoints verified
- [ ] Error handling tested
- [ ] Performance acceptable
- [ ] Mobile responsiveness verified
- [ ] Accessibility checked (keyboard navigation)

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [JSON Server](https://github.com/typicode/json-server)

## Contributing

When adding features:
1. Create feature branch
2. Make changes following code standards
3. Test thoroughly in development
4. Build and verify production bundle
5. Commit with clear messages
6. Create pull request

## Support

For issues or questions:
1. Check this guide first
2. Review component source code comments
3. Check browser console for errors
4. Review network tab for API issues
5. Check deployment guide for production issues
