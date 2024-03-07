const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema(
    {
        topic: {
            type: String,
            trim: true,
            required: [true, 'Please provide topic'],
            maxlength: 100,
          },
          question: {
            type: String,
            trim: true,
            required: [true, 'Please provide question'],
            maxlength: 300,
          },
          situation: {
            type: String,
            required: [true, 'Please provide situation'],
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
          },
    },
    { timestamps: true }
    
)


module.exports = mongoose.model('Question', QuestionSchema);