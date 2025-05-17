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
