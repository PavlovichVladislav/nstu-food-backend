const Router = require('express');
const router = new Router();

const menuRouter = require('./menuRouter');
const userRouter = require('./userRouter');
const restuarantRouter = require('./restuarantRouter');

router.use('/user', userRouter)
router.use('/menu', menuRouter)
router.use('/restuarant', restuarantRouter)

module.exports = router;