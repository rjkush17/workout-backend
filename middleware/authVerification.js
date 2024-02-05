const jwt = require('jsonwebtoken')
const registerModel = require("../models/register-model")

const authMiddleware = async (req, res, next) => {

    //header file me se auth liya
    const { authorization } = req.headers;

    // agar auth nhi hua tho error
    if(!authorization){
        return res.status(401).json({msg:"Authorization token not found"})
    }

    // remove berer form token string
    const token = authorization.split(" ")[1];

    // jwt token ko varify b karna hai 
    try{
        const email = jwt.verify(token, process.env.PRIVATE_KEY)

        if(!email){
            return res.status(201).json({msg:"user erorr"})
        }

    }catch(error){
        return res.status(400).json({msg:"error while access jwt varification"})
    }

    next()
}

module.exports = authMiddleware;