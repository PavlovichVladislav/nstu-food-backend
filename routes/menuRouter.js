const Router = require('express');
const router = new Router();
const menuController = require('../controllers/menuController');
const checkRole = require('../middleware/CheckRoleMiddleware');

router.get('/:restuarantId', menuController.getRestuarantMenu);
router.post('/menuItem', checkRole('ADMIN'), menuController.createMenuItem);

module.exports = router;