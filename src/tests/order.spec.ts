import supertest from "supertest"
import jwt, { Secret } from "jsonwebtoken"

import app from "../server"
import { BaseOrder } from "../models/orderModel"
import { AuthUser } from "../models/userModel"
import { BaseProduct } from "../models/productModel"

const request = supertest(app)
const SECRET = process.env.SECRET as Secret

describe("Order Handler", () => {
    let token: string, order: BaseOrder, user_id: number, product_id: number, order_id: number

    beforeAll(async () => {
        const userData: AuthUser = {
            user_name: "testUser",
            first_name: "test",
            last_name: "user",
            password: "secret"
        }
        const productData: BaseProduct = {
            name: "product sample name",
            price: 100
        }

        const { body: userBody } = await request.post("/users/create").send(userData)

        token = userBody
        
        // @ts-ignore

        const { user } = jwt.verify(token, SECRET);
        user_id = user.id

        const { body: productBody } = await request.post("/products").set("Authorization", "bearer " + token).send(productData)
        product_id = productBody.id
        order = {
            products: [{
                product_id,
                quantity: 1
            }],
            user_id,
            status: true
        }
    })
    
    afterAll(async () => {
        await request.delete(`/users/${user_id}`).set("Authorization", "bearer " + token)
        await request.delete(`/products/${product_id}`).set("Authorization", "bearer " + token)
    })

    it("create order api", (done) => {
        request
            .post("/orders")
            .send(order)
            .set("Authorization", "bearer " + token)
            .then((res: any) => {
                const { body, status } = res


                expect(status).toBe(200)

                order_id = body.id

                done()
            })
    })

    it("list index for orsers", (done) => {
        request
            .get("/orders")
            .set("Authorization", "bearer " + token)
            .then((res: any) => {
                expect(res.status).toBe(200)
                done()
            })
    })

    it("show single order", (done) => {
        request
            .get(`/orders/${order_id}`)
            .set("Authorization", "bearer " + token)
            .then((res: any) => {
                expect(res.status).toBe(200)
                done()
            })
    })

    it("update order", (done) => {
        const newOrder: BaseOrder = {
            ...order,
            status: false
        }

        request
            .put(`/orders/${order_id}`)
            .send(newOrder)
            .set("Authorization", "bearer " + token)
            .then((res:any) => {
                expect(res.status).toBe(200)
                done()
            })
    })

    it("delete order", (done) => {
        request.delete(`/orders/${order_id}`).set("Authorization", "bearer " + token)
            .then((res:any) => {
                expect(res.status).toBe(200)
                done()
            })
    })
})