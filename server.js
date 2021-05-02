const express = require("express");

const cors = require("cors");

const cookieParser = require("cookie-parser");

require("dotenv").config();

const transactionRoutes = require("./routes/transactions");

const authRoutes = require("./routes/auth");

const errorController = require("./controllers/error");

const app = express();

// body parser
app.use(express.json());

// enable cors
app.use(cors());

// cookie parser
app.use(cookieParser());

// mount routes
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/auth", authRoutes);

// error handler
app.use(errorController.get404);

app.use(errorController.get500);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
