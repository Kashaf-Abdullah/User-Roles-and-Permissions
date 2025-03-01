const mongoose=require('mongoose')
const likeSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
       
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Post'
       
    },
    comment:{
        type:String,
        required:true
    }

})


module.exports=mongoose.model('Like',likeSchema)