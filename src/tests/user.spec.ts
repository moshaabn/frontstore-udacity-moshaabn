import supertest from "supertest"
import jwt, {Secret} from "jsonwebtoken"

import app from "../server"
import {AuthUser} from "../models/userModel"

const request = supertest(app)
const SECRET = process.env.SECRET as Secret

describe("User Handler", () => {
  const userData: AuthUser = {
    user_name: "test",
    first_name: "test",
    last_name: "test",
    password: "1234"
  }

  let token: string, userId: number = 1

  it("should require authorization on every endpoint", async () => {
    await request
    .get("/users")
    .then((res) => {
      expect(res.status).toBe(401)
    })

    await request
    .get(`/users/${userId}`)
    .then((res) => {
      expect(res.status).toBe(401)
    })

    await request
    .put(`/users/${userId}`)
    .send({
      first_name: userData.first_name + "test2",
      last_name: userData.last_name + "test2"
    })
    .then((res) => {
      expect(res.status).toBe(401)
    })

    await request
    .delete(`/users/${userId}`)
    .then((res) => {
      expect(res.status).toBe(401)
    })
  })

  it("gets the create endpoint", async () => {
    await request
    .post("/users/create")
    .send(userData)
    .then((res) => {
      const {body, status} = res
      token = body

      // @ts-ignore
      const {user} = jwt.verify(token, SECRET)
      userId = user.id

      expect(status).toBe(200)
    })
  })

  it("gets the index endpoint", async () => {
    await request
    .get("/users")
    .set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
    })
  })

  it("gets the read endpoint", async () => {
    await request
    .get(`/users/${userId}`)
    .set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
    })
  })

  it("gets the update endpoint", async () => {
    const newUserData: AuthUser = {
      ...userData,
      first_name: "test3",
      last_name: "test3"
    }

    await request
    .put(`/users/${userId}`)
    .send(newUserData)
    .set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
    })
  })

  it("gets the auth endpoint", async () => {
    await request
    .post("/users/auth")
    .send({
      user_name: userData.user_name,
      password: userData.password
    })
    .set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
    })
  })

  it("gets the auth endpoint with wrong password", async () => {
    await request
    .post("/users/auth")
    .send({
      user_name: userData.user_name,
      password: "wrongpwd"
    })
    .set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(401)
    })
  })

  it("gets the delete endpoint", async () => {
   await request
    .delete(`/users/${userId}`)
    .set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
    })
  })
})