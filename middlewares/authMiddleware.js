const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      res.json({
        staus: false,
        msg: "Not Authorized token expired, Please Login again",
        error: error,
      });
    }
  } else {
    res.json({
      staus: false,
      msg: "There is No Token attached to the header.",
    });
  }
};

module.exports = authMiddleware;
