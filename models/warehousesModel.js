const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const readWarehouses2 = () => {
  const jsonData = fs.readFileSync("./data/warehouses.json", "utf8");
  const jsonDataParsed = JSON.parse(jsonData);
  return jsonDataParsed;
};

const writeWarehouses2 = (jsonDataParsed) => {
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(jsonDataParsed));
};

const getAll2 = () => {
  return readWarehouses2();
};

const getAllFiltered2 = (req, res) => {
  //use map here to filter specific items of warehouse list
};

const getIndividual2 = (id) => {
  const warehouses = getAll2();
  const warehouse = warehouses.find((warehouses) => warehouses.id === id);
  return warehouses;
};

const updateOne2 = (id, body) => {};

const deleteOne2 = (id) => {};

const createOne2 = (body) => {};

module.exports = {
  getAll2,
  getIndividual2,
  getAllFiltered2,
  updateOne2,
  deleteOne2,
  createOne2,
};
