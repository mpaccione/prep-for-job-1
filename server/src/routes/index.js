import express from "express";
// import { submission } from "../controllers/submissionController.js";

const app = express();

// app.use('/auth', authRoutes )
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(express.json());
app.use(express.urlencoded());

// SUBMISSION
// app.post("/api/submission", submission);

export default app;