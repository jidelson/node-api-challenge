const http = require('http'); 
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet")

const actionRouter = require("./data/routers/actionRouter.js");
const projectRouter = require("./data/routers/projectRouter.js");

const server = express();

server.use(express.json());
server.use(morgan('dev'))
server.use(helmet());


const hostname = 'localhost'; 
const port = 8000; 


server.use("/data", actionRouter, projectRouter);

