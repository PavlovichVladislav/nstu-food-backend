const Router = require('express');
const router = new Router();
const restuarantController = require('../controllers/restuarantController');
const checkRole = require('../middleware/CheckRoleMiddleware');

// получить все столовые
// получить столовые для конкретного корпуса

router.get('/', restuarantController.getAll)
router.get('/:id', restuarantController.getOne)
router.post('/', checkRole('ADMIN'), restuarantController.create)

module.exports = router;