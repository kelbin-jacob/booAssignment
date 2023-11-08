const express = require("express");
const app = express();
const bookRoutes = require("../booAssignment/routes/bookRoute");

// Body parser middleware
app.use(express.json());

// Routes
app.use("/user", bookRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
