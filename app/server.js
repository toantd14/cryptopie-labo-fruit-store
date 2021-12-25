const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();

// var corsOptions = {
//   origin: "http://localhost:3000",
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// import routes
require("./routes/product.routes")(app);
require("./routes/order.routes")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to fruit store application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
