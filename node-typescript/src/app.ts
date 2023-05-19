require("dotenv").config();

const rookout = require('rookout');
rookout.start({
  token: process.env.ROOKOUT_TOKEN
});

const express = require("express");
const app = express();

app.get('/', (req, res) => {
  console.log("Hello1")
  console.log("Hello2")
  res.send("Hello World");
  console.log("Hello3")
});

app.get("/hello/:name", (req, res) => {
  console.log("Hello4")
  console.log("Hello5")
  res.send("Hello, " + req.params.name);
  console.log("Hello6")
});

console.log("Starting server")
app.listen(3000);
console.log("Server started")