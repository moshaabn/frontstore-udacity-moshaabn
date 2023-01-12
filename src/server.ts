import express, { Application, Request, Response } from "express"
import bodyParser from "body-parser"
import path from "path"

import userRoutes from "./handlers/user"
import productRoutes from "./handlers/product"
import orderRoutes from "./handlers/order"

const app: Application = express()
let port: number = process.env.ENV === "test"? 3001 :3000
const ip_address: string = `127.0.0.1:${port}`

app.use(bodyParser.json())

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../index.html"))
})

userRoutes(app)
productRoutes(app)
orderRoutes(app)

app.listen(port, () => {
    console.info(`Starting on: http://${ip_address}`)
})

export default app