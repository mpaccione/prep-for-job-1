import express from "express";
const app = express();
const PORT = 3000;


app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
    console.log("Server Listening at http://localhost:3000")
})
