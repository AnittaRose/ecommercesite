
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
            name: { 
                type: String 
            },
            email: { 
                type: String
            },
            phoneno: { 
                type: String,
            },
            password :{
                type:String
            },
            user_type:{

                type :mongoose.Schema.Types.ObjectId,
                ref : "usertypes"
            },
});

module.exports = mongoose.model('users', userSchema);
