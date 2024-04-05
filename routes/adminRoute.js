
const express = require('express');
// Initialize Express app
const auth=require('../middlewares/authMiddleware')

const router = express();
const permissionController=require('../controllers/admin/permissionController')
const {permissionValidator,permissionDeleteValidator,permissionUpdateValidator  }=require('../helpers/adminValidator')


//permission route
router.post('/add-permission',auth,permissionValidator,permissionController.addPermission)
router.get('/get-permissions',auth,permissionController.getPermissions)
router.delete('/delete-permission',auth,permissionDeleteValidator,permissionController.deletePermission)
router.put('/update-permission',auth,permissionUpdateValidator,permissionController.updatePermission)



module.exports=router
