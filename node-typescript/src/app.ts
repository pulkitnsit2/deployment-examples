#!/usr/bin/env node

"use strict";
const rookout = require('rookout');
rookout.start();

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

app.listen(3000);
