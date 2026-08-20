# FullStack E-Commerce Project

A full-stack e-commerce application built with **Angular** and **ASP.NET Core Web API**, providing authentication, authorization, product management, cart and order operations, online payments, and real-time data updates.

---

## Features

### Authentication

* Implemented **JWT Authentication**.
* Implemented **Refresh Token** functionality.
* Automatically refreshes expired access tokens.
* Allows users to continue browsing without manually logging in again.
* Refresh tokens have an expiration time for improved security.

###  Authorization

* Implemented **Role-Based Authorization**.
* Different features and operations are available depending on the user's role.
* Supports:

  * **Customer**
  * **Admin**

> **Demo accounts**

| Role     | Email                       | Password             |
| -------- | --------------------------- | -------------------- |
| Customer | `demo-customer@example.com` | `your-demo-password` |
| Admin    | `demo-admin@example.com`    | `your-demo-password` |

> For security reasons, use dedicated demo credentials that are not reused on any other service.

---

### Category & Product Operations

* Full **CRUD operations** for categories and products.
* Product filtering.
* Pagination.
* Easy product browsing.
* Admin-specific management operations.

---

### Cart & Order Operations

* Customers can add products to their cart.
* Support for custom product quantities.
* Update cart item quantities.
* Create orders from cart items.
* Retrieve order details.

---

### Payment Service

* Integrated **online payment functionality**.
* Customers can securely complete payments for their orders.
* Payment status is associated with the corresponding order.

---

### Receipt Service

* Admin can retrieve receipts.
* Receipt information includes its related components and order information.
* Helps administrators track completed transactions.

---

### Live Updates

* Uses RxJS `interval()` and `startWith()` to periodically retrieve updated data.
* Keeps product information consistent without requiring the user to manually refresh the page.
* Improves the browsing experience when data changes on the backend.

---

### Global Error Handling

* Implemented centralized error handling using an **Angular HTTP Interceptor**.
* Displays backend errors directly in the application.
* Shows:

  * HTTP status code
  * Error message
  * User-friendly notification

##  Technologies

### Frontend

* Angular
* TypeScript
* HTML
* CSS


### Backend

* ASP.NET Core Web API
* C#
* Entity Framework Core
* SQL Server





