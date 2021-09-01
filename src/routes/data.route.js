const express = require('express');
const dataController = require("../controllers/data.controller");

const router = express.Router();

// router.get('/data/read/:plugin_id/:collection_name/:organization_id', dataController.search);

router.post("/data/write", dataController.create);

// router.put("/data/write", dataController.update);

// router.delete("/data/write", dataController.delete);


module.exports = router;