const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const getInventories = () => {
  const jsonData = fs.readFileSync("./data/inventories.json", "utf8");
  const jsonDataParsed = JSON.parse(jsonData);
  return jsonDataParsed;
};

router.get("/", (req, res) => {
  res.status(200).json(inventoryList);
});

router.get("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.post("/add", (req, res) => {});

module.exports = router;
