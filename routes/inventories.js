const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

let inventoryList = [];

fs.readFile("./data/inventories.json", "utf8", (err, data) => {
  err ? console.log(err) : (inventoryList = JSON.parse(data));
});

router.get("/", (req, res) => {
  res.status(200).json(inventoryList);
});

router.get("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.post("/add", (req, res) => {});

module.exports = router;
