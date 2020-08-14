const express = require('express');
const router = express.Router();
const ProjectHubs = require('../helpers/projectModel.js');

// GET
router.get("/", (req, res) => {
    ProjectHubs.get()
    .then((projects) => {
        res.status(200).json({ projects })
    })
    .catch((err) => {
        res.status(500).json({ error: 'The projects information could not be retreived.'})
    })
});

//GET BY ID
router.get("/:id", checkProjectId, (req, res) => {
    const {id} = req.params;

    try{
        ProjectHubs.get(req.project).then((project) => {
            res.status(200).json({ project })
        })
    } catch {
        res.status(500).json({ errorMessage: "Not able to retreive project"})
    }
})

// POST
router.post("/", (req, res) => {
    try{
        ProjectHubs.insert(req.body).then((project) => {
            res.status(201).json({ newProject: project })
        })
    } catch {
        res.status(500).json({ errorMessage: "Can not add the project" })
    }
});

// DELETE
router.delete("/:id", checkProjectId, (req, res) => {
    
    const {id} = req.params;

    try{
        ProjectHubs.remove(req.project).then((deletedProject) => {
            res.status(200).json({ deleted: deletedProject})
        });
    } catch {
        res.status(500).json({ errorMessage: "Project was not deleted"})
    }
})

// PUT
router.put("/:id", (req, res) => {
    const {id} = req.params;
    try{
        ProjectHubs.update(id, req.body).then((updatedProject) => {
            res.status(200).json({updatedProject});
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            err,
            errorMessage: "Could not edit the project for the provided id"
        })
    }
})

// MIDDLEWARE
function checkProjectId(req, res, next){
    const projectId = req.params.id;

    ProjectHubs.get(projectId)
    .then((project) => {
        if(project === null){
            res.status(400).json({ errorMessage: 'The id is not valid'})
        } else {
            req.project = projectId;
            next();
        }
    })
    .catch((err) => res.status(400).json({ errorMessage: 'The id is not valid'}))
}

function checkProject(req, res, next){
    const projectRequirement = req.body;

    if (!projectRequirement.name || !projectRequirement.description){
        res.status(400).json({ message: "Enter a description and notes"})
    } else {
        next();
    }
}

module.exports = router;