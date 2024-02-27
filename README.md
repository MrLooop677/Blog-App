Blog App

Project Overview:
This project is a React.js application that implements a simple blog application. It retrieves articles from a REST API (Json Server) and displays them as a card. The project utilizes Redux Toolkit for state management, Axios for handling API requests, and Styled Components along with Tailwind CSS for styling.

Technologies Used and libraries
React.js
Redux
Redux Toolkit
Axios
Styled Components
Tailwind CSS
react hook form validate
sweet alert
react-router-dom

Project Setup
1-Create a new React.js project using Create React App.
2-Set up Redux and Redux Toolkit for state management.
3-Install Axios to handle API requests.
4-Use Styled Components and Tailwind CSS for styling components.
5-After cloning the repository, navigate to the project directory in your terminal.
6- Run `npm install` to install project dependencies.
7- Once the installation is complete, start the development server by running `npm start`.
8- Your browser should automatically open to `localhost:3000`, displaying the application

API Details
Fake REST API: Json Server [ http://localhost:5000/posts, http://localhost:5000/users]
Response Format: JSON
Supported Methods: POST, GET, PATCH, DELETE

Features Implemented
Display loading indicator while articles are being retrieved.
Handle errors and display error messages for failed API requests.
Add "Read More" button to view article content details.
Implement pagination.
Add search functionality to filter articles by title.

Component Structure
Card: Renders a list of articles.
Back To Home: button back to home page.
LoadingIndicator: Displays loading animation while data is being fetched.
RequestError: Displays error message for failed API requests.
ReadMoreButton: Button to expand article content.
Pagination: Implements pagination for navigating through articles.
SearchBar: Provides search functionality for filtering articles.

Code Organization
src/
components/: Contains React components.
pages/: contain pages in app.
store/: Redux slice files for managing state.
services/: Contains API service files for making requests.
router/: router file.
App.js: Root component.
index.js: Entry point of the application.
