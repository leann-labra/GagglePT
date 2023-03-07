const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
// const cache = new InMemoryCache({ ...ApolloServer });
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const configuration = new Configuration({
  organization: "org-oj4JLWAUgyqV3zBmg32q3ioe",
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.post("/", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.message,
      max_tokens: 10,
      temperature: 0.7,
    });
    res.json(response);
  } catch (err) {
    res.status(427).json(err);
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
