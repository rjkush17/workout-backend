const registerModel = require("../models/register-model");
var jwt = require('jsonwebtoken');

// installed bcrypt libralies for scure password hashing
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
            const user = req.body;

            // agar user 4 latter see kaam ka password dalta hai tho 
            const minPasswordLength = 4;
            if (user.password.length < minPasswordLength) {
                return res.status(400).json({ error: "Password must be at least 4 characters long" });
            }

            // double email pe register na ho liye 
            let duplicate = await registerModel.findOne({email : user.email})
            if(duplicate){
                return res.status(400).json({error:"Email already registered"})
            }

            // salt round means kitne strong hash karna hai 
            const saltRound = 10;
            // salt genrate karne k liye yaha function
            bcrypt.genSalt(saltRound, function (err, salt) {
                // agar error aa gaya tho yaha bata dega
                        if (err) {
                            console.log(err);
                        }

                                // genSalt se salt leker apne password ko mix karega
                                bcrypt.hash(user.password, salt, async function (err, hash) {
                                    // agar error aa gaya tho yaha bata dega
                                    if (err) {
                                    console.log(err);
                                    }

                                    try {
                                        user.password = hash
                                        // hash password ko database me save karne k liye 
                                   const createdUser = await registerModel.create(user);

                                    let key = process.env.PRIVATE_KEY;
                                    // create jwt token
                                    const genrateToken =  jwt.sign({user},key,{expiresIn:'3h'})


                                    res.status(201).json({ fullname : user.name,id:createdUser._id,token: genrateToken});
                                    } catch (error) {
                                        // ahar data base me save nhi hua tho ye error print kardega
                                    console.error("Error creating hased password:", error);
                                    res
                                        .status(500)
                                        .json({ error: "Internal Server Error", msg: "User not created" });
                                    }
                        });
            });


  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", msg: "User not created" });
  }
};

module.exports = register;
