const express = require('express');
const router = express.Router();
const citiesCtrl = require('../controllers/city');

router.post('/',citiesCtrl.create);
router.get('/',citiesCtrl.index);
router.delete('/:id',citiesCtrl.deleteCity);


module.exports = router;

