const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema(
    {
        id: ObjectId,
        
        firstName: {
            type: String,

        },

        lastName: {
            type: String
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        username:{
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        user_type: {
            type: String,
            default: "customer",
            enum: ["customer", "admin"],
        
        }
    }
)

// next we write a pre-hook
// this function is called before the user's details is saved to the DB
// its function is to retrieve the plain password text, hash it and the store it


UserSchema.pre(
    'save',
    async function (next){
        const user = this
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash
        next();
    }
)

// this can be done when working with mongoose; you can add functions that should be called before or after happens

const users = mongoose.model("users", UserSchema)

module.exports = users