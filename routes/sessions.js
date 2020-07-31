const router = require('express').Router();
let Session = require('../models/sessions.model');

router.route('/').get((req, res) => {
   User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
   const users_email = req.body.users_email;
   const date = req.body.date;

   const newSession = new Session({
      users_email,
      date
   });

   newSession.save()
      .then(() => res.json('Session created!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;