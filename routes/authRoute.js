const express = require('express');
// Initialize Express app
const router = express();
const auth=require('../middlewares/authMiddleware')
const authController=require('../controllers/authController')

const { registerValidator,loginValidator }=require('../helpers/validator')

router.post('/register',registerValidator,authController.registerUser)
router.post('/login',loginValidator,authController.loginUser)
router.get('/profile',auth,authController.getProfile)

module.exports=router
