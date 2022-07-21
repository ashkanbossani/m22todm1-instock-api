const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const warehousesModel = require('./warehousesModel');

const readInventories = () => {
  const jsonData = fs.readFileSync('./data/inventories.json', 'utf8');
  const jsonDataParsed = JSON.parse(jsonData);
  return jsonDataParsed;
};

const writeInventory = (jsonDataParsed) => {
  fs.writeFileSync('./data/inventories.json', JSON.stringify(jsonDataParsed));
};

const getAll = () => {
  // return readInventories();
};

const getIndividual = (id) => {
  // const inventories = getAll();
  // const inventory = inventories.find((inventory) => inventory.id === id);
  // return inventory;
};

const updateOne = (id, body) => {};

const deleteOne = (id) => {};

const createOne = (itemDetails) => {
  const inventoryData = readInventories();
  const warehouseData = warehousesModel.getAll();
  const newItemWarehouseDetails = warehouseData.find((item) => {
    item.warehouseName === itemDetails.warehouseName;
  });
  const newItemWarehouseId = newItemWarehouseDetails.id;

  const newItem = {
    id: uuidv4(),
    warehouseID: newItemWarehouseId,
    warehouseName: itemDetails.warehouseName,
    itemName: itemDetails.name,
    description: itemDetails.description,
    category: itemDetails.category,
    status: itemDetails.status,
    quantity: itemDetails.quantity,
  };

  inventoryData.push(newItem);
  writeInventory(inventoryData);

  return newItem;
};

module.exports = {
  getAll,
  getIndividual,
  updateOne,
  deleteOne,
  createOne,
};
