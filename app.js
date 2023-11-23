const express = require("express");
const app = express();
const bookRoutes = require("../booAssignment/routes/bookRoute");
const userRoutes=require('./routes/userRoutes')
const dbConfig=require('../booAssignment/dbConfiguration/databaseConnection')
// Body parser middleware
app.use(express.json());

// Routes
app.use("/book", bookRoutes);
app.use("/user", userRoutes);
dbConfig.connectToDatabase();
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
