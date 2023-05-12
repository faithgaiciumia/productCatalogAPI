const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphqlschema");

require("./db");

const app = express();
const port = 5000;

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: true,
  });
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ data: "Hello World, from express" });
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
