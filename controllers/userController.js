const User = require('../models/User');

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = User.create(username, email, password);
    res.send("User created successfully: " + newUser.username);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
};