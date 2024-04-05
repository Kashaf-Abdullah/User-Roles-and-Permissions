const { validationResult } = require('express-validator');
const Permission=require('../../models/permissionModel')
const addPermission=async(req,res)=>{
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Error',
                errors: errors.array()
            });
        }


        //permission is exist or not
        const {permission_name}=req.body

const isExists=await Permission.findOne({permission_name})
if(isExists){

    return res.status(400).json({
        success: false,
        msg:'Permission name already exists!'
    });

}

var obj={
    permission_name

}
if(req.body.default){
    obj.is_default=parseInt(req.body.default)
}

const permission=new Permission(obj)
const newPermission=await permission.save()

return res.status(200).json({
    success: true,
    msg:'Permission added successfully!',
    data:newPermission
});


    }
    catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}








const getPermissions=async(req,res)=>{
    try{
const permissions=await Permission.find({}) //all permission
return res.status(400).json({
    success: false,
    msg: 'all permissions fetch successfully ',
    data:permissions
});    
}
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });   
    }
}










const deletePermission=async(req,res)=>{
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Error',
                errors: errors.array()
            });
        }



const {id}=req.body
await Permission.findByIdAndDelete({_id:id})
   

    return res.status(200).json({
        success: true,
        msg: 'Permission delete succesfully',
       
    });

}
    catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });   
    }
}











const updatePermission=async(req,res)=>{
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Error',
                errors: errors.array()
            });
        }


        //permission is exist or not
        const {id,permission_name}=req.body

const isExists=await Permission.findOne({_id:id})
if(!isExists){

    return res.status(400).json({
        success: false,
        msg:'PermissionId not foundl'
    });

}

//permision is not match with other doc
const isNameAssigned=await Permission.findOne({
    //apni id chor kr.. sucri id mai check krrhe hai ke ye permission name exist krta hai ya nai
    _id:{$ne:id},
    permission_name:permission_name
})

if(isNameAssigned){
    return res.status(400).json({
        success: false,
        msg: 'Permisiion name already assign to anithe permission'
    });
}
var updatePermission={
    permission_name

}
if(req.body.default!=null){ //1 or 0 ----true or false
    updatePermission.is_default=parseInt(req.body.default)
}


  const updatedPermission= await Permission.findByIdAndUpdate({_id:id},{
        $set:updatePermission
    },{new:true}//updated data return 
    )
return res.status(200).json({
    success: true,
    msg:'Permission updated successfully!',
    data:updatedPermission
});


    }
    catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Id is not found'
        });
    }
}

module.exports={
    addPermission,
    getPermissions,
    deletePermission,
    updatePermission
}