const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    // Get the user from the JWT token and add it to the request object
    let token;
    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.id;
            // console.log(req.user);
            next();
        } catch (e) {
            res.status(401).send({message:e.message});
        }
    }
    if(!token){
        res.status(401).send({message:"Unauthorized access"})
    }
    
};

module.exports = fetchuser;

