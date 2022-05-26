const userRouter = require('express').Router();
const { vaildateUserInfo } = require('../utils/validation');
const { getUserInfo, updateUserInfo } = require('../controllers/users');

userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me', vaildateUserInfo(), updateUserInfo);

module.exports = userRouter;
