const Router = require('express');
const router = new Router();
const menuController = require('../controllers/menuController');

// получить меню для конкретной столовой

router.get('/:id', menuController.get);


module.exports = router;