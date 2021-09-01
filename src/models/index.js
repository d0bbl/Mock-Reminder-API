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
  bulk_write: {
    type:Boolean,
    required: true
  },
  object_id: { 
    type: String, 
    required: false
  },
  filter: {
    type: Object,
    required: false
  },
  payload: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('Data', dataSchema);