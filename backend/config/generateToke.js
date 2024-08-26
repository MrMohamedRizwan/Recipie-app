
const jwt=require('jsonwebtoken');
const generateToken=(id,role)=>{
    const tok=jwt.sign({id,role},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
    console.log(id)
    // redis(id,tok);
    return tok;
}
module.exports=generateToken;