# AGENTS.md - Agent Guidelines for frontend-uec

## Project Overview

This is a **JavaScript React application** built with Create React App (CRA). It is a church management system with features for hymns (himnario), songs (cancionero), activities (actividades), and offerings (ofrendas).

## Build, Lint, and Test Commands

### Development
```bash
npm start          # Start development server on http://localhost:3000
```

### Building
```bash
npm run build      # Build production bundle to /build folder
npm run servir     # Serve the built app (requires global 'serve' package)
```

### Testing
```bash
npm test                    # Run tests in interactive watch mode
npm test -- --watchAll=false    # Run tests once (CI mode)
npm test -- --testPathPattern=filename    # Run single test file
npm test -- -t "test name"     # Run tests matching a name pattern
```

In watch mode, press:
- `p` to filter by file name
- `q` to quit
- `a` to run all tests

## Code Style Guidelines

### General
- **Language**: JavaScript (ES6+)
- **Framework**: React 18.2.0 with class and functional components
- **Routing**: React Router v5
- **Styling**: Bootstrap 4.6

### Formatting
- **Indentation**: 4 spaces (not tabs)
- **Line endings**: Unix (LF)
- **Strings**: Single quotes `'string'` (preferred)
- **Semicolons**: Required at end of statements
- **Commas**: Trailing commas allowed

### Naming Conventions
- **Components**: PascalCase (e.g., `FormLogin`, `Navbar`)
- **Files**: PascalCase for components (e.g., `MyComponent.js`), camelCase for utilities
- **Variables/Functions**: camelCase (e.g., `handleSubmit`, `userData`)
- **Constants**: SCREAMING_SNAKE_CASE for config constants
- **Props**: camelCase

### Import Order (recommended)
1. External libraries (React, React Router)
2. Context providers
3. Components
4. Other modules
5. Config files
6. Styles (if any)

Example:
```javascript
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from './Layout'
import Home from './pages/home'
import HimnarioProvider from './context/himnario/Provider'
import config from './config'
```

### Component Structure

**Class Components:**
```javascript
import React from 'react'

class MyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { }
        this.handleEvent = this.handleEvent.bind(this)
    }

    handleEvent() { }

    render() {
        return ( )
    }
}

export default MyComponent
```

**Functional Components:**
```javascript
import React from 'react'

function MyComponent({ prop1, prop2 }) {
    return ( )
}

export default MyComponent
```

### JSX Conventions
- Self-closing tags must have closing slash: `<Component />`
- Use `className` instead of `class`
- Use `htmlFor` instead of `for` on labels
- Boolean props can be written as `<Component enabled />` instead of `enabled={true}`

### Error Handling
- Use try/catch for async operations
- Display user-friendly error messages via UI (e.g., alerts or error states)
- Log errors to console for debugging

### Context API Usage
- Use Provider pattern with index.js export
- Structure: `src/context/{name}/index.js`, `src/context/{name}/Provider.js`

### Props and State
- Keep state minimal; derive data when possible
- Use PropTypes or TypeScript for prop validation if needed
- Destructure props in functional components

### Event Handlers
- Name handlers with `handle` prefix: `handleSubmit`, `handleChange`
- Pass event handlers as props with `on` prefix: `onSubmit`, `onChange`

### File Organization
```
src/
├── components/      # Reusable UI components
├── context/         # React Context providers
├── pages/           # Page-level components (routes)
├── config.js        # Configuration constants
├── index.js         # App entry point
├── App.js           # Main app with routes
├── Layout.js        # Layout wrapper
└── service-worker*  # PWA service worker
```

### Working with Forms
- Use controlled components (state-driven)
- Validate with HTML5 attributes (`required`, `pattern`, etc.)
- Use Bootstrap classes for styling (`form-control`, `needs-validation`)

### Git Conventions
- Branch naming: `feature/description` or `fix/description`
- Commit messages: Clear, descriptive summary
- Never commit: `node_modules/`, `build/`, `.env*` files

### Testing (when adding tests)
- Test files: `*.test.js` or `*.spec.js` (co-located with components)
- Use `@testing-library/react` and `@testing-library/jest-dom`
- Follow AAA pattern: Arrange, Act, Assert
