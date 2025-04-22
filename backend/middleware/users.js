const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authenticate = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "ibad ninja secret");
      //console.log(decoded)
      const user = await User.findById(decoded.id).select("-password");
      
      if (!user) {
        return res.status(404).send("user not found")
      }
      
      req.user = user;
      next();
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ error: "Not authorized, token failed." });
    }
  } else {
    return res.status(401).json({ error: "Not authorized, no token." });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ error: "Not authorized as an admin." });
  }
};

module.exports={ authenticate, authorizeAdmin };

  
