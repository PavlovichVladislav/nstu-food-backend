const Router = require('express');
const router = new Router();

const menuRouter = require('./menuRouter');
const userRouter = require('./userRouter');
const restuarantRouter = require('./restuarantRouter');
const dishRouter = require('./dishRouter');

router.use('/user', userRouter)
router.use('/menu', menuRouter)
router.use('/restuarant', restuarantRouter)
router.use('/dish', dishRouter)

module.exports = router;