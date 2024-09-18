const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionControllers');

router.post('/seed', auctionController.seedAuctionData);
router.get('/', auctionController.getAuctions);
router.get('/search', auctionController.searchAuctionItems);
router.post('/additem', auctionController.addAuctionItem);
router.delete('/delete', auctionController.deleteAuctions);

module.exports = router;
