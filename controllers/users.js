const User = require("../model/User");

exports.getUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
