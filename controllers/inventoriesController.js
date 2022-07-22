const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const inventoryModel = require('../models/inventoriesModel');
// const warehouseController = require('../controllers/warehousesController');

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
  if (!inventory){
    return res.status(404).send('No item was found for the provided id.')
  }
  res.status(200).json(inventory);
};

const createOne = (req, res) => {
  const itemDetails = req.body;

  if (
    !itemDetails.itemName ||
    !itemDetails.description ||
    !itemDetails.category ||
    !itemDetails.status ||
    !itemDetails.quantity ||
    !itemDetails.warehouseName ||
    !itemDetails.warehouseId
  ) {
    return res
      .status(400)
      .send(
        'All fields (item name, description, category, status, quantity and warehouse) are required.'
      );
  }

  const inventory = inventoryModel.createOne(itemDetails);
  res.status(200).json(inventory);
};

module.exports = {
  getAll,
  getIndividual,
  updateOne,
  deleteOne,
  createOne,
};
