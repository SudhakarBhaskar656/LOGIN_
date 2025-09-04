const jwt = require('jsonwebtoken');

const verifyAdmin = (request, response, next) => {

  const token= request.cookies.AccessToken;

  if (!token) return response.status(401).json({
    message: 'no token provided'
  })

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) return response.status(401).json({
      message: 'unauthorized'
    })

   

    if (decode.role !== 'admin') {
      return response.status(403).json({ message: 'Access denied. Admins only.' })
    };
     request.userId = decode.id;
    next();
  });
}
module.exports = verifyAdmin;


const verifyUser = (request, response, next) => {

  const token= request.cookies.AccessToken;

  if (!token) return response.status(401).json({
    message: 'no token provided'
  })

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) return response.status(401).json({
      message: 'unauthorized'
    })

   

    if (decode.role !== 'user') {
      return response.status(403).json({ message: 'Access denied. Admins only.' })
    };
     request.userId = decode.id;
    next();
  });
}
module.exports = verifyUser;