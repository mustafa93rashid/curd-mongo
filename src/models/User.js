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
}, { 
    toJSON: { virtuals: true },
    timestamps: true });

// virtuals
userSchema.virtual("birthDate").get(function() {
    return new Date().getFullYear() - this.age  ;
});

// methods
userSchema.methods.skillsCount = function() {
    return this.skills.length;
}

// statics
userSchema.statics.findByAge = function(age) {
    return this.find().where("age").gte(age);
}

// query helpers
userSchema.query.byActive = function(active) {
    return this.where({ active });
}

const model = mongoose.model("User", userSchema)

module.exports = model