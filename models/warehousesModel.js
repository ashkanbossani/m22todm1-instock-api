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

const readInventories = () => {
  const jsonData = fs.readFileSync('./data/inventories.json', 'utf8');
  const jsonDataParsed = JSON.parse(jsonData);
  return jsonDataParsed;
};

const writeInventories = (jsonDataParsed) => {
  fs.writeFileSync('./data/inventories.json', JSON.stringify(jsonDataParsed));
};


// format phone number to +1 (234) 234-2345 format
const formatPhoneNum = (phoneNum) => {
  // Keep only numbers in phoneNum (remove all other characters)
  const numbers = phoneNum.match(/[\d]/g);
  console.log("array of numbers", numbers);
  // Format number to +1 (234) 345-4325 format
  const cleanedNumber = `+1 (${numbers.slice(0, 3).join("")}) ${numbers
    .slice(3, 6)
    .join("")}-${numbers.slice(6).join("")}`;
  return cleanedNumber;
};

const getAll = () => {
  return readWarehouses();
};

const getAllFiltered = (req, res) => {
  //use map here to filter specific items of warehouse list
};

const getIndividual = (id) => {
  const warehouses = getAll();
  const warehouse = warehouses.find((warehouses) => warehouses.id === id);
  return warehouse;
};

const updateOne = (id, body) => {
  console.log("body", body);
  const warehouses = getAll();
  const warehouseId = id;
  let i = warehouses.findIndex((warehouse) => warehouse.id === warehouseId);

  warehouses[i].name = body.name;
  warehouses[i].address = body.addres;
  warehouses[i].city = body.city;
  warehouses[i].country = body.country;
  warehouses[i].contact.name = body.name;
  warehouses[i].contact.position = body.postition;
  warehouses[i].contact.phone = body.phone;
  warehouses[i].contact.email = body.email;

  writeWarehouses(warehouses);
  return warehouses[i];
};

const deleteOne = (id) => {
  const warehouses = getAll();
  const inventories = readInventories();

  const warehouseId = id;
  let i = warehouses.findIndex((warehouse) => warehouse.id === warehouseId);
  warehouses.splice(i, 1);
  
  //delete all inventories associated with warehouse
  inventories.forEach((inventory) => {
    if (inventory.warehouseId === warehouseId) {
      let j = inventories.findIndex((inventory) => inventory.id === inventory.id);
      inventories.splice(j, 1);
    }
  }
  );
  writeWarehouses(warehouses);
  writeInventories(inventories);
  return warehouses;
}

const createOne = (warehouseDetails) => {
  const warehousesData = readWarehouses();
  const cleanedNumber = formatPhoneNum(warehouseDetails.phone);

  const newWarehouse = {
    id: uuidv4(),
    name: warehouseDetails.warehouseName,
    address: warehouseDetails.address,
    city: warehouseDetails.city,
    country: warehouseDetails.country,
    contact: {
      name: warehouseDetails.name,
      position: warehouseDetails.position,
      phone: cleanedNumber,
      email: warehouseDetails.email,
    },
  };

  warehousesData.push(newWarehouse);
  writeWarehouses(warehousesData);

  return newWarehouse;
};

module.exports = {
  getAll,
  getIndividual,
  getAllFiltered,
  updateOne,
  deleteOne,
  createOne,
};

