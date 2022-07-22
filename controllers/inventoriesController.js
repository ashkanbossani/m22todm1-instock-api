const fs = require('fs');
const inventoriesModel = require('../models/inventoriesModel');

const getAll = (req, res) => {
  const inventories = inventoriesModel.getAll();
  res.status(200).json(inventories);
};

const getIndividual = (req, res) => {
  const id = req.params.id;
  const item = inventoriesModel.getIndividual(id);
  res.status(200).json(item);
};

const updateOne = (req, res) => {
  const inventory = inventoriesModel.updateOne(req.params.id, req.body);
  res.status(200).json(inventory);
};

const deleteOne = (req, res) => {
  const inventory = inventoriesModel.deleteOne(req.params.id);
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

  const inventory = inventoriesModel.createOne(itemDetails);
  res.status(200).json(inventory);
};

module.exports = {
  getAll,
  getIndividual,
  updateOne,
  deleteOne,
  createOne,
};
