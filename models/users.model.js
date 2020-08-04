const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
   users_first_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
   },
   users_last_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
   },
   users_email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 6
   },
   users_password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 1024
   },
}, {
   timestamps: true,
});


module.exports = mongoose.model('Users', usersSchema);