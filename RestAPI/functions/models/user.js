const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    userID: {
        type: String,
        required : false
    },
   firstName: {
        type: String,
        required : true
   },
   lastName: {
        type: String,
        required : true
   },
   email: {
        type: String,
        required : true
   },
   password: {
        type: String,
        required : true
   },
   errorCode: {
        type: String,
        required : false
  },

   errorMessage: {
        type: String,
        required : false
  }
},{ timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;