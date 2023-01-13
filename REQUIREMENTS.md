# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index [GET] /products 
- Show [GET] /products/:id
- Create [POST] (auth token required) /products
- update [POST] (auth token required) /products/:id 
- delete [POST] (auth token required) /products/:id 

#### Users
- Index [token required] [GET] /users 
- Show [token required] [GET] /users/:id
- Create N[token required] [POST] /users/create
- Update [token required] [PUT] /users/:id
- Delete [token required] [DELETE] /users/:id
- Login [token required] [POST] /users/login


#### Orders
- Index [GET] /orders  [token required]
- Create [POST] /orders  [token required]
- Show [GET] /orders/:id  [token required]
- Update [PUT] /orders/:id  [token required]
- Delete [DELETE] /orders/:id  [token required]

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- user_name
- first_name
- last_name
- password_digest

#### Orders
- id
- user_id
- status of order (active or complete)

#### OrderProducts
-order_id 
-product_id
-quantity

