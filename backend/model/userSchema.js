const mongoose = require('mongoose');
const { Schema } = mongoose;
const JWT = require('jsonwebtoken');

const userSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        trim : true
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        trim : true,
        unique : [true, 'Email already exists']
    },
    password : {
        type : String,
        required : true,
        trim : true,
        select : false
    },
    forgetPasswordToken : {
        type : String
    },
    forgetPasswordExpire : {
        type : Date
    }, 
    createdAt : {
        type : Date,
        default : Date.now
    }
});

userSchema.methods = {
    JWTAuthToken () {
        return JWT.sign(
            { id : this._id, email : this.email },
            process.env.SECRET,
            { expiresIn : '24h' }
        )
    }
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;