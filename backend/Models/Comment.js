const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Please provide comment text'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    lawyer: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);



module.exports = mongoose.model('Comment', CommentSchema);
