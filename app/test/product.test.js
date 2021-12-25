//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Products", () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done();
  });

  describe("/GET /api/products", () => {
    it("it should GET all the products", (done) => {
      chai
        .request(server)
        .get("/api/products")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          // res.body.length.should.be.eql(7);
          done();
        });
    });
  });

  describe("/POST /api/products", () => {
    it("it should POST a product", (done) => {
      let product = {
        sku: "fruit-02",
        name: "Banana",
        price: 140,
        amount: 1000,
        published: true,
      };
      chai
        .request(server)
        .post("/api/products")
        .send(product)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          // res.body.should.have.property("message").eql("Product successfully added!");
          res.body.should.have.property("sku");
          res.body.should.have.property("name").eql(product.name);
          res.body.should.have.property("price").eql(product.price);
          res.body.should.have.property("amount").eql(product.amount);
          res.body.should.have.property("published").eql(product.published);
          res.body.should.have.property("createdAt");
          res.body.should.have.property("updatedAt");
          res.body.should.have.property("id");
          done();
        });
    });

    it("it should not POST a product without status field", (done) => {
      let product = {
        sku: "fruit-02",
        name: "Mango",
      };
      chai
        .request(server)
        .post("/api/products")
        .send(product)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          // res.body.should.have.property("message").eql("Content can not be empty!");
          done();
        });
    });
  });

  describe("/GET/:id /api/products", () => {
    it("it should GET a product by the given id", (done) => {
      // TODO add a model to db then get that *id* to take this test
      let id = "61c6d8821c71c47e87375931";
      chai
        .request(server)
        .get("/api/products/" + id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eql(id);
          res.body.should.have.property("sku");
          res.body.should.have.property("name");
          res.body.should.have.property("price");
          res.body.should.have.property("amount");
          res.body.should.have.property("published");
          res.body.should.have.property("createdAt");
          res.body.should.have.property("updatedAt");
          done();
        });
    });
  });

  describe("/PUT/:id /api/products", () => {
    it("it should UPDATE a product given the id", (done) => {
      // TODO add a model to db then get that id to take this test
      let id = "61c6d8821c71c47e87375931";
      let product = {
        price: 300,
      };
      chai
        .request(server)
        .put("/api/products/" + id)
        .send(product)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Product was updated successfully.");
          done();
        });
    });
  });

  describe("/DELETE/:id /api/products", () => {
    it("it should DELETE a product given the id", (done) => {
      // TODO add a model to db then get that id to take this test
      let id = "61c6da227badf157f075c31f";
      chai
        .request(server)
        .delete("/api/products/" + id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Product was deleted successfully!");
          done();
        });
    });
  });
});
