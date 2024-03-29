import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import colors from "colors"
import connectDB from "./config/db.js"
dotenv.config()

connectDB()
import userRoutes from "./routes/userRoutes.js"
const port = process.env.PORT
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/user', userRoutes)

app.listen(port, () => {
    console.log(`Server Started at Port ${port}`)
})