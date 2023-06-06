import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import categoriesRoute from "./routes/categories.js";
import reviewsRoute from "./routes/reviews.js";
import softwareRoute from "./routes/software.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

//mongoose.set("strictQuery", true);

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((err) => {
      throw err;
    });
};

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected.");
});

//middlewares

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/software", softwareRoute);
app.use("/api/users", usersRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 2023, () => {
  connect();
  console.log("Connected to Backend!");
});
