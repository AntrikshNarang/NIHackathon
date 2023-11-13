const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    contact:{
        type: Number,
    },
    College:{
        type: String,
    },
    teamName:{
        type: String
    },
    teamId:{
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    date:{
        type: Date,
        default: Date.now,
    }
});
const User = mongoose.model('user',userSchema);
module.exports = User;