import express from "express";
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'

const app = express()

app.use(express.json())
app.use('/backend/auth', authRoutes)
app.use('/backend/users', userRoutes)
app.use('/backend/posts', postRoutes)


app.listen(3001, () => {
    console.log("Enter CHADren")
})