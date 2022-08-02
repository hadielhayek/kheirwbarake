const express =require ('express');
const adsController = require('../controllers/ads');
const router = express.Router();


router.get('/',adsController.getAllAds);
router.get('/:id',adsController.get)
router.post('/',adsController.post);
router.put('/:id',adsController.put)
router.delete('/:id',adsController.delete)

module.exports = router;