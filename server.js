const express = require("express");
const app = express();
const cors = require("cors");
const inventoryRoutes = require("./routes/inventories");
const warehouseRoutes = require("./routes/warehouses");

require('dotenv').config();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());

app.use("/inventories", inventoryRoutes);
app.use("/warehouses", warehouseRoutes);

app.use((req, res, next) => {
  console.log("Incoming request: ", req.path);

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
