require("dotenv").config();
import { logger } from './winston'

const rookout = require('rookout');
rookout.start({
  token: process.env.ROOKOUT_TOKEN
});

const express = require("express");
const app = express();

app.get('/', (req, res) => {
  logger.info("Info / log1")
  res.send("Hello World");
});

app.get("/hello/:name", (req, res) => {
  logger.info("Info /hello log1")
  logger.info("Info /hello log2")
  logger.debug("Debug /hello log1")
  logger.debug("Debug /hello log2")
  res.send("Hello, " + req.params.name);
});

console.log("Starting server")
app.listen(3000);
console.log("Server started")