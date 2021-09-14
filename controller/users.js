const {User, validate} = require('../models/user');
const _ = require('lodash');

exports.getallusers = async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
  }

exports.createuser = async (req, res) => {
        const { error } = validate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
      
  let user = await User.findOne({email: req.body.email})

  if(user) res.status(400).send('User already exists');

  user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  })

  await user.save();
  
  res.send({
      name: user.name,
      email: user.email
  });
      }