const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  images: {
    type: Array,
  },
  frameColor: {
    type: String,
  },
  user: {
    type: String,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
