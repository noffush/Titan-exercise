const express = require('express');

const photosFlows = require('./flows/photosFlows');
const ordersFlows = require('./flows/ordersFlows');

const app = express();
app.use(express.json());

// Step 1
app.get(`/api/photos/:count`, photosFlows.fetchPhotos);

// Step 2
app.post('/api/orders', ordersFlows.saveOrder);

// Step 3 - not implemented :(
app.get('/api/orders/:id', ordersFlows.getUserOrders);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
