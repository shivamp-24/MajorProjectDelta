# MajorProjectDelta

## Technologies Used

- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Frontend**: EJS, Bootstrap, Font Awesome
- **Validation**: Joi
- **Tools**: Nodemon, Hoppscotch (for API testing)

### Day 1: Project Setup and Backend Initialization

- Initialized the project with `npm init -y` to create `package.json`.
- Installed dependencies:
  - `express`: For the server.
  - `ejs`: For templating.
  - `mongoose`: For MongoDB integration.
  - `method-override`: To support PUT and DELETE requests.
  - `nodemon`: Installed globally for automatic server restarts.
- Configured `app.js`:
  - Imported Express and Mongoose.
  - Started the server using `nodemon app.js`.
- Set up MongoDB:
  - Launched MongoDB shell with `mongosh`.
  - Established Mongoose connection.
- Created CRUD routes with EJS templates in the `views` folder:
  - `index.ejs`: List all listings.
  - `new.ejs`: Create a new listing.
  - `edit.ejs`: Edit an existing listing.
  - `show.ejs`: View listing details.

### Day 2: Frontend Styling with Bootstrap

- Installed `ejs-mate` to create reusable boilerplate code for navbar and footer.
- Created reusable components in the `includes` folder:
  - **Navbar**: Built with Bootstrap and custom styling.
  - **Footer**: Designed with custom styling and Font Awesome social media icons.
- Styled EJS templates:
  - `index.ejs`: Used Bootstrap cards for a grid-based listing display.
  - `new.ejs`: Applied Bootstrap `form-control` for form inputs.
  - `edit.ejs`: Reused form styling from `new.ejs`.
  - `show.ejs`: Added custom styling with edit and delete buttons.

### Day 3: Validations and Error Handling

- Implemented **client-side validations**:
  - Added Bootstrap classes (`novalidate`, `needs-validation`) to forms in `new.ejs`.
  - Used `valid-feedback` and `invalid-feedback` classes in `new.ejs` and `edit.ejs` for feedback messages.
- Implemented **server-side validations**:
  - Installed `joi` for schema validation.
  - Created `validateListing` middleware in `app.js` to enforce mandatory fields.
  - Applied Joi to the create route to validate API inputs (e.g., via Hoppscotch).
- Set up **error handling**:
  - Created a `utils` folder with:
    - `wrapAsync.js`: Handles asynchronous errors, imported in `app.js`.
    - `ExpressError.js`: Custom error class for invalid routes, displaying "Page Not Found!".
  - Added `error.ejs` in `views`, styled with Bootstrap alerts.
- Explored schema validation approaches:
  - Considered `if` conditions in `wrapAsync` for field checks.
  - Adopted Joi for robust validation in the create route.
