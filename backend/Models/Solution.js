const mongoose = require('mongoose');

const SolutionSchema = mongoose.Schema(
    {
          advice: {
            type: String,
            required: [true, 'Please provide advice'],
          },
          lawyer: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
          },
          question: {
            type: mongoose.Schema.ObjectId,
            ref: 'Question',
            required: true,
          },
    },
    { timestamps: true }
    
)


module.exports = mongoose.model('Solution', SolutionSchema);