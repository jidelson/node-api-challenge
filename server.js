const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

const actionRouter = require("./data/routers/actionRouter.js");
const projectRouter = require("./data/routers/projectRouter.js");

server.use(express.json());

server.get("/", (req, res) => {
    res.send(`
    <h1>Welcome to the Node API Challenge! Unit 4 Spring 1</h1>
    `)
})

server.use('/actions', actionRouter)
server.use('/projects', projectRouter)

module.exports = server;