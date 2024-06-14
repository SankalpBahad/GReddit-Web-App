# Greddit Web Application
## Introduction
Greddit is a web application that allows users to create and participate in various sub-greddiits (forums) where they can post content, comment, upvote, and downvote posts. The application is built using React for the frontend and Node.js for the backend, with MongoDB Atlas as the online database for storing data.
## Prerequisites
Before running the application, ensure that you have the following installed:
  
  Node.js
  
  npm (Node Package Manager)

## Getting Started
Follow these steps to run the Greddit Web Application:

Clone the repository or download the source code.
Open two separate terminal windows/tabs.

### Frontend

Navigate to the frontend folder: cd frontend
Install the dependencies: npm install
Start the React app: npm start
The React app will open in your default browser at http://localhost:3000.

### Backend

Navigate to the backend folder: cd backend
Install the dependencies: npm install
Start the backend server: npm run dev
The backend server will start running on http://localhost:5000.

Note: The MongoDB Atlas connection string is present in the .env file located in the backend folder (/backend/.env). The connection string is commented out for security purposes.
### Usage

1. When you first open the React app, it will navigate to the Login Page by default. If you don't have an account, you can sign up by providing the required information (username, first and last name, email, and password).
2. After successful login or registration, you will be redirected to the Home Page, which displays links to various locations and a logout button in the top-right corner.
3. In the "My Sub Greddiits" section, you can create a new sub-greddiit by clicking the "Add New" button in the top-left corner. This section displays the sub-greddiits created and managed by the user.
4. When you enter a sub-greddiit from the "My Sub Greddiits" section, additional links for Users, Joined Requests, Reports, and Stats pages will be available in the navbar.
5. The "All Sub Greddiits" section provides sorting options for displaying sub-greddiits. There is also a "None" option that removes any sorting applied to the data.
6. To make a post in a sub-greddiit, click the "Add New Post" button, type the post content, and click "Submit". Refresh the page to see the new post.
7. To comment, upvote, or downvote a post, click the respective buttons and refresh the page.
8. To submit a report, fill in your concern and click "Submit". You will be redirected to the page containing all posts of the sub-greddiit.
9. The "Users" page displays a list of non-blocked and blocked users. Refresh the page to see any updates.
10. The "Joining Requests" page lists all joining requests, with options to accept or reject them. Refresh the page to see any updates.
11. The "Reports" page displays a list of reports, with three options to handle them. Refresh the page after performing any action.
12. The "Saved Posts" page displays an exact copy of the posts you have saved, with an option to remove them from the saved list. Refresh the page to see any updates.
13. The "Profile" page allows you to edit certain fields, view your followers and following, and displays all information about the user.

Important Note: When entering banned keywords, do not include a comma at the end. For example, enter "test" instead of "test,".
### Backend Structure

  All GET and POST requests in the backend are stored in the index.js file.
  Data schemas are stored in the /backend/models folder.
