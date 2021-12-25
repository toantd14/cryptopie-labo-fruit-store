module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      user: { type: String, required: true },
      fruits: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
          quantity: { type: Number, default: 1 },
        },
      ],
      total_price: { type: Number, required: true },
      status: { type: Number, required: true },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Order = mongoose.model("order", schema);
  return Order;
};
