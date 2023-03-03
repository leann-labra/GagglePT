// using an express server I will to handle api requests and respond back with a json oobject and use body parser and cors

const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port= 3001;


app.use(bodyParser.json() );
app.use(cors() );

app.post('', (req, res) => {
    res.json({
        message: "Hello World"
    })
});

app.listen(port, () => {
    console.log('example app listening');
});