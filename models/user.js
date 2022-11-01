const bcrypt = require("bcrypt")
const { Schema, model } = require("mongoose");
const {isEmail} = require("validator").default;


const userSchema = new Schema({
    firstname: String,
    lastname: String,
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

userSchema.virtual("fullname")
    .get(function() {
        return this.firstName + " " + this.lastName
    })
    .set(function(v) {
        [this.firstName, this.lastName] = v.split(" ")
    })


// Hash password before storing it to the database
userSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

// Validate stored password
userSchema.methods.validatePassword = async function(password) {
    const storedHash = this.password
    const isValid = bcrypt.compare(password, storedHash)
    return isValid
}

const User = model("User", userSchema)


module.exports = User