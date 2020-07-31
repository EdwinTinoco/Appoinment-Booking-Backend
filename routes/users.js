const router = require('express').Router();
let User = require('../models/users.model');

router.route('/').get((req, res) => {
   User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
   const users_first_name = req.body.users_first_name;
   const users_last_name = req.body.users_last_name;
   const users_email = req.body.users_email;
   const users_password = req.body.users_password;

   const newUser = new User({
      users_first_name,
      users_last_name,
      users_email,
      users_password
   });

   newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;