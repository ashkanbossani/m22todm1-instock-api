const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const warehousesModel = require("../models/warehousesModel");

const readWarehouses = () => {
  const jsonData = fs.readFileSync("./data/warehouses.json", "utf8");
  const jsonDataParsed = JSON.parse(jsonData);
  return jsonDataParsed;
};

const writeWarehouses = (jsonDataParsed) => {
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(jsonDataParsed));
};

const getAll = (req, res) => {
  const warehouses = warehousesModel.getAll();
  res.status(200).json(warehouses);
};

const getAllFiltered = (req, res) => {};

const getIndividual = (req, res) => {
  const warehouses = warehousesModel.getIndividual(req.params.id);
  res.status(200).json(warehouses);
};

const updateOne = (req, res) => {
  const warehouses = warehousesModel.updateOne(req.params.id, req.body);
  res.status(200).json(warehouses);
};

const deleteOne = (req, res) => {
  const warehouses = warehousesModel.deleteOne(req.params.id);
  res.status(200).json(warehouses);
};

const createOne = (req, res) => {
  const warehouseDetails = req.body;
  const warehouses = warehousesModel.createOne(warehouseDetails);
  res.status(200).json(warehouses);
};

module.exports = {
  getAll,
  getAllFiltered,
  getIndividual,
  updateOne,
  deleteOne,
  createOne,
};
