
import express from 'express'
import router from './routes.js'
const app = express()
app.use(express.json()) // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Middleware to parse URL-encoded bodies
app.use('/api', router)
app.listen(3000, () => {
  console.log(`server is running at port 3000`)
})