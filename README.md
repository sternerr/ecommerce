# Ecommerce API
This projects aims to build a backend API for an ecommerce site, handling user authentication and authorization; product management and order processing.

**Key Functional Areas**
- User Management: Sign up, log in
- Product Management: Add, update, and view product listings.
- Order Management: Placing orders, tracking them, updating statuses.
- Admin Functions: Manage orders and products.


**Project Details**
- **Programming Language:** Typescript
- **Framework:** Express.js
- **Authentication:** jsonwebtoken, bcrypt
- **Programming Paradigm:** Object-oriented programming (OOP)
  
## Entity Relationship Diagram
 ![db-diagram](docs/db-diagram.svg)

## REST API
### Endpoints
**Auth**
| Method | Endpoint        | Description                | 
|--------|-----------------|----------------------------|
| POST   | `/api/v1/auth/sign-up`  | Register a user  |
| POST   | `/api/v1/auth/sign-in`  | Login as a user  |

**Products**
| Method | Endpoint        | Description                | 
|--------|-----------------|----------------------------|
| POST   | `/api/v1/products/`  | Creates a product |
| PUT   | `/api/v1/products/`  | Updates a product |
| GET   | `/api/v1/products/`  | Retrieves all products |
| GET   | `/api/v1/products/:id`  | Retrieves a product based on its id |

**Order**
| Method | Endpoint        | Description                | 
|--------|-----------------|----------------------------|
| POST | `/api/v1/orders/`  | Creates an order |
| GET | `/api/v1/orders/`  | Retrieve all orders as admin |
| GET | `/api/v1/orders/users/:id`  | Retrieve all orders for a user |
| GET | `/api/v1/orders/:id` | Retrieve an order based on its id |
