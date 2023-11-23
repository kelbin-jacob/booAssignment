# bookAssignment
This Node.js assignment involves performing basic CRUD (Create, Read, Update, Delete) operations using Express.js, MongoDb, and Mongoose.

Project Structure
The project includes the following main files and folders:

app.js: Entry point of the application
routes/: Directory containing route definitions
controllers/: Directory containing logic for CRUD operations
models/: Directory for defining Mongoose models
config/: Contains configuration settings
package.json: Contains project metadata and dependencies
.env: File to store environment-specific credentials
Installation
To run the project, follow these steps:

Clone the repository.

Install project dependencies using the following command:

npm install


Set up the environment variables by creating a .env file at the project root with the following content:


//Copy code
DATABASE_NAME=Node
MONGO_CONNECTION_URL='mongodb+srv://kelbinjacob:Vadakkan1234@cluster0.9ihj6ua.mongodb.net/Node'


Start the application by running:

npm start
Usage
The server will start on the specified port (usually port 3000 by default). The CRUD operations can be performed using appropriate API endpoints.

API Endpoints
//Book
POST /book/addBook: Create a new book
PUT /book/updateBook/:id: Update a book by ID
DELETE /book/deleteBook/:id:  Delete a book by ID
GET /book/getAllBooks: Retrieve all books
GET /book/getBookById:  Retrieve book by id
//user
POST /user/addUser: Create a new user
POST /user/login: user login

role:
ADMIN:0,
USER:1,


Technologies Used
Node.js
Express.js
MongoDb
Mongoose