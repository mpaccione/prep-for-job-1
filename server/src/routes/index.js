import express from "express";
import { submission, getIssues, updateIssue } from "../controllers/issue.js";

const app = express();
const BASE_PATH = "/api/v1";

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
app.post(BASE_PATH + "/submission", submission);
app.get(BASE_PATH + "/issues", getIssues);
app.post(BASE_PATH + "/update", updateIssue);

export default app;
