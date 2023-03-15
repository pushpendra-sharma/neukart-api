# NeuKart API

NeuKart-API is a basic e-commerce backend service for [NeuKart](https://github.com/Pushpendra-Sharma/neu-kart).

## Tech Stack

**Server:** Node, Express, Mongoose

## API Reference

#### User login

```http
  POST users/login
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `password` | `string` | **Required**. user password |
| `email`    | `string` | **Required**. user email    |

#### User Signup

```http
  POST users/signup
```

| Body           | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `name`         | `string` | **Required**. user name          |
| `email`        | `string` | **Required**. user email         |
| `password`     | `string` | **Required**. user password      |
| `mobileNumber` | `string` | **Required**. user mobile number |
| `gender`       | `string` | **Optional**. user gender        |
| `dateOfBirth`  | `date`   | **Optional**. user dateOfBirth   |
| `address`      | `string` | **Optional**. user's address     |

#### Get all products

```http
  GET /products
```

#### Get product details by productId

```http
  GET /products/${productId}
```

| Parameter   | Type     | Description                          |
| :---------- | :------- | :----------------------------------- |
| `productId` | `string` | **Required**. Id of product to fetch |

#### Add product

```http
  POST products/addProduct
```

| Body           | Type      | Description                               |
| :------------- | :-------- | :---------------------------------------- |
| `productName`  | `string`  | **Required**. product name                |
| `description`  | `string`  | **Required**. product description         |
| `category`     | `string`  | **Required**. product category            |
| `company`      | `string`  | **Required**. product company             |
| `price`        | `number`  | **Optional**. product price               |
| `mrp`          | `number`  | **Required**. product mrp                 |
| `discount`     | `number`  | **Optional**. product discount in percent |
| `offer`        | `string`  | **Optional**. product offer if any        |
| `features`     | `string`  | **Optional**. product features            |
| `availability` | `boolean` | **Optional**. product availability        |
| `rating`       | `number`  | **Optional**. product rating              |
| `imageUrl`     | `string`  | **Optional**. product imageUrl            |

#### Add product by productId to cart

```http
  POST /cart/add/${userId}/${productId}
```

| Parameter   | Type     | Description                            |
| :---------- | :------- | :------------------------------------- |
| `productId` | `string` | **Required**. productId to add in cart |
| `userId`    | `string` | **Required**. userId of user           |

#### Remove product by productId from cart

```http
  DELETE /cart/remove/${userId}/${productId}
```

| Parameter   | Type     | Description                                 |
| :---------- | :------- | :------------------------------------------ |
| `productId` | `string` | **Required**. productId to remove from cart |
| `userId`    | `string` | **Required**. userId of user                |

#### Get cart items of a user

```http
  POST /cart/${userId}
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `userId`  | `string` | **Required**. userId of user |

#### Add product by productId to cart

```http
  POST /wishlist/add/${userId}/${productId}
```

| Parameter   | Type     | Description                                |
| :---------- | :------- | :----------------------------------------- |
| `productId` | `string` | **Required**. productId to add in wishlist |
| `userId`    | `string` | **Required**. userId of user               |

#### Remove product by productId from wishlist

```http
  DELETE /wishlist/remove/${userId}/${productId}
```

| Parameter   | Type     | Description                                     |
| :---------- | :------- | :---------------------------------------------- |
| `productId` | `string` | **Required**. productId to remove from wishlist |
| `userId`    | `string` | **Required**. userId of user                    |

#### Get wishlist items of a user

```http
  POST /wishlist/${userId}
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `userId`  | `string` | **Required**. userId of user |

## 🔗 Connect With Me

- [Portfolio](https://pushpendra-sharma.netlify.app/)

- [Linkedin](https://www.linkedin.com/in/ietl-pushpendra-sharma/)

## Authors

- [Pushpendra Sharma](https://github.com/Pushpendra-Sharma)
