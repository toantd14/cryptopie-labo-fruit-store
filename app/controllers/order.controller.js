const db = require("../models");
const Order = db.orders;

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user || !req.body.fruits) {
    res.status(400).send({ message: "Product can not be empty!" });
    return;
  }

  // Create a Order
  const order = new Order({
    user: req.body.user,
    fruits: req.body.fruits,
    total_price: req.body.total_price,
    status: req.body.status,
  });

  // Save Order in the database
  order
    .save(order)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  Order.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find all buy date Orders
exports.findByDate = (req, res) => {
  // Validate request
  if (!req.query.from_date || !req.query.to_date) {
    res.status(400).send({ message: "Date can not be empty!" });
    return;
  }

  let from_date = new Date(req.query.from_date);
  let to_date = new Date(req.query.to_date);
  to_date.setDate(to_date.getDate() + 1);

  Order.find({
    createdAt: {
      $gte: new Date(from_date),
      $lte: new Date(to_date),
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};
