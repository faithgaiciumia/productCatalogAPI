const ProductsModel = require("./models/products");

//graphql schema
const typeDefs = `
type Product {
    _id:String!
    productName: String!
    productPrice: Float
    productDescription: String
    productStock: Int!
    productImageUrl: String
    productCategory: String!
}
input ProductInput{
    _id: String
    productName: String!
    productPrice: Float!
    productDescription: String
    productStock: Int!
    productImageUrl: String
    productCategory: String!
}

type Query {
    productsList: [Product!]!
    getProductById(_id: String!): Product
    getProductsByName(productName: String!): [Product!]!
    getProductsByCategory(productCategory: String!): [Product!]!
}
type Mutation{
    createProduct(productInput: ProductInput!): Product!
    updateProduct(productInput: ProductInput!): Product!
    deleteProduct(_id: String!): Product!
}
`;

//graphql resolvers
// querries
const productsList = async () => {
  let products = [];
  await ProductsModel.find({}).then((data) => {
    products = data;
  });
  return products;
};
const getProductById = async (_, { _id }) => {
  let product;
  await ProductsModel.findById(_id).then((data) => {
    product = data;
  });
  return product;
};
const getProductsByName = async (_, { productName }) => {
  let products = [];
  await ProductsModel.find({
    productName: { $regex: productName, $options: "i" },
  }).then((data) => {
    products = data;
  });
  return products;
};
const getProductsByCategory = async (_ , {productCategory}) => {
  let products;
  await ProductsModel.find({ productCategory }).then((data) => {
    products = data;
  });
  return products;
};

//mutations
const createProduct = async (_, { productInput }) => {
  const { productName, productPrice, productStock, productCategory } =
    productInput;

  // Check if required fields are present
  if (!productName || !productPrice || !productStock || !productCategory) {
    throw new Error("Required fields are missing");
  }

  // Check if product name already exists
  const existingProduct = await ProductsModel.findOne({ productName });
  if (existingProduct) {
    throw new Error("Product name already exists");
  }

  // No errors; Create new product and save to database
  const newProduct = new ProductsModel(productInput);
  try {
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};
const updateProduct = async (_, { productInput }) => {
  const { _id, productName, productPrice, productStock, productCategory } =
    productInput;

  // Check if required fields are present
  if (
    (!_id, !productName || !productPrice || !productStock || !productCategory)
  ) {
    throw new Error("Required fields are missing");
  }

  // Update product and save to database
  try {
    const updatedProduct = await ProductsModel.findByIdAndUpdate(
      _id,
      productInput,
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    throw new Error("Failed to update product");
  }
};
const deleteProduct = async (_, { _id }) => {
  try {
    const deletedProduct = await ProductsModel.findByIdAndDelete(_id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    return deletedProduct;
  } catch (error) {
    throw new Error("Failed to delete product");
  }
};

//resolvers put together
const resolvers = {
  Query: {
    productsList,
    getProductById,
    getProductsByName,
    getProductsByCategory,
  },
  Mutation: {
    createProduct,
    updateProduct,
    deleteProduct,
  },
};

module.exports = { typeDefs, resolvers };
