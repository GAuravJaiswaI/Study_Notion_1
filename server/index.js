// Importing necessary modules and packages
require("dotenv").config(); // Load environment variables at the start
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const helmet = require("helmet"); // Security middleware

// Importing configurations & routes
const connectDB = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");

// Setting up the port number
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // Adds security headers
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // Allow frontend origin
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connecting to the database
connectDB();

// Connecting to Cloudinary
cloudinaryConnect();

// Setting up API routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Graceful shutdown for handling process termination
process.on("SIGINT", async () => {
  console.log("\n⏳ Closing server...");
  server.close(() => {
    console.log("🔴 Server shut down");
    process.exit(0);
  });
});
