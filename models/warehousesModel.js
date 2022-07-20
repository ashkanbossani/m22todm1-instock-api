const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const readWarehouses = () => {
  const jsonData = fs.readFileSync("./data/warehouses.json", "utf8");
  const jsonDataParsed = JSON.parse(jsonData);
  return jsonDataParsed;
};

const writeWarehouses = (jsonDataParsed) => {
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(jsonDataParsed));
};

const getAll = () => {
  return readWarehouses();
};

const getAllFiltered = (req, res) => {
  //use map here to filter specific items of warehouse list
};

const getIndividual = (id) => {
  // const warehouses = getAll();
  // const warehouse = warehouses.find((warehouses) => warehouses.id === id);
  // return warehouse;
};

const updateOne = (id, body) => {};

const deleteOne = (id) => {
  //delete single warehouse and associated inventories
  const warehouses = getAll();
  const warehouse = warehouses.find((warehouses) => warehouses.id === id);
  const warehouseIndex = warehouses.indexOf(warehouse);
  warehouses.splice(warehouseIndex, 1);
  writeWarehouses(warehouses);
  return warehouses;
};

const createOne = (body) => {};

module.exports = {
  getAll,
  getIndividual,
  getAllFiltered,
  updateOne,
  deleteOne,
  createOne,
};
