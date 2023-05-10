const Router = require('express');
const router = new Router();
const menuController = require('../controllers/menuController');

router.get('/:restuarantId', menuController.getRestuarantMenu);
router.post('/menuItem', menuController.createMenuItem);


module.exports = router;