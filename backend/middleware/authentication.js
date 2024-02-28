const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes')

const isTokenValid = ( token ) => jwt.verify(token, process.env.JWT_SECRET);


const authenticateUser = async (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }

  // // check cookies
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  if (!token) {
    // throw new CustomError.UnauthenticatedError('Authentication invalid');
    return res.json({msg:"Authentication invalid"}).status(StatusCodes.UNAUTHORIZED);
  }
  
  try {
    console.log(token)
    const payload = await isTokenValid(token);

    console.log(payload)

    // Attach the user and his permissions to the req object
    // req.user = {
    //   userId: payload.user.userId,
    //   role: payload.user.role,
    // };
    req.user = {
      id: payload.id,
      role: payload.role
    };
    console.log(req.user)

    next();
  } catch (error) {
    // throw new CustomError.UnauthenticatedError('Authentication invalid');
    return res.json({error});
  }
};



module.exports = {
  authenticateUser,
};