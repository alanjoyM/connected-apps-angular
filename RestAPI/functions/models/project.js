const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({

    id: {
        type: String,
        required : false
    },
   name: {
        type: String,
        required : true
   },
   status: {
        type: String,
        required : true
   },
   projectManager: {
        type: String,
        required : true
   },
   noOfTeamMembers: {
        type: Number,
        required : true
   },

   createdOn: {
        type: Date,
        required : true
   },

   projectCost: {
        type: Number,
        required : false
   },

   availableFunds: {
        type: Number,
        required : false
   },

   currentExpenditure: {
        type: Number,
        required : false
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

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;