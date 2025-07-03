import { validationResult } from "express-validator";
import express, { request, response } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv  from "dotenv";

dotenv.config();

export const createUser = async (request, response, next) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", errorMessages: errors.array() });
        const { name, email, contact, password } = request.body;
        const existing = await User.findOne({ email });

        if (existing) {
            return response.status(409).json({ error: "Email already registered" });
        }



        let result = await User.create({ name, password, contact, email });
        console.log("User created:", result.email);

        await sendEmail(email, name);
        return response.status(200).json({ message: "Successfully created " });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server error" });
    }
}

export const verifyAccount = async (request, response, next) => {
    try {
        console.log("BODY RECEIVED:", request.body);
        let { email } = request.body;
        let result = await User.updateOne({ email }, { $set: { isVerified: true } });

        if (result.matchedCount === 0)
            return response.status(404).json({ error: "Email not found" });

        return response.status(200).json({ message: "ACcount verified Successfully.." });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server error" });

    }
}
export const getAllUser = async (request, response, next) => {
    try {

        let alluser = await User.find();
        return response.status(200).json({ message: "ALl user found Successfully", users: alluser });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internal server error" });
    }
}

export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });

        if (!user)
            return response.status(401).json({ error: "User does not exist" });

        if (!user.isVerified)
            return response.status(403).json({ error: "Account not verified" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return response.status(401).json({ error: "Invalid password" });

        return response.status(200).json({ message: "Login successful", user });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
};


const sendEmail = (email,name) => {
    return new Promise((resolve,reject)=>{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
    
        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Account Verification',
            html: `<h4>Dear ${name}</h4>
            <p>Thank you for registration. To verify account please click on below button</p>
            <form method="post" action="http://localhost:3000/user/verification">
              <input type="hidden" name="email" value="${email}"/>
              <button type="submit" style="background-color: blue; color:white; width:200px; border: none; border: 1px solid grey; border-radius:10px;">Verify</button>
            </form>
            <p>
               <h6>Thank you</h6>
               Backend Api Team.
            </p>
            `
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
              resolve();
            }
        });
    });
    
}


// export const logout = async(request,response,next)=>{
//     try{

//     }catch
// }












// export const authenticateUser = async(request,response,next){
//     try{
//         let {email,password} = request.body;

//         let user = await User.findOne({email});

//         if(!user.isverfied)
//             return response.status(401).json({error:"Unauthorized user | Account is not verified"});
//         let status = await bcrypt.compare(password,user.password);
//         user.password = undefined;


//     }
// }





