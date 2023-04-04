import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import colors from "colors"
import cors from "cors"
import connectDB from "./config/db.js"
dotenv.config()

connectDB()
/* Routes import */
import userRoutes from "./routes/userRoutes.js"
import fileRequirement from "./routes/fileRequirementRoutes.js"
import announcement from "./routes/announcementRoutes.js"
import event from "./routes/eventRoutes.js"


const port = process.env.PORT
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.use('/api/user', userRoutes)
app.use('/api/announcement', announcement)
app.use('/api/requirements', fileRequirement)
app.use('/api/event', event)


app.listen(port, () => {
    console.log(`Server Started at Port ${port}`)
})