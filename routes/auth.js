const router = require('express').Router();
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

// router.route('/').get((req, res) => {
//    User.find()
//       .then(users => res.json(users))
//       .catch(err => res.status(400).json('Error: ' + err));
// });


// Register
router.post('/register', async (req, res) => {

   // Lets validate the data before we make a user
   const { error } = registerValidation(req.body)
   if (error) return res.status(400).send(error.details[0].message)

   // Checking if the user_email is already in the database
   const emailExist = await User.findOne({ users_email: req.body.users_email })
   if (emailExist) return res.status(400).send('Email already exists!')

   // Hash the password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(req.body.users_password, salt)

   // Create a new user
   const newUser = new User({
      users_first_name: req.body.users_first_name,
      users_last_name: req.body.users_last_name,
      users_email: req.body.users_email,
      users_password: hashedPassword
   });

   try {
      const savedUser = await newUser.save()
      res.send({ user: newUser._id })
   } catch (err) {
      res.status(400).send(err)
   }
});

// Login
router.post('/login', async (req, res) => {
   // Lets validate the inputs with data before a user log in
   const { error } = loginValidation(req.body)
   if (error) return res.status(400).send(error.details[0].message)

   // Checking if the user_email exists
   const user = await User.findOne({ users_email: req.body.users_email })
   if (!user) return res.status(400).send('Email or password is wrong')

   // Check if Password is correct
   const validPass = await bcrypt.compare(req.body.users_password, user.users_password)
   if (!validPass) return res.status(400).send('Email or password is wrong')

   // Create and assign a token
   const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
   res.header('auth-token', token).send(token)
})

module.exports = router;