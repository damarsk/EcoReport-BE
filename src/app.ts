import express from "express"

// Import Routes
import authRoutes from "./routes/auth.route"

import { errorHandler } from "./middlewares/error.middleware"

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Routes
app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).json({
        message: "Works!"
    })
})
app.use("/api/auth", authRoutes)

app.use(errorHandler)

export default app