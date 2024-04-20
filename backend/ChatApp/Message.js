const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
    {
        message: {
            type: String,
            trim: true,
            required: [true, 'Please provide message'],
            maxlength: 300,
          },
          roomId: {
            type: String,
            trim: true,
            required: [true, 'Please provide roomId'],
            maxlength: 300,
          },
          sender: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
          },
          receiver: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
          },
    },
    { timestamps: true }
    
)


module.exports = mongoose.model('Message', MessageSchema);