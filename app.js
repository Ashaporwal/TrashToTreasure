import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express.Router();

mongoose.connect(process.env.DB_URL)
.then(result=>{
    app.use(cors());
      app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(process.env.PORT||3000,()=>{
    console.log("db connected SUccessfully");
    });

}).catch(err=>{
   console.log("db failed");
});

