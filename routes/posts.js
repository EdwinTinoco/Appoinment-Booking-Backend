const router = require('express').Router();
const verify = require('./protectedRoutes');

router.get('/', verify, (req, res) => {
   // res.json({
   //    posts: {
   //       title: 'my first post',
   //       description: 'random data'
   //    }
   // })

   res.send(req.user)
})



module.exports = router;