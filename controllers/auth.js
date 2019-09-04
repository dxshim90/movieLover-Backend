const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.json(`${email} already has an account`);
    }
    const newUser = new User({
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
      process.env.jwtSecret,
      { expiresIn: 3600000 }
    );
    const response = {
      user: newUser.email,
      collection: newUser.movies,
      token: token
    };

    res.json(response);
  } catch (error) {
    res.json(error.message);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            data: user
          },
          process.env.jwtSecret,
          { expiresIn: 3600000 }
        );
        const response = {
          user: user.email,
          collection: user.movies,
          token: token
        };
        return res.json(response);
      } else {
        return res.json("Incorret email or password");
      }
    } else {
      return res.json(`No Such account under ${email}`);
    }
  } catch (error) {
    res.json(error.message);
  }
};
