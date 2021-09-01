const express = require('express');
const dataController = require("../controllers/data.controller");

const router = express.Router();

router.get('/', dataController.getData);

// router.post("/", IdeaController.postData);

// router.put("/", IdeaController.updateData);

// router.delete("/", IdeaController.deleteData);


module.exports = router;