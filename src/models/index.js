const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
  plugin_id: {
    type:String,
    required: true
  },
  organization_id: {
    type:String,
    required: true
  },
  collection_name: {
    type: String,
    required: true
  },
  object_id: { 
    type: String,
    unique: true, 
    required: false
  },
  payload: {
    type: Object,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model('Data', dataSchema);