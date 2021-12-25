module.exports = (app) => {
  const orders = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Create a new Order
  router.post("/", orders.create);

  // Retrieve all Orders
  router.get("/", orders.findAll);

  // Retrieve all buy time Orders
  router.get("/date", orders.findByDate);

  app.use("/api/orders", router);
};
