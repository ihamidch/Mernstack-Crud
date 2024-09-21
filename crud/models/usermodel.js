import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true,
    },
    email:
    {
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    password:
    {
        type:String,
        required:true,
    },
},{timestamps:true});

export default mongoose.model("User", userSchema)