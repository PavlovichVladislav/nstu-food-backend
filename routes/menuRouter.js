const Router = require('express');
const router = new Router();
const menuController = require('../controllers/menuController');

// получить меню для конкретной столовой

router.get('/:restuarantId', menuController.getRestuarantMenu);
router.post('/', menuController.create);


module.exports = router;