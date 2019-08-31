const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const utils = require("../config/config");

exports.auth = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            data: user
          },
          utils.jwtSecret,
          { expiresIn: 3600000 }
        );
        return res.json(token);
      } else {
        return res.json("Incorret email or password");
      }
    }
    const newUser = new User({
      username,
      email,
      password
    });
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    newUser.password = hashedpassword;
    await newUser.save();

    const token = jwt.sign(
      {
        data: newUser
      },
      utils.jwtSecret,
      { expiresIn: 3600000 }
    );

    res.json(token);
  } catch (error) {
    res.json(error.message);
  }
};
