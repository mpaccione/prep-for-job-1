import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import app from './routes/index.js'
import { dbConnTest } from "../helpers/db.js";

dotenv.config()
dbConnTest()

app.use(morgan('combined'))
app.use(cors())

app.get("/ping", (req, res) => {
  res.send("pong!");
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server Listening at http://localhost:${process.env.SERVER_PORT}`)
})
