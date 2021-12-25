module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      sku: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      amount: { type: Number, required: true },
      published: { type: Boolean, required: true },
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
