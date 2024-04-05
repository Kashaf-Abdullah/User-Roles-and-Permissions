const {check}=require('express-validator')

exports.permissionValidator=[
    check('permission_name','Permission Name is required').not().isEmpty()
  
]


//permission delete validator

exports.permissionDeleteValidator=[
    check('id','Id is required').not().isEmpty()
]


//permision update validator
exports.permissionUpdateValidator=[
    check('id','Id is required').not().isEmpty(),
    check('permission_name','Permission Name is required').not().isEmpty()
]