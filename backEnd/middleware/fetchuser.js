var jwt = require('jsonwebtoken');
var JWT_SECRET= "chhavinathkaapp";
const fetchuser=(req,res,next)=>{
    const token= req.header("auth-token");
    if(!token){
      return  res.status(401).json({ errors:"please provide a valid authetication token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET );
        req.user= data.user;

    } catch (error) {
        return  res.status(401).json({ errors:"please provide a valid authetication token" });
    }
next();
}
module.exports= fetchuser