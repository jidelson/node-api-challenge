const express = require('express');

const Hubs = require('../helpers/actionModel.js');

const router = express();

// GET
router.get("/", (req, res) => {
    if(!actions){
        res.status(500).json({ error: "The actions information could not be retrieved." })
    }
    else{
        Hubs.get(req.body)
        .then(hub => {
            res.status(201).json(actions)
        })
    }
})

//GET BY ID
router.get("/:id", (req, res) => {
    const id = req.params.id

    const action = actions.find(a => a.id === id)

    if(!action.id){
        res.status(404).json({ message: "The action with the specified ID does not exist." })
    }
    else{
        Hubs.get(req.body)
        .then(hub => {
            res.status(201).json(action)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The action information could not be retrieved." })
        })
    }
})

// POST
router.post("/", (req, res) => {
    const action = req.body

    if (!action.project_id || !action.description || !action.notes) {
        res.status(400).json({ errorMessage: "Please provide title and notes for the action." })
    }
    else {
        Hubs.insert(req.body)
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error adding the hub'
            })
        })
    }
})

// POST BY ID
router.post("/:id", (req, res) => {
    const action = req.body

    const id = req.params.id

    if(!action.id){
        res.status(404).json({ message: "The action with the specified ID does not exist." })
    }
    else{
        Hubs.add(req.body)
        .then(hub => {
            action.insert(action)
            res.status(201).json(action)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the action to the database" 
            })
        })
    }
})

// DELETE
router.delete("/:id", (req, res) => {
    
    const id = req.params.id

    const deletedAction = actions.remove(a => a.id === id)
    if(deletedAction.length > 0) {
        actions = actions.filter(a => a.id !== id)
        res.status(200).json(deletedAction)
    } else {
        Hubs.remove(req.body)
        .then(hub => {
            res.status(404).json({ message: "The action with the specified ID does not exist." })
        })
        .catch(
            res.status(500).json({ error: "The action could not be removed" })
        )}
})

// PUT
router.put("/:id", (req, res) => {
    
    const id = req.params.id
    const action = actions.find(p => p.id === id)
    const newAction = req.body

    if(!action){
        req.status(404).json({ message: "The action with the specified ID does not exist." })
    }

    else{
        Hubs.update(req.body)
        .then(hub => {
            actions = actions.map(action => action.id === req.params.id ? newAction : action)
        res.status(200).json(actions)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The action information could not be modified." })
        })
    }
})

module.exports = router;
