const express = require("express");
const router = express.Router();
const warehousesController = require("../controllers/warehousesController");

router.get("/", warehousesController.getAll2);

router.get("/", warehousesController.getAllFiltered2);

router.get("/:id", warehousesController.getIndividual2);

router.put("/:id", warehousesController.updateOne2);

router.delete("/:id", warehousesController.deleteOne2);

router.post("/add", warehousesController.createOne2);

module.exports = router;
