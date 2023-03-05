// using an express server I will to handle api requests and respond back with a json oobject and use body parser and cors

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: "org-oj4JLWAUgyqV3zBmg32q3ioe",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

//POST route to OPEN AI
app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 10,
    temperature: 0.7,
  });
  console.log(response.data);
  if (response.data.choices[0].text) {
    res.json({ message: response.data.choices[0].text });
  }
});

app.listen(port, () => {
  console.log("example app listening");
});
