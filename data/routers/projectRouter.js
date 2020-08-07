const express = require('express');

const Hubs = require('../seeds/01-projects.js');

const router = express();

// GET
router.get("/", (req, res) => {
    if(!projects){
        res.status(500).json({ error: "The projects information could not be retrieved." })
    }
    else{
        Hubs.get(req.body)
        .then(hub => {
            res.status(201).json(projects)
        })
    }
})

//GET BY ID
router.get("/:id", (req, res) => {
    const id = req.params.id

    const project = projects.find(p => p.id === id)

    if(!project.id){
        res.status(404).json({ message: "The project with the specified ID does not exist." })
    }
    else{
        Hubs.getProjectActions(req.body)
        .then(hub => {
            res.status(201).json(action)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The project information could not be retrieved." })
        })
    }
})

// POST
router.post("/", (req, res) => {
    const project = req.body

    if (!project.project_id || !project.description || !project.notes) {
        res.status(400).json({ errorMessage: "Please provide title and notes for the project." })
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
    const project = req.body

    const id = req.params.id

    if(!project.id){
        res.status(404).json({ message: "The project with the specified ID does not exist." })
    }
    else{
        Hubs.add(req.body)
        .then(hub => {
            project.insert(project)
            res.status(201).json(project)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "There was an error while saving the project to the database" 
            })
        })
    }
})

// DELETE
router.delete("/:id", (req, res) => {
    
    const id = req.params.id

    const deletedProject = projects.remove(p => p.id === id)
    if(deletedProject.length > 0) {
        projects = projects.filter(p => p.id !== id)
        res.status(200).json(deletedProject)
    } else {
        Hubs.remove(req.body)
        .then(hub => {
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        })
        .catch(
            res.status(500).json({ error: "The project could not be removed" })
        )}
})

// PUT
router.put("/:id", (req, res) => {
    
    const id = req.params.id
    const project = projects.find(p => p.id === id)
    const newProject = req.body

    if(!project){
        req.status(404).json({ message: "The project with the specified ID does not exist." })
    }

    else{
        Hubs.update(req.body)
        .then(hub => {
            projects = projects.map(project => project.id === req.params.id ? newProject : project)
        res.status(200).json(projects)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The project information could not be modified." })
        })
    }
})

module.exports = router;
