const Router = require('express');
const router = new Router();
const menuController = require('../controllers/menuController');

router.get('/:restuarantId', menuController.getRestuarantMenu);
router.post('/', menuController.create);


module.exports = router;