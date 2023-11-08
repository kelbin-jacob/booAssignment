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
DATABASE_NAME=BrewApps
MONGO_CONNECTION_URL='mongodb+srv://kelbinjacob:Vadakkan1234@cluster0.9ihj6ua.mongodb.net/BrewApps'


Start the application by running:

npm start
Usage
The server will start on the specified port (usually port 3000 by default). The CRUD operations can be performed using appropriate API endpoints.

API Endpoints

POST /user/addBook: Create a new book
PUT /user/updateBook/:id: Update a book by ID
DELETE /user/deleteBook/:id:  Delete a book by ID
GET /user/getAllBooks: Retrieve all books
GET /user/getBookById:  Retrieve book by id


Technologies Used
Node.js
Express.js
MongoDb
Mongoose