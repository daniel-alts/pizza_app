const { Schema, model } = require("mongoose");
const {isEmail} = require("validator").default;


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: {
        type: String,
        validate: {
            validator: isEmail,
            message: (props) => {
                return `${props.value} is not a valid email`;
            },
        },
    },
    user_type: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
});

userSchema.virtual("fullName")
    .get(function() {
        return this.firstName + " " + this.lastName
    })
    .set(function(v) {
        [this.firstName, this.lastName] = v.split(" ")
    })


const User = model("User", userSchema)


module.exports = User