const userModel = require("../model/userSchema");
const emailValidator = require("email-validator");

// Signup controller
const signup = async (req, res, next) =>{
    const {username, password, confirmPassword} = req.body;
    console.log(username, password, confirmPassword);
    // Check if all fields are filled
    if (!username || !password || !confirmPassword) {   
        return res.status(400).json({
            sucess : false,
            message : "All fields are required"
        })
    }
    // Check if password and confirm password are same
    if (password !== confirmPassword) {
        return res.status(400).json({
            sucess : false,
            message : "Password does not match"
        })
    }
    // Check if email is valid
    const validEmail = emailValidator.validate(username);
    if (!validEmail) {
        return res.status(400).json({
            sucess : false,
            message : "Invalid email"
        })
    }

    try {
        const userInfo = new userModel(req.body);
        const result = await userInfo.save();

        return res.status(200).json ({
            sucess : true,
            data : { result }
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                sucess : false,
                message : "Email already exists"
            })
        } 
        return res.status(400).json({
            sucess : false,
            message : error.message || "Internal server error"
        })
    }
}

// Signin controller
const signin = async (req, res, next) => {
    const {username, password} = req.body;
    // Check if all fields are filled
    if (!username || !password) {
        return res.status(400).json({
            sucess : false,
            message : "All fields are required"
        })
    }
    // Check if email is valid
    const user = await userModel.findOne({email : username}).select("+password");
    if (!user || user.password !== password) {
        return res.status(400).json({
            sucess : false,
            message : "Invalid credentials"
        })
    }
    // Generate JWT token
    try {
        const token = user.JWTAuthToken();
        user.password = undefined;

        const cookieOption = {
         expires : new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly : true
        }

        res.cookie("token", token, cookieOption);
        res.status(200).json({
            sucess : true,
            data : { user }
        })
    } catch (error) {
        res.status(400).json({
            sucess : false,
            message : error.message || "Internal server error"
        })
    }
}

module.exports = {
    signup,
    signin
}