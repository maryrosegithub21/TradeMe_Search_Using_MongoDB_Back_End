const express = require('express');
const router = express.Router();
const auctionControllers = require('../controllers/auctionControllers');

router.get('/', auctionControllers.getAllItems);
router.post('/', auctionControllers.createItem);
router.get('/:id', auctionControllers.getItemById);
router.put('/:id', auctionControllers.updateItem);
router.delete('/:id', auctionControllers.deleteItem);

// Marketplace
router.post('/search', auctionControllers.postSearch);




module.exports = router;

