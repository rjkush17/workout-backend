const bcrypt = require("bcrypt");
const registerModel = require("../models/register-model")
const jwt = require('jsonwebtoken');


const login = async (req, res) =>{

   try {
    
    
    const loginID = req.body;

    // find the email in database
    const isRegistered = await registerModel.findOne({email : loginID.email})
    if(!isRegistered){
       return res.status(401).json({error:"Email is not registered"})
    }

    // compare password in bcrypt function to compare with hased paasword
    const isPasswordValid = await bcrypt.compare(loginID.password, isRegistered.password);
    if(!isPasswordValid){
        return res.status(401).json({error:"Password is wrong"})
    }

    let key = process.env.PRIVATE_KEY;

    const user = {
      name: isRegistered.name,
      email: isRegistered.email,
      password: isRegistered.password
    };

    // create jwt token
    const genrateToken =  jwt.sign({user},key,{expiresIn:'3h'})

    

    // send if login succesfully
    res.status(200).json({fullname:user.name, id:isRegistered._id, token :genrateToken})

   } catch (error) {
     console.log("error while login" + error)
   }
}

module.exports = login