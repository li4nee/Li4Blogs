# Blogging Platform README

## Overview

This is a full-stack blogging platform that allows users to create accounts, authenticate, create, edit, and delete blog posts, change their profile information, and add images to both their profiles and blog posts.

## Features

- **User Authentication:** Users can sign up for an account, log in, and log out securely. Passwords are encrypted for security.

- **Profile Management:** Users can view and edit their profile information, including username, email, and profile picture.

- **Blog Management:** Users can create, edit, and delete their blog posts. Each blog post can include a title, body text, and images.

- **Image Upload:** Users can upload profile pictures and images to be included in their blog posts.

## Technologies Used

### Frontend:
- HTML, CSS, JavaScript
- [Express.js](https://expressjs.com/) for handling routes and views
- [EJS](https://ejs.co/) as the templating engine
- [Bootstrap](https://getbootstrap.com/) for styling

### Backend:
- [Node.js](https://nodejs.org/) for server-side JavaScript
- [Express.js](https://expressjs.com/) as the web application framework
- [MongoDB](https://www.mongodb.com/) for database storage
- [Mongoose](https://mongoosejs.com/) as the MongoDB object modeling tool
- [Passport.js](http://www.passportjs.org/) for user authentication
- [Multer](https://www.npmjs.com/package/multer) for handling file uploads

## Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/blogging-platform.git
   cd blogging-platform
2. ## Install Dependencies:

```bash
npm install
```
3. ## Set Up Environment Variables:
-Create a .env file in the root directory.
-Add the following variables:
--
PORT= 8000 OR YOUR_PREFERED_PORT
MONGO_URL= (mongodb://localhost:27017) OR mongo atlas URL
MONGO_COLLECTION=myblogs or any collection name
JWT_SECRET=your secret
--
4. ## Run the Application:
npm start

5. ## Access the Application:
Open your web browser and go to http://localhost: 8000 (OR YOUR_GIVEN_PORT)/  NOTE:REMOVE THE () PART
