const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readWarehouses = () => {
  const jsonData = fs.readFileSync("./data/warehouses.json", "utf8");
  const jsonDataParsed = JSON.parse(jsonData);
  return jsonDataParsed;
};

const writeWarehouses = (jsonDataParsed) => {
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(jsonDataParsed));
};

// format phone number to +1 (234) 234-2345 format
const formatPhoneNum = (phoneNum) => {
  // Keep only numbers in phoneNum (remove all other characters)
  const numbers = phoneNum.match(/[\d]/g);
  console.log('array of numbers',numbers);
  // Format number to +1 (234) 345-4325 format
  const cleanedNumber = `+1 (${numbers.slice(0,3).join('')}) ${numbers.slice(3,6).join('')}-${numbers.slice(6).join('')}`;
  return cleanedNumber;
}

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
