import jwt, { Secret } from "jsonwebtoken"
import { User } from "../models/userModel"
import { NextFunction, Request, Response } from "express"

const SECRET = process.env.SECRET as Secret

export function getTokenByUser(user: User) {
    return jwt.sign({ user }, SECRET)
}

export function checkAuthHeader(req: Request, res: Response, next: NextFunction):( void | boolean) {
    if (!req.headers.authorization) {
        res.status(401)
        res.json("access denied")
        return false
    }
    try {
        const token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, SECRET)

        next()
    } catch (err) {
        console.error(err)
        res.status(401)
        res.json("access denied")
        return false
    }
}