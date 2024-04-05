const mongoose=require('mongoose')
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        requireD:true
    },
    categories:{
        type:Array,
        required:false
    }
})


module.exports=mongoose.model('Post',postSchema)