import { dbReq, insertOne, getCollection, updateOne } from "../helpers/db.js";
import { issueValidator } from "../models/index.js";

export const submission = (req, res) => {
  const { createdAt, title, description, severity } = req.body;
  const issue = {
    createdAt,
    title,
    description,
    severity,
    completed: false,
  };

  const validatedReq = issueValidator(issue);

  if (validatedReq) {
    dbReq((db, client) => {
      insertOne(db, client, "issues", issue, res);
    });
  } else {
    console.error({ validatedReq });
    res.status(500).end();
  }
};

export const getIssues = (req, res) => {
  dbReq((db, client) => {
    getCollection(db, client, "issues", res);
  });
};

export const updateIssue = (req, res) => {
  console.log("UPDATEISSUE")
  dbReq((db, client) => {
    const { id, complete } = req.body;
    updateOne(db, client, "issues", { id, complete }, res);
  });
};
