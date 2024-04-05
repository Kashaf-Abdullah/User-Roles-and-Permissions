const mongoose=require('mongoose')
const userPermissionSchema=new mongoose.Schema({
   //array of  user's permission
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
       
    },
    permissions:[{

        permission_name:String,
        permission_value:[Number]//0->Create,1->Read,2->Update,3->Delete
    }]
})


module.exports=mongoose.model('UserPermission',userPermissionSchema)