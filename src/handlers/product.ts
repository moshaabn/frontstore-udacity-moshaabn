import { Application, Request, Response } from "express"
import { Product, ProductStore } from "../models/productModel"
import { checkAuthHeader } from "./auth"

const productStore = new ProductStore()

const index = async (req: Request, res: Response): Promise<void | boolean> => {
    try {
        const products: Product[] = await productStore.index()
        res.json(products)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

const create = async (req: Request, res: Response): Promise<void | boolean> => {
    try {
        const name = req.body.name as unknown as string
        const price = req.body.price as unknown as number

        if (name === undefined || price === undefined) {
            res.status(400)
            res.send("parameters are missing!")
            return false
        }

        const product: Product = await productStore.create({ name, price })

        res.json(product)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

const read = async (req: Request, res: Response): Promise<void | boolean> => {
    try {
        const id = req.params.id as unknown as number

        if (id === undefined) {
            res.status(400)
            res.send("Missing required parameter :id.")
            return false
        }

        const product: Product = await productStore.read(id)

        res.json(product)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

const update = async (req: Request, res: Response): Promise<void | boolean> => {
    try {
        const id = req.params.id as unknown as number
        const name = req.body.name as unknown as string
        const price = req.body.price as unknown as number

        if (name === undefined || price === undefined || id === undefined) {
            res.status(400)
            res.send("Some required parameters are missing! eg. :name, :price, :id")
            return false
        }

        const product: Product = await productStore.update(id, { name, price })

        res.json(product)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

const deleteProduct = async (req: Request, res: Response): Promise<void | boolean> => {
    try {
        const id = req.params.id as unknown as number

        if (id === undefined) {
            res.status(400)
            res.send("id is required.")
            return false
        }

        await productStore.deleteProduct(id)

        res.send(`Product with id ${id} successfully deleted.`)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

export default function productRoutes(app: Application) {
    app.get("/products", index)
    app.post("/products", checkAuthHeader, create)
    app.get("/products/:id", read)
    app.put("/products/:id", checkAuthHeader, update)
    app.delete("/products/:id", checkAuthHeader, deleteProduct)
}