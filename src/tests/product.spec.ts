import supertest from "supertest"
import jwt, {Secret} from "jsonwebtoken"

import app from "../server"
import {BaseProduct} from "../models/productModel"
import {AuthUser} from "../models/userModel"

const request = supertest(app)
const SECRET = process.env.SECRET as Secret

describe("Product Handler", () => {
  const product: BaseProduct = {
    name: "product test",
    price: 100
  }

  let token: string, userId: number, productId: number

  beforeAll(async () => {
    const userData: AuthUser = {
      user_name: "test_prod",
      first_name: "tester",
      last_name: "tester",
      password: "1234"
    }

    const {body} = await request.post("/users/create").send(userData)

    token = body

    // @ts-ignore
    const {user} = jwt.verify(token, SECRET)
    userId = user.id
  })

  afterAll(async () => {
    await request.delete(`/users/${userId}`).set("Authorization", "bearer " + token)
  })

  it("create product", (done) => {
    request
    .post("/products")
    .send(product)
    .set("Authorization", "bearer " + token)
    .then((res) => {
      const {body, status} = res

      expect(status).toBe(200)

      productId = body.id

      done()
    })
  })

  it("get products list", (done) => {
    request
    .get("/products")
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })

  it("get one product", (done) => {
    request
    .get(`/products/${productId}`)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })

  it("update product", (done) => {
    const newProductData: BaseProduct = {
      ...product,
      name: "product 1",
      price: 104
    }

    request
    .put(`/products/${productId}`)
    .send(newProductData)
    .set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })

  it("delete product", (done) => {
    request.delete(`/products/${productId}`).set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })
})