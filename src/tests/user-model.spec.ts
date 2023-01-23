import {AuthUser, User, UserData, UserStore} from "../models/userModel"

const UserStoreInstance = new UserStore()

describe("User Model", () => {
  const user: AuthUser = {
    user_name: "test",
    first_name: "test",
    last_name: "test",
    password: "test123"
  }

  async function createUser (user: AuthUser) {
    return UserStoreInstance.create(user)
  }

  async function deleteUser (id: number) {
    return UserStoreInstance.deleteUser(id)
  }

  it("should have an index method", () => {
    expect(UserStoreInstance.index).toBeDefined()
  })

  it("should have a show method", () => {
    expect(UserStoreInstance.read).toBeDefined()
  })

  it("should have a create method", () => {
    expect(UserStoreInstance.create).toBeDefined()
  })

  it("should have a remove method", () => {
    expect(UserStoreInstance.deleteUser).toBeDefined()
  })

  it("create method should create a user", async () => {
    const createdUser: User = await createUser(user)

    if (createdUser) {
      const {user_name, first_name, last_name} = createdUser

      expect(user_name).toBe(user.user_name)
      expect(first_name).toBe(user.first_name)
      expect(last_name).toBe(user.last_name)
    }

    await deleteUser(createdUser.id)
  })

  it("index method should return a list of users", async () => {
    const createdUser: User = await createUser(user)
    const userList = await UserStoreInstance.index()

    expect(userList).toEqual([createdUser])

    await deleteUser(createdUser.id)
  })

  it("show method should return the correct users", async () => {
    const createdUser: User = await createUser(user)
    const userFromDb = await UserStoreInstance.read(createdUser.id)

    expect(userFromDb).toEqual(createdUser)

    await deleteUser(createdUser.id)
  })

  it("remove method should remove the user", async () => {
    const createdUser: User = await createUser(user)

    await deleteUser(createdUser.id)

    const userList = await UserStoreInstance.index()

    expect(userList).toEqual([])
  })

  it("update method should update the user", async () => {
    const createdUser: User = await createUser(user)
    const newUserData: UserData = {
      first_name: "test2",
      last_name: "test2",
    }

    const {first_name, last_name} = await UserStoreInstance.update(createdUser.id, newUserData)

    expect(first_name).toEqual(newUserData.first_name)
    expect(last_name).toEqual(newUserData.last_name)

    await deleteUser(createdUser.id)
  })

  it("authenticates the user with a password", async () => {
    const createdUser: User = await createUser(user)

    const userFromDb = await UserStoreInstance.authenticate(user.user_name, user.password)

    if (userFromDb) {
      const {user_name, first_name, last_name} = userFromDb

      expect(user_name).toBe(user.user_name)
      expect(first_name).toBe(user.first_name)
      expect(last_name).toBe(user.last_name)
    }

    await deleteUser(createdUser.id)
  })
})
