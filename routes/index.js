const router = require('express').Router();
const { vaildateSignUp, vaildateSignIn } = require('../utils/validation');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', vaildateSignUp(), createUser);
router.post('/signin', vaildateSignIn(), login);
router.use(auth);
router.use('/', userRouter);
router.use('/', movieRouter);

module.exports = router;
