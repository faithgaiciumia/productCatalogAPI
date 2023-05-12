## Products Catalog API

This API allows you to manage shop products in a catalog. It can be used alongside a dashboard frontend or a shop mobile application. 

### Queries

#### productsList

Returns a list of all products in the catalog.

```graphql
type Query {
  productsList: [Product!]!
}
```

#### getProductById

Returns a single product by its ID.

```graphql
type Query {
  getProductById(_id: String!): Product
}
```

#### getProductsByName

Returns a list of products that match the specified name.

```graphql
type Query {
  getProductsByName(productName: String!): [Product!]!
}
```

#### getProductsByCategory

Returns a list of products that match the specified category.

```graphql
type Query {
  getProductsByCategory(productCategory: String!): [Product!]!
}
```

### Mutations

#### createProduct

Creates a new product in the catalog.

```graphql
type Mutation {
  createProduct(productInput: ProductInput!): Product!
}
```

#### updateProduct

Updates an existing product in the catalog.

```graphql
type Mutation {
  updateProduct(productInput: ProductInput!): Product!
}
```

#### deleteProduct

Deletes a product from the catalog.

```graphql
type Mutation {
  deleteProduct(_id: String!): Product!
}
```

### Types

#### Product

Represents a product in the catalog.

```graphql
type Product {
  _id: String!
  productName: String!
  productPrice: Float!
  productDescription: String
  productStock: Int!
  productImageUrl: String
  productCategory: String!  
}
```

#### ProductInput

Represents the input required to create or update a product.

```graphql
input ProductInput {
    _id: String
  productName: String!
  productPrice: Float!
  productDescription: String
  productStock: Int!
  productImageUrl: String
  productCategory: String!
  productReviews: [ReviewInput]
  productRelatedProds: [String]
}
```

