const express = require('express');
const router = express.Router();
const ActionHubs = require('../helpers/actionModel.js');
const ProjectHubs = require('../helpers/projectModel.js');

// GET
router.get("/", (req, res) => {
   try{
        ActionHubs.get()
            .then((actions) => {
            res.status(200).json({actions});
            });
    } catch {
    res.status(500).json({ errorMessage: 'Can not retreive action'})
    }}
)

//GET BY ID
router.get("/:id", checkActionId, (req, res) => {
   const { id } = req.params;

  try{
      ActionHubs.get(req.action).then((action) =>{
          res.status(200).json({ action })
      })
  } catch {
      res.status(500).json({ errorMessage: "Not able to retreive action" })
  }
})

// POST
router.post("/", (req, res) => {
    const action = req.body

    if (!action.project_id || !action.description || !action.notes) {
        res.status(400).json({ errorMessage: "Please provide description and notes for the action." })
    }
    else {
        ActionHubs.insert(req.body)
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

// DELETE
router.delete("/:id", checkActionId, (req, res) => {
    try{
        ActionHubs.remove(req.action).then((deletedAction) => {
            res.status(200).json({ deleted: deletedAction})
        });
    } catch {
        res.status(500).json({ errorMessage: "Action was not deleted"})
    }
});

// PUT
router.put("/:id", checkActionId, checkAction, (req, res) => {
    const {id} = req.params;
    try {
        ActionHubs.update(id, req.body).then((updatedAction) => {
          res.status(200).json({ updatedAction });
        });
      } catch (err) {
          console.log(err)
        res.status(500).json({
            err,
          errorMessage: "Could not edit the action for the provided project id",
        });
      }
})

// MIDDLEWARE
function checkActionId(req, res, next){
    const actionId = req.params.id;

    ActionHubs.get(actionId)
    .then((action) => {
        if(action === null){
            res.status(400).json({ errorMessage: 'The id is not valid'})
        } else {
            req.action = action;
            next();
        }
    })
    .catch((err) => res.status(400).json({ errorMessage: 'The id is not valid'}))
}

function checkAction(req, res, next){
    const actionRequirement = req.body;

    if (!actionRequirement.description || !actionRequirement.notes){
        res.status(400).json({ message: "Enter a description and notes"})
    } else {
        next();
    }
}

module.exports = router;
