const mongoose = require('mongoose');
const Order = require('../models/order');

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB: ', error.message);
  });

async function saveOrder(req, res) {
  console.log('Saving order details...');
  const { email, name, address, images, frameColor, user } = req.body;

  if (!user) {
    console.log('Missing user');

    return res.status(400).json( { message: 'Missing user' });
  }

  const newOrder = new Order({ email, name, address, images, frameColor, user });
  try {
    const orderDetails = await newOrder.save();
    console.log('Order saved: ', orderDetails);

    return res.json(orderDetails);
  } catch (error) {
    console.log('Error saving order: ', error.message)

    return response.status(400).json({ error: 'Error saving order', details: error.message });
  }

}

async function getUserOrders(req, res) {
  // TODO

}

module.exports = { 
  saveOrder,
  getUserOrders
};
