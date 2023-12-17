import jwt from 'jsonwebtoken';
import Student from '../models/student.js';

export const AuthenticateStudent = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).json({ message: 'Student not authenticated' });
  }
  let token = req.headers.authorization.split(' ')[1]; //when using postman this line
  // let token = req.headers.authorization.split(' ')[0]; //when using browser this line
  try {
    if (token.length < 500) {
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      const verifiedStudent = await Student.findOne({
        _id: verifyToken.id,
      })
        .populate({
          path: 'enrolledCourses.course',
          model: 'Course',
        })
        .select('-password');
      if (!verifiedStudent)
        return res.status(401).json({ message: 'Not Authorize! Login first' });
      req.rootStudent = verifiedStudent;
      req.token = token;
    } else {
      let data = jwt.decode(token);

      const googleUser = await Student.findOne({ email: data.email })
        .select('-password')
        .populate({
          path: 'enrolledCourses.course',
          model: 'Course',
        });
      if (!googleUser)
        return res.status(401).json({ message: 'Not Authorize! Login first' });
      req.rootStudent = googleUser;
      req.token = token;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Invalid Access Token' });
  }
};
