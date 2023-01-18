import { Application, Request, Response } from "express"
import { User, UserStore } from "../models/userModel"
import { checkAuthHeader, getTokenByUser } from "./auth"

const UserStoreInstance = new UserStore()

const index = async (req: Request, res: Response) => {
    try {
        const users: User[] = await UserStoreInstance.index()

        res.json(users)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const first_name = req.body.first_name as unknown as string
        const last_name = req.body.last_name as unknown as string
        const user_name = req.body.user_name as unknown as string
        const password = req.body.password as unknown as string

        if (first_name === undefined || last_name === undefined || user_name === undefined || password === undefined) {
            res.status(400)
            res.send("Some required parameters are missing")
            return false
        }
        const user: User = await UserStoreInstance.create({ 
            first_name, 
            last_name, 
            user_name, 
            password 
        })
        res.json(getTokenByUser(user))
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

const read = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number

        if (id === undefined) {
            res.status(400)
            res.send("Missing required parameter :id.")
            return false
        }

        const user: User = await UserStoreInstance.read(id)

        res.json(user)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

const update = async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const id = req.params.id as unknown as number
        const first_name = req.body.first_name as unknown as string
        const last_name = req.body.last_name as unknown as string
        console.log(id, first_name, last_name)

        if (first_name === undefined || last_name === undefined || id === undefined) {
            res.status(400)
            res.send("Some required parameters are missing!")
            return false
        }
        const user: User = await UserStoreInstance.update(id, { first_name, last_name })
        res.status(200)
        res.json(user)
    } catch (e) {
        console.log(e)
        res.status(400)
        res.json(e)
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as unknown as number

        if (id === undefined) {
            res.status(400)
            res.send("id required.")
            return false
        }

        await UserStoreInstance.deleteUser(id)

        res.send(`User deleted.`)
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const user_name = req.body.user_name as unknown as string
        const password = req.body.password as unknown as string
        
        if (user_name === undefined || password === undefined) {
            res.status(400)
            res.send("Some required parameters are missing")
            return false
        }
        
        const user: User | null = await UserStoreInstance.authenticate(user_name, password)
        
        if (user === null) {
            res.status(401)
            res.send(`Wrong password for user ${user_name}.`)

            return false
        }

        res.json(getTokenByUser(user))
    } catch (e) {
        res.status(400)
        res.json(e)
    }
}

export default function userRoutes(app: Application) {
    app.get("/users", checkAuthHeader, index)
    app.post("/users/create", create)
    app.get("/users/:id", checkAuthHeader, read)
    app.put("/users/:id", checkAuthHeader, update)
    app.delete("/users/:id", checkAuthHeader, deleteUser)
    app.post("/users/auth", authenticate)
}