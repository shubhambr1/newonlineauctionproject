const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// 🆕 POST: Create a new auction item
router.post('/', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.send(item);
  } catch (err) {
    res.status(500).send('Failed to create item');
  }
});

// 📄 GET: Fetch all auction items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (err) {
    res.status(500).send('Failed to fetch items');
  }
});

// 💸 POST: Place a bid on a specific item
router.post('/bid/:id', async (req, res) => {
  try {
    const { amount, user } = req.body;
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send('Item not found');

    if (item.endTime < new Date()) return res.status(400).send('Auction ended');
    if (amount <= item.currentBid) return res.status(400).send('Bid too low');

    item.currentBid = amount;
    item.bids.push({ amount, user });
    await item.save();

    res.send(item);
  } catch (err) {
    res.status(500).send('Failed to place bid');
  }
});

// ❌ DELETE: Remove an item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Item not found');
    res.send({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
