const mongoose = require("mongoose");
const { Schema } = mongoose;

const AudioSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user'
  },

  createdOn:{
    type:String
  },
  url:  {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Audio", AudioSchema);
