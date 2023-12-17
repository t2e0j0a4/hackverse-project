import express from 'express';
import {
  courseProgress,
  enrollCourse,
} from '../../controllers/student/course.js';
import { AuthenticateStudent } from '../../middleware/student.js';
const router = express.Router();
router.post('/course/enroll/:courseId', AuthenticateStudent, enrollCourse);

export default router;
