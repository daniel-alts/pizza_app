const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const { Schema } = mongoose
const userModel = new Schema({
    firstname: String,
    lastname: String,
    date_Of_Birth: String,
    username: String,
    password: String,
    userType: {type: String, enum: ["user", "admin"]}
})

//create the pre-hook/pre-save
userModel.pre(
    "save",
    async function(next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
    }
);


//create a function to check if password coming from signin is correct or not
userModel.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}



module.exports = mongoose.model("user", userModel);