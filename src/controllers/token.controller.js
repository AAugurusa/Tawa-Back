//token authenticator for user small security measure
import config from '../config';


const jwt = require('jsonwebtoken');

function createToken (req, res){
  const payload = {
    check: true
  };
  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "1h" // expires in 1 hour  
  });
  res.json({
    message: 'Token generated',
    token: token
  });
}

const verification = (req, res, next) => {
  const cookieParser = require('cookie-parser');



  const jwt = require('jsonwebtoken');

  const authHeader = req.cookies.authcookie;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(authHeader, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach the user ID to the request object
    req.user = {
      id: decoded.id,
    };

    return next();
  });
}
 

export const methods = {
    createToken,
    verification
};



