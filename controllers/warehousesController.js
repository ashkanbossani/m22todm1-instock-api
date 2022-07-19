const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const warehousesModel = require("../models/warehousesModel");

const readWarehouses2 = () => {
  const jsonData = fs.readFileSync("./data/warehouses.json", "utf8");
  const jsonDataParsed = JSON.parse(jsonData);
  return jsonDataParsed;
};

const writeWarehouses2 = (jsonDataParsed) => {
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(jsonDataParsed));
};

const getAll2 = (req, res) => {
  const warehouses = warehousesModel.getAll2();
  res.status(200).json(warehouses);
};

const getAllFiltered2 = (req, res) => {};

const getIndividual2 = (req, res) => {
  const warehouses = warehousesModel.getIndividual2(req.params.id);
  res.status(200).json(warehouses);
};

const updateOne2 = (req, res) => {
  const warehouses = warehousesModel.updateOne2(req.params.id, req.body);
  res.status(200).json(warehouses);
};

const deleteOne2 = (req, res) => {
  const warehouses = warehousesModel.deleteOne2(req.params.id);
  res.status(200).json(warehouses);
};

const createOne2 = (req, res) => {
  const warehouseDetails = req.body;
  const warehouses = warehousesModel.createOne2(warehouseDetails);
  res.status(200).json(warehouses);
};

module.exports = {
  getAll2,
  getAllFiltered2,
  getIndividual2,
  updateOne2,
  deleteOne2,
  createOne2,
};
