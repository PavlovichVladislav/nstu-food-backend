const Router = require('express');
const router = new Router();
const dishController = require('../controllers/dishController');
const checkRole = require('../middleware/CheckRoleMiddleware');

router.get('/', dishController.getAll)
router.get('/:id', dishController.getOne)
router.post('/', checkRole('ADMIN'), dishController.create)

module.exports = router;