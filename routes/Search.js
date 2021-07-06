const router = require('express').Router();
const User = require('../models/User');



router.get('/api/search',async (req, res) => {
   const key = req.body;
   const peoples = await User.find({fullName:key})
   

})

module.exports = router;