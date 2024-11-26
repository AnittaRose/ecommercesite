const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    user_type: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'usertypes' // Reference the usertype model if needed
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
