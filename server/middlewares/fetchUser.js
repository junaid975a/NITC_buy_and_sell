const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    // Get the user from the JWT token and add it to the request object
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Invalid token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.id;
        // console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).send({ error: "Invalid token" });
    }
};

module.exports = fetchuser;
