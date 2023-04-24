const Router = require('express');
const router = new Router();
const restuarantController = require('../controllers/restuarantController');

// получить все столовые
// получить столовые для конкретного корпуса

router.get('/', restuarantController.getAll)
router.get('/:id', restuarantController.getOne)
router.post('/', restuarantController.create)

module.exports = router;