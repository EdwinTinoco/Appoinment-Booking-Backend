const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionsSchema = new Schema({
   users_email: {
      type: String,
      required: true,
      trim: true
   },
   date: {
      type: Date,
      required: true
   },
}, {
   timestamps: true,
});

const Sessions = mongoose.model('Sessions', sessionsSchema);

module.exports = Sessions;