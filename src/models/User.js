const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
    active: Boolean,
    email:{
        type: String,
        required: true,
        unique: true,
        // minlength: 10,
        // maxlength: 50,
        // validate: {
        //     validator:(val)=> {
        //         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
        //     },
        //     message: "Please enter a valid email address"
        // }

        },
                skills:[String],
        address: {
            code: String,
            location: String,
    }
}, { timestamps: true });

const model = mongoose.model("User", userSchema)

module.exports = model