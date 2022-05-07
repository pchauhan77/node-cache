const mongoose = require('mongoose');

const CacheSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
    trim: true,
  },

  key: {
    type: String,

    trim: true,
  },
});

module.exports = mongoose.model('Cache', CacheSchema);
