import App from "./src/App";

// using an express server I will to handle api requests and respond back with a json oobject and use body parser and cors
const { Configuration, OpenAIApi } = require("openai");

const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;
require('dotenv').config();

const token = process.env.API_TOKEN;

const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);


const app =express();
app.use(bodyParser.json() );
app.use(cors() );

app.post ('/message', async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
      });

      response.then((data) => {
        res.send({message: data.data.choices[0].text})
      });
});

app.listen(3000, () => {
    console.log('Dog. Fr. Im listening')
});

export default App