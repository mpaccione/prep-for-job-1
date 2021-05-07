import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export const ObjectId = mongodb.ObjectId;

export const dbConnTest = () => {
  dbReq((db, client) => {
    console.log("MongoDB connection successful");
    const listDatabases = async () => {
      try {
        const dbList = await db.admin().listDatabases();
        console.log("Databases:");
        dbList.databases.forEach((db) => console.log(` - ${db.name}`));
      } catch (err) {
        console.error(err);
      }
    };
    console.log(listDatabases());
    client.close();
  });
};

export const dbReq = (dbCb) => {
  mongodb.MongoClient.connect(process.env.DB_URL, function (err, client) {
    if (err) {
      throw err;
    } else {
      const db = client.db(process.env.DB_NAME);
      dbCb(db, client);
    }
  });
};

export const getCollection = (db, client, collectionName, res) => {
  db.collection(collectionName)
    .find()
    .toArray((err, result) => {
      if (err) {
        res.status(500).end();
      } else {
        client.close();
        res.status(200).send(result);
      }
    });
};

export const insertOne = (db, client, collectionName, postObj, res) => {
    db.collection(collectionName).insertOne(postObj, async(err, result) => {
        err ? res.status(500).send(err) : getCollection(db, client, collectionName, res)
    })
}
