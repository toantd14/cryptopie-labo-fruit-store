module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      sku: { type: String, require: true },
      name: { type: String, require: true },
      price: { type: Number, require: true },
      amount: { type: Number, require: true },
      published: { type: Boolean, require: true },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", schema);
  return Product;
};
