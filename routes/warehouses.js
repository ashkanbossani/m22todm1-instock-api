const express = require("express");
const router = express.Router();
const warehousesController = require("../controllers/warehousesController");

router.get("/", warehousesController.getAll);

router.get("/", warehousesController.getAllFiltered);

router.get("/:id", warehousesController.getIndividual);

router.put("/:id", warehousesController.updateOne);

router.delete("/:id", warehousesController.deleteOne);

router.post("/add", warehousesController.createOne);

module.exports = router;
