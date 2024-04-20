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


// Traitement 
  // Middleware to check and validate JWT
const authenticateJWT = (req, res, next) => {
    try {
      // Check if Authorization header is present
      const authorizationHeader = req.header('Authorization');
      if (!authorizationHeader) {
        return res.status(401).json({ message: 'Unauthorized: Missing Authorization header' });
      }
  
      // Check if the Authorization header has the expected format
      const tokenParts = authorizationHeader.split(' ');
      if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Unauthorized: Invalid Authorization header format' });
      }
  
      const token = tokenParts[1];
  console.log("ttt",token);
      // Verify the JWT
      const user = jwt.verify(token, secretKey)
        
        req.user = user;
        console.log("rrr",user);
      
    } catch (error) {
      console.error('Error in authenticateJWT middleware:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
 
 // API endpoint to delete a user
 const deleteUser = async (req, res) => {
    try {
      // Assuming authenticateJWT is a middleware function
      await authenticateJWT(req, res);
  
      const userId = req.user.id;
      console.log("User ID to delete:", userId);
  const user = await User.deleteOne({_id: userId});
  if(user){

    res.json({ msg: 'User deleted successfully.' });
  }
  
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  };
  const getUserById = async(req,res) =>{
  console.log("here id",req.params.id);
  User.findById(req.params.id).then(
    (doc)=>{
      res.json({userFinded:doc});
    }
  )
  
  }
  
  const updateUser = async (req, res) => {
    console.log("hhh", req.body);
  
    // Vérifier si le mot de passe est fourni et n'est pas vide
    if (req.body.password && req.body.password.trim() !== '') {
      // Crypter le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
  
    User.updateOne({ email: req.body.email }, req.body).then(
      (doc) => {
        console.log('user updated', doc);
        if (doc.nModified === 1) {
          res.json({ msg: "update match success" });
        }
      }
    );
  };
  const uploadFile = async (req,res)=>{
    console.log("here fiel", req.body);
  }
  module.exports= {deleteUser,getUserById,updateUser,uploadFile};