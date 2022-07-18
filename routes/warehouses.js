const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.use(express.json());

let warehouseList = [];

fs.readFilee("./data/warehouses.json", "utf8", (err, data) => {
  err ? console.log(err) : (warehouseList = JSON.parse(data));
});

router.get("/", (req, res) => {
  res.status(200).json(warehouseList);
});

router.get("/", (req, res) => {
  //get request for mapped warehouselist for certain info in warehouse data
});

router.get("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.post("/add", (req, res) => {});

module.exports = router;
