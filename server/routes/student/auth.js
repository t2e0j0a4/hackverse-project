import express from 'express';
const router = express.Router();
import {
  login,
  register,
  googleAuth,
  validUser,
  updateUser,
  educationDetails,
} from '../../controllers/student/auth.js';
import { AuthenticateStudent } from '../../middleware/student.js';
import {
  courseProgress,
  enrollCourse,
} from '../../controllers/student/course.js';
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/google', googleAuth);
router.get('/auth/valid-student', AuthenticateStudent, validUser);
router.patch('/me', AuthenticateStudent, updateUser);
router.patch('/me/education', AuthenticateStudent, educationDetails);
router.post('/course/enroll/:courseId', AuthenticateStudent, enrollCourse);
router.patch(
  '/course/enroll/:courseId/:sectionId/:lectureId',
  AuthenticateStudent,
  courseProgress
);
export default router;
