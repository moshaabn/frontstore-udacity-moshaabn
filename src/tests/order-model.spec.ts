import {BaseOrder, Order, OrderStore} from "../models/orderModel"
import {User, UserStore} from "../models/userModel"
import {Product, ProductStore} from "../models/productModel"

const OrderStoreInstance = new OrderStore()

describe("Order Model", () => {
  const UserStoreInstance = new UserStore()
  const ProductStoreInstance = new ProductStore()

  let order: BaseOrder, user_id: number, product_id: number

  async function createOrder (order: BaseOrder) {
    return OrderStoreInstance.create(order)
  }

  async function deleteOrder (id: number) {
    return OrderStoreInstance.deleteOrder(id)
  }

  beforeAll(async () => {
    const user: User = await UserStoreInstance.create({
      user_name: "test",
      first_name: "test",
      last_name: "test",
      password: "test123"
    })

    user_id = user.id

    const product: Product = await ProductStoreInstance.create({
      name: "order prod",
      price: 100
    })

    product_id = product.id

    order = {
      products: [{
        product_id,
        quantity: 5
      }],
      user_id,
      status: true
    }
  })

  afterAll(async () => {
    await UserStoreInstance.deleteUser(user_id)
    await ProductStoreInstance.deleteProduct(product_id)
  })

  it("should have an index method", () => {
    expect(OrderStoreInstance.index).toBeDefined()
  })

  it("should have a view method", () => {
    expect(OrderStoreInstance.read).toBeDefined()
  })

  it("should have a create method", () => {
    expect(OrderStoreInstance.create).toBeDefined()
  })

  it("should have a delete method", () => {
    expect(OrderStoreInstance.deleteOrder).toBeDefined()
  })

  it("create method should create a order", async () => {
    const createdOrder: Order = await createOrder(order)

    expect(createdOrder).toEqual({
      id: createdOrder.id,
      ...order
    })

    await deleteOrder(createdOrder.id)
  })

  it("index method should list orders", async () => {
    const createdOrder: Order = await createOrder(order)
    const orderList = await OrderStoreInstance.index()

    expect(orderList).toEqual([createdOrder])

    await deleteOrder(createdOrder.id)
  })

  it("show method should view order which is correct", async () => {
    const createdOrder: Order = await createOrder(order)
    const orderFromDb = await OrderStoreInstance.read(createdOrder.id)

    expect(orderFromDb).toEqual(createdOrder)

    await deleteOrder(createdOrder.id)
  })

  it("update method should update the order", async () => {
    const createdOrder: Order = await createOrder(order)
    const newOrderData: BaseOrder = {
      products: [{
        product_id,
        quantity: 200
      }],
      user_id,
      status: false
    }

    const {products, status} = await OrderStoreInstance.update(createdOrder.id, newOrderData)

    expect(products).toEqual(newOrderData.products)
    expect(status).toEqual(newOrderData.status)

    await deleteOrder(createdOrder.id)
  })

  it("delete method should remove the order", async () => {
    const createdOrder: Order = await createOrder(order)

    await deleteOrder(createdOrder.id)

    const orderList = await OrderStoreInstance.index()

    expect(orderList).toEqual([])
  })
})
