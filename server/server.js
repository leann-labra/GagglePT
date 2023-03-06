const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
//const cache = new InMemoryCache({ ...ApolloServer });
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
require('dotenv').config();

const token = process.env.API_TOKEN;

const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.post ('/', async (req, res) => {
  const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      max_tokens: 7,
      temperature: 0,
    });
      console.log(response)
    // response.then((data) => {
   // res.send({message: data.data.choices[0].text})
    // });
  res.json('hello')
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

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

