require("dotenv").config();
const express = require("express");
const path = require("path");
console.log(process.env.ORG_KEY);
// importing apollo
const { ApolloServer } = require("apollo-server-express");
const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { Configuration, OpenAIApi } = require("openai");


const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3001;
const app = express();

// apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const configuration = new Configuration({
  organization: process.env.ORG_KEY,
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
    console.log("body~ ", req.body);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.userInput,
      max_tokens: 100,
      temperature: 0.5,
    });
    console.log("RESPONSE!~ ", response.data);
    // save to db here
    // saving data to graphQL
    // const { data } = await client.mutate({
    //   mutation: SAVE_DATA_MUTATION,
    //   variables: {
    //     input: req.body.userInput,
    //     output: response.data.choices[0].text,
    //   },
    // });
    // handle the response from the GraphQL server
    // if (data.saveData.success) {
      res.json(response.data.choices[0].text);
    // } else {
    //   throw new Error(data.saveData.message);
    // }
    // save response and req.body to graphql db
    res.json(response.data.choices[0].text);
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
