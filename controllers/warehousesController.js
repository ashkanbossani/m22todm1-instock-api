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

const phoneIsValid = (phoneInput) => {
  if ((phoneInput.length = 10)) {
    return true;
  } else {
    return false;
  }
};

const emailIsValid = (emailInput) => {
  // test whether the emailInput respects a regex expression
  // where the string:
  // contains a username (alphanumeric characters optionally divided by a period or _)
  // followed by an @ character
  // and the domain (alphanumeric characters, a period and a short alphanumeric sequence for the extension)
  // e.g., hello@hello.com , hello.you@hello.movie, hello_hello@hello.com are all valid
  const regex = new RegExp(/[\w]{1,}[\.]?[\w]{1,}@[\w]{1,}[\.][\w]{2,6}/i);
  return regex.test(emailInput);
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
  if (
    warehouses.warehouseName === "" ||
    warehouses.address === "" ||
    warehouses.city === "" ||
    warehouses.country === "" ||
    warehouses.contact.name  === ""||
    warehouses.position === "" ||
    warehouses.contact.phone === "" ||
    warehouses.contact.email === ""
  ) {
    return res
      .status(400)
      .send(
        "All fields (warehouse name, address, city, country, name, position, phone and email) are required."
      );
  }
  res.status(200).json(warehouses);
};

const deleteOne = (req, res) => {
  const warehouses = warehousesModel.deleteOne(req.params.id);
  res.status(200).json(warehouses);
};

const createOne = (req, res) => {
  const warehouseDetails = req.body;
  // clean phone number to only keep numbers
  const phoneNumber = warehouseDetails.phone.match(/[\d]/g).join("");
  const email = warehouseDetails.email;

  if (
    !warehouseDetails.warehouseName ||
    !warehouseDetails.address ||
    !warehouseDetails.city ||
    !warehouseDetails.country ||
    !warehouseDetails.name ||
    !warehouseDetails.position ||
    !warehouseDetails.phone ||
    !warehouseDetails.email
  ) {
    return res
      .status(400)
      .send(
        "All fields (warehouse name, address, city, country, name, position, phone and email) are required."
      );
  }

  if (!phoneIsValid(phoneNumber)) {
    return res
      .status(400)
      .send("Phone number must contain 10 digits. For example, 234-324-4534.");
  }

  if (!emailIsValid(email)) {
    return res
      .status(400)
      .send(
        "Email may only contain letters, digits, @ symbol or period. For example hello.you@great.stock"
      );
  }

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
