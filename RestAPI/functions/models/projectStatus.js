const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectStatusSchema = new Schema({

    _id: {
        type: String,
        required : true
    },
   name: {
        type: String,
        required : true
   },
   codename: {
    type: String,
    required : true
},

});
const ProjectStatus = mongoose.model('ProjectStatus', projectStatusSchema);
module.exports = ProjectStatus;