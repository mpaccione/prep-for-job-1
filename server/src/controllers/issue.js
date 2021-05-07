import { dbReq, insertOne } from "../helpers/db.js";
import { issueValidator } from "../models/index.js";

export const submission = (req, res) => {
  const { id, createdAt, title, description, severity } = req.body;
  const validatedReq = issueValidator({
    id,
    createdAt,
    title,
    description,
    severity,
  });

  dbReq((db, client) => {
    insertOne(db, client, "issues", validatedReq, res)
  });
};
