const express = require("express");
const app = express();
const cors = require("cors");
const inventoryRoutes = require("./routes/inventories");
const warehouseRoutes = require("./routes/warehouses");

require("dotenv").config();
const PORT = process.env.PORT || 8080;

//serve the public folder when a client request for server
const path = require('path');
app.use(express.static(path.join(__dirname + 'public')));

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  // Checking a content-type header in the request so we can handle JSON without errors from request.body
  if (
    req.method === "POST" &&
    req.headers["content-type"] !== "application/json"
  ) {
    res.status(400).send("Server requires application/json");
  } else {
    next();
  }
});

app.use("/inventories", inventoryRoutes);
app.use("/warehouses", warehouseRoutes);

app.use((req, res, next) => {
  console.log("Incoming request: ", req.path);

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
