const http = require('http'); 

const hostname = 'localhost'; 
const port = 8000; 
const express = require("express");
const server = express();
const hubsRouter = require("./data/routers/router.js");

server.use("/data", hubsRouter);

