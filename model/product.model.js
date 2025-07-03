import mongoose, { get, version } from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        default:[]
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
       required:true
    },
    stock:{
        type:Number,
        required:true
    },
    isAvailable:{
        type:Boolean,
        required:true,

    }
});

export const Product = mongoose.model("product",productSchema);
