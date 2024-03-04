
const jwt = require("jsonwebtoken")

async function authMiddleware(req, res, next) {
    try {
        console.log(req.headers)
            const authHeader = req.headers.authorization;
            console.log(authHeader)
        // if(!authHeader || !authHeader.startsWith('Bearer ')){
        //     return res.status(403).json({message : "NOT AUTHORIZED"})
        // }

        const token = authHeader.split(' ')[1];
            console.log(token)
        if(!token) {
            return res.status(403).json("Token is Invalid")
        }
        // need to verify that this token is generated using this jwt_secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // then send the id from the token
          req.userId = decoded;
        console.log(req.userId)
          next();

    } catch (error) {
        console.log("Error ", error)
    }
}

module.exports = {
    authMiddleware
}