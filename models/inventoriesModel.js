const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readInventories = () => {
  const jsonData = fs.readFileSync('./data/inventories.json', 'utf8');
  const jsonDataParsed = JSON.parse(jsonData);
  return jsonDataParsed;
};

const writeInventory = (jsonDataParsed) => {
  fs.writeFileSync('./data/inventories.json', JSON.stringify(jsonDataParsed));
};

const getAll = () => {
  return readInventories();
};

const getIndividual = (id) => {
  const inventories = getAll();
  const item = inventories.filter((item) => item.id === id);
  return item;
};

const updateOne = (id, body) => {
  const inventoryData = getAll();
  const inventoryId = id;
  let i = inventoryData.findIndex((inventory) => inventory.id === inventoryId );

  inventoryData[i].itemName = body.itemName;
  inventoryData[i].description = body.description;
  inventoryData[i].category = body.category;
  inventoryData[i].status = body.status;
  inventoryData[i].warehouseName = body.warehouseName;
  inventoryData[i].warehouseID = body.warehouseID;
  inventoryData[i].quantity = body.quantity;

  writeInventory(inventoryData);
  return inventoryData[i];

}

const deleteOne = (id) => {
  const inventory = getAll();
  const item = inventory.find((item) => item.id == id);
  const itemIndex = inventory.indexOf(item);
  inventory.splice(itemIndex, 1);
  writeInventory(inventory);
  return inventory;
};

const createOne = (itemDetails) => {
  const inventoryData = readInventories();

  const newItem = {
    id: uuidv4(),
    warehouseID: itemDetails.warehouseId,
    warehouseName: itemDetails.warehouseName,
    itemName: itemDetails.itemName,
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
