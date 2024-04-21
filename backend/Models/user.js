//import mongoose
const bcrypt = require ("bcrypt");
const mongoose = require("mongoose");
const jwt = require ("jsonwebtoken");

const userSchema = mongoose.Schema({
         id : Number,
        fullName: String,
        userName: String,
        phoneNumber: Number,
        gender : String,
        password : String,
        confirmPassword:String,
        email:String,
        role : String,

        avatar : String,
    

        averageRating: {
                type: Number,
                default: 0,
              },
        numOfReviews: {
                type: Number,
                default: 0,
              }
},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual('reviews', {
        ref: 'Review',
        localField: '_id',
        foreignField: 'lawyer',
        justOne: false,
      });

userSchema.pre('save', async function () {
        // const salt = await bcrypt.genSalt(10)
        // this.password = await bcrypt.hash(this.password, salt)
        if (this.password)
        this.password = await bcrypt.hash(this.password, 10);
      })

      
userSchema.methods.comparePassword = async function (canditatePassword) {
        // const pwdResult = bcrypt.compareSync(user.password, doc.password);
        const pwdResult = bcrypt.compareSync(canditatePassword, this.password);
        return pwdResult
      }


// create user model
const user = mongoose.model("User", userSchema);
// export fichier user
module.exports = user;