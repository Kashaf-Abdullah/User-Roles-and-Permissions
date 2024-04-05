const mongoose=require('mongoose')
const  permissionSchema=new mongoose.Schema({
   //array of  user's permission
   

   permission_name:{
    type:String,
    required:true
   },
  is_default:{
    type:Number,
    default:0  //0->not default k, 1->default
   }
})


module.exports=mongoose.model('Permission',permissionSchema)