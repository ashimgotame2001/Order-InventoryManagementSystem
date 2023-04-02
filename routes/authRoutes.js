const router = require('express').Router();
const loginLimiter = require('../middleware/loginLimitter');
const {authenticate,registerUser,getUser,verifyToken,authorizeUser} = require('../controller/AuthController');

router.route('/authenticate')
  .post(loginLimiter,authenticate)

  router.route('/register')
  .post(registerUser)

  router.route('/user')
  .get(verifyToken,getUser)

  router.route('/user/:id')
  .get(authorizeUser)

module.exports = router;  

