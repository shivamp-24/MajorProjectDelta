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

### Day 4: Review System Implementation

- **Review Model Creation**:
  - Created `review.js` in the `models` folder to define `reviewSchema`.
  - Updated `listingSchema` in `listing.js` to include a `reviews` array storing `ObjectId` references to reviews.
- **Review Creation**:
  - Updated `show.ejs` to include a form for submitting reviews, using Bootstrap classes (`form-label`, `form-range`, `form-control`).
  - Added a POST route in `app.js` at `/listings/:id/reviews` to handle review submissions.
- **Review Validations**:
  - Implemented client-side form validations in `show.ejs` using Bootstrap.
  - Added server-side validations using Joi to ensure valid review data.
- **Rendering Reviews**:
  - Modified the show route in `app.js` to use `.populate` for fetching and displaying review details in `show.ejs`.
  - Styled reviews in `show.ejs` using Bootstrap cards for a clean presentation.
- **Deleting Reviews**:
  - Added a delete form in `show.ejs` to send a DELETE request to `/listings/:id/reviews/:reviewId` in `app.js`.
  - Ensured deleted reviews are removed from the `listing.reviews` array in the database.
- **Handling Listing Deletion**:
  - Implemented a post-middleware in `listing.js` to delete all associated reviews when a listing is removed from the database.

### Day 5: Route Modularization and Session-Based Feedback

- **Express Router for Listings and Reviews**:
  - Created a `routes` folder with two files: `listing.js` and `reviews.js`.
  - Moved all listing-related routes from `app.js` to `listing.js`.
  - Moved all review-related routes from `app.js` to `reviews.js`.
  - Configured `reviews.js` with `mergeParams: true` to inherit parent route parameters (e.g., listing `id`) from `app.js`.
- **Express Session Implementation**:
  - Installed `express-session` using `npm i express-session`.
  - Configured session middleware in `app.js` to enable session management.
  - Added `sessionOptions` with cookie settings for `expires` and `maxAge` to control session duration.
- **Connect-Flash Integration**:
  - Installed `connect-flash` using `npm i connect-flash`.
  - Set up flash middleware in `app.js` to display success messages.
  - Added success flash messages for creating a new listing.
- **Flash Success Notifications**:
  - Created `flash.ejs` in the `includes` folder, styled with Bootstrap for success alerts.
  - Included `flash.ejs` in `boilerplate.ejs`, displaying success messages only when they exist and have a length greater than 0.
  - Added success flash messages in routes for:
    - Creating a review.
    - Deleting a review.
    - Creating a listing.
    - Deleting a listing.
- **Flash Failure Notifications**:
  - Implemented failure flash messages for cases when a listing does not exist, such as:
    - Attempting to show a non-existent listing.
    - Attempting to edit a non-existent listing.

### Day 6: Authentication and Authorization

- **Passport Authentication Setup**:
  - Installed dependencies: `npm i passport`, `npm i passport-local`, `npm i passport-local-mongoose`.
  - Created `user.js` in the `models` folder to define `userSchema`, with `passport-local-mongoose` handling `username`, `hashed password`, and `salt`, and added `email` field.
  - Configured Passport in `app.js`:
    - Used `passport.initialize()` to initialize Passport middleware.
    - Added `passport.session()` after `sessionOptions` for persistent user sessions.
    - Set up `passport.use(new LocalStrategy(User.authenticate()))` for authentication.
    - Defined `serializeUser` and `deserializeUser` functions to manage user session storage.
- **User Signup**:
  - Created `user.js` in the `routes` folder for user-related routes, integrated into `app.js`.
  - Created a `users` folder in `views` with `signup.ejs`, using the boilerplate layout.
    - **GET /signup**: Rendered `signup.ejs` with a signup form.
    - **POST /signup**: Handled form submission to create and register a new user with `req.body` details and password, using `wrapAsync` and try-catch for error handling (e.g., duplicate user).
  - Enabled automatic login after signup using `req.login()` in the POST `/signup` route.
- **User Login**:
  - Created `login.ejs` in the `users` folder with a form for `username` and `password`.
    - **GET /login**: Rendered `login.ejs` for the login form.
    - **POST /login**: Used Passport middleware to authenticate users, redirecting on success or failure (e.g., wrong password).
  - Created `middleware.js` with an `isLoggedIn` middleware using `isAuthenticated()` to ensure users are logged in before adding, editing, or deleting listings, applied to relevant routes.
- **User Logout**:
  - Implemented a GET `/logout` route in `user.js` using `passport.logout()` to end user sessions, leveraging `serializeUser` and `deserializeUser`.
- **Navbar Styling for Authentication**:
  - Updated `navbar.ejs` to include signup, login, and logout links.
  - Used `req.user` to conditionally display links based on login status (`undefined` when not logged in, object when logged in).
  - Defined `res.locals.currUser = req.user` in `app.js` to make `req.user` accessible in `navbar.ejs` for conditional rendering.
- **Post-Login Redirection**:
  - Created `saveRedirectUrl` middleware in `middleware.js` to store `req.originalUrl` in `res.locals` before Passport resets `req.session`.
  - Saved `req.session.redirectUrl = req.originalUrl` in `isLoggedIn` middleware for protected routes (e.g., add/edit listing).
  - Redirected users to `res.locals.redirectUrl` or `/listings` (fallback) after login in POST `/login` to handle cases like logging in from the homepage.
- **Listing Ownership**:
  - Added an `owner` field to `listingSchema` in `listing.js` to store the user `ObjectId`.
  - Mapped existing listings to an owner ID during database initialization in `init/index.js`.
  - Populated `owner` details in show routes using `.populate("owner")` for display in `show.ejs`.
  - Set the owner of new listings to the currently logged-in user via `req.user._id`.
- **Authorization for Listings**:
  - Hid edit and delete buttons in `show.ejs` when `currUser._id` does not match `listing.owner._id` or no user is logged in, using an if condition.
  - Created `isOwner` middleware in `middleware.js` to verify ownership, applied to edit and delete routes to prevent unauthorized API requests (e.g., via Hoppscotch or Postman).
- **Authorization for Reviews**:
  - Updated `reviewSchema` to include an `author` field storing the user `ObjectId`.
  - Hid the review form in `show.ejs` when not logged in and added `isLoggedIn` middleware to the review POST route.
  - Used nested `.populate` in `listing.js` to fetch reviews and their authors for display in `show.ejs`.
  - Created `isReviewAuthor` middleware in `middleware.js` to ensure only the review author can delete a review, applied to the delete route.
