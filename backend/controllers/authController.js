const User = require("../Models/user")
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const express = require("express");
const session = require ("express-session");
const { StatusCodes } = require('http-status-codes');
const { log } = require("util");
const multer = require("multer");
const path = require ("path");
const app = express();
const secretKey = "your-secret-key";
// confi encodage data
app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: true
    })
);// Middleware to check and validate JWT



 
  
 
  
 
 
 const register =  async (req, res) => {
     console.log("here sign up");
     console.log("tt", req.body);
     req.body.role="client"
     try {
         // Check if the email already exists in the database
         const existingUser = await User.findOne({ email: req.body.email });
         if (existingUser) {
             return res.json({ msg: 'E-mail already exists' });
         }

         // Create the avatar URL using the uploaded file
         // Create a new user with the hashed password
         const newUser = new User({
             email: req.body.email,
             password: req.body.password,
             userName: req.body.userName,
             fullName: req.body.fullName,
             phoneNumber: req.body.phoneNumber,
             gender: req.body.gender,
             role:req.body.role,
            //  avatar: `http://localhost:3000/images/${req.file.filename}`
             // ... other fields of the model
         });
 
         // Save the user to the database
         await newUser.save();
        
        
        
         res.json({ msg: 'Registered successfully' });
     } catch (error) {
         console.error('Error during user registration:', error);
         res.json({ msg: 'Internal server error' });
     }
 };
 



const login = async (req, res) => {
    let user = req.body;

    // Check if the email exists
    const doc = await User.findOne({ email: user.email })
        // Email not found
        if (!doc) {
            return res.json({ msg: "Please check your Email" });
        }
    

        // Compare passwords
        const pwdResult = await doc.comparePassword(user.password);
        // Passwords do not match
        if (!pwdResult) {
            console.log("here")
            return res.json({ msg: "Please check your Password" }).status(StatusCodes.UNAUTHORIZED);
        }

        let userToSend = {
            userName: doc.userName,
            fullName: doc.fullName,
            id: doc._id,
            role: doc.role,
            email: doc.email,
            gender: doc.gender,
            phoneNumber: doc.phoneNumber
        };
        console.log(userToSend)

        const token = jwt.sign(userToSend, secretKey, { expiresIn: '24h' });
        

        res.json({ msg: "Welcome", token: token });
}


module.exports = {
    register,
    login
  };
  