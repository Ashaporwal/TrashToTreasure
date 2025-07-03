import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import UserRouter from "./route/user.route.js";
import ProductRouter from "./route/product.route.js";
import cors from "cors";

dotenv.config();
const app = express();


app.use(cors());
      app.use(cookieParser());
      app.use(express.json());
    // app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

 app.use("/user",UserRouter); 
 app.use("/product",ProductRouter);

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected ");

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server started on port", process.env.PORT || 3000);
    });
  })
  .catch((err) => {
    console.log("DB failed ", err);
  });


