const express = require('express');
const router = express.Router();
const cardsCtrl = require('../../controllers/posts');

router.post('/',cardsCtrl.create);
router.get('/',cardsCtrl.index);
router.delete('/',cardsCtrl.delete);


module.exports = router;

