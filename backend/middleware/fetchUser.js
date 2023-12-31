var jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req,res,next)=>{
    // Get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({success: false, error:'Incorrect Credentials 1'})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }catch(error){
        return res.status(401).json({success: false, error:'Incorrect Credentials'})
    }
}

module.exports = fetchuser;