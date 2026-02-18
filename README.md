# Event Management System (MERN Stack)

This repository contains a modular, reusable, and testable Event Management System built with the MERN stack based on the specified requirements.

## Overview

- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Frontend**: React with React Router, Axios
- **Features**: Authentication (admin/user), membership maintenance (add/update/list), protected routes, basic UI for login and membership operations.

## Folder Structure

```
backend/
  package.json
  .env
  src/
    app.js
    server.js
    config/
      db.js
    controllers/
    middleware/
    models/
    routes/
frontend/
  package.json
  .env
  src/
    index.js
    App.js
    components/
    pages/
    services/
README.md
```

## Getting Started

### Backend

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
3. create .env   
2. Run the server:
   ```bash
   npm run dev
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

## Notes

- Admin users can access the maintenance module (add, update, and list memberships), plus report and transaction pages.
- Regular users can view individual membership details if needed (not yet implemented in UI).
- Authentication uses JWT stored in `localStorage`; password fields are hidden.
- Basic validation is performed on forms; radio buttons and checkboxes can be added in UI modules.
- The structure is designed for modularity with separate controllers, routes, and services.

## Next Steps
- Add reports and transactions modules using the maintenance data (UI stubs already exist).
- Improve frontend styling and navigation.
- Add error handling, logging, and production-ready configuration.

---

This starting project provides a solid foundation for the Event Management System described in the requirements. Feel free to extend the modules and add features as needed.
