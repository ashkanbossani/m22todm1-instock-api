const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const inventoryModel = require("../models/inventoriesModel");

const readInventories = () => {
  const jsonData = fs.readFileSync("./data/inventories.json", "utf8");
  const jsonDataParsed = JSON.parse(jsonData);
  return jsonDataParsed;
};

const writeInventory = (jsonDataParsed) => {
  fs.writeFileSync("./data/inventories.json", JSON.stringify(jsonDataParsed));
};

const getAll = (req, res) => {
  const inventories = inventoryModel.getAll();
  res.status(200).json(inventories);
};

const getIndividual = (req, res) => {
  const inventory = inventoryModel.getIndividual(req.params.id);
  res.status(200).json(inventory);
};

const updateOne = (req, res) => {
  const inventory = inventoryModel.updateOne(req.params.id, req.body);
  res.status(200).json(inventory);
};

const deleteOne = (req, res) => {
  const inventory = inventoryModel.deleteOne(req.params.id);
  res.status(200).json(inventory);
};

const createOne = (req, res) => {
  const inventory = inventoryModel.createOne(req.body);
  res.status(200).json(inventory);
};

module.exports = {
  getAll,
  getIndividual,
  updateOne,
  deleteOne,
  createOne,
};
