# Blogging Platform README

## Overview

This comprehensive full-stack blogging platform provides users with the capability to seamlessly create, edit, and delete blog posts while ensuring robust authentication measures are in place. 

## Features

- **User Authentication:** Users can sign up for an account, log in, and log out securely. Passwords are encrypted for security.

- **Profile Management:** Users can view and edit their profile information, including username,password, email,profile image, and their blogs.

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
- JWT for user authentication
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
## Set Up Environment Variables:

1. **Create a `.env` file in the root directory.**

2. **Add the following variables:**

```plaintext
PORT=8000  # Replace with your preferred port
MONGO_URL=mongodb://localhost:27017  # Replace with your MongoDB connection URL or use MongoDB Atlas URL
MONGO_COLLECTION=myblogs  # Replace with your desired MongoDB collection name
JWT_SECRET=your_secret  # Replace with your JWT secret
```
4. ## Run the Application:
npm run dev

5. ## Access the Application:
Open your web browser and go to http://localhost: 8000 (OR YOUR_GIVEN_PORT)/  NOTE:REMOVE THE () PART
