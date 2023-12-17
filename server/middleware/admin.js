import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';
export const checkAdmin = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res
      .status(401)
      .json({ message: 'Admin Not Authorized! Login first' });
  }
  // let accessToken = authorizationHeader.split(' ')[0]; // when using localHost
  let accessToken = authorizationHeader.split(' ')[1]; // when using postman
  if (!accessToken)
    return res
      .status(403)
      .json({ message: 'Admin Not Authorized! Login first' });
  let verfiyToken;
  try {
    verfiyToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ _id: verfiyToken.id })?.select(
      '-password'
    );
    if (!admin)
      return res
        .status(401)
        .json({ message: 'Not Authorized. Should be Admin!' });
    req.admin = admin;
    req.userToken = accessToken;

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
