const router = require('express').Router();
const{verifyToken} = require('../controller/AuthController');

const {getProfileInfo,updateProfileInfo} = require("../controller/ProfileController");

router.route('/user/profile')
.get(verifyToken,getProfileInfo)

router.route('/user/profile')
.patch(verifyToken,updateProfileInfo)

module.exports = router; 