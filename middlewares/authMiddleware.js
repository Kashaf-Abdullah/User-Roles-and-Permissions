const jwt=require('jsonwebtoken')

const verifyToken=async(req,res,next)=>{
    //token send by 3 ways ...1->header,2->body,3->query
 const token=req.body.token || req.query.token || req.headers['authorization']
if(!token){
    return res.status(403).json({
        success: false,
        msg: 'A token is required for authentication'
    });
}


try{
//Brearer and token show ,so we need only token

// Bearer Token(anystring)
//   0      1
const bearer=token.split(' ')// space between Brearer and token
const bearerToken=bearer[1]
console.log(bearerToken)

const decodedData=jwt.verify(bearerToken,process.env.ACCESS_SECRET_TOKEN)

req.user=decodedData.userId
}
catch(err){
    return res.status(400).json({
        success: false,
        msg: 'InvalidToken'
    });
}

return next()
}

module.exports=verifyToken