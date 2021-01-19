import mongoose from 'mongoose'

const userSchema =  new mongoose.Schema(
    {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    }, //Param 1 - schema obj
    {
        timestamps: true,
    } //Param 2 - schema options
);

const User = mongoose.model("User", userSchema);

export default User;