const express = require("express");
const router = express.Router();
const inventoriesController = require("../controllers/inventoriesController");

router.get("/", inventoriesController.getAll);

router.get("/:id", inventoriesController.getIndividual);

router.put("/:id", inventoriesController.updateOne);

router.delete("/:id", inventoriesController.deleteOne);

router.post("/add", inventoriesController.createOne);

module.exports = router;
