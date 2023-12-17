import express from 'express';
import { checkAdmin } from '../../../middleware/admin.js';
import { upload } from '../../../connections/Aws.js';
import {
  addCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from '../../../controllers/admin/course/courses.js';
const router = express.Router();

router.post('/add-course', upload.single('coverImage'), checkAdmin, addCourse);

router.patch(
  '/:courseId',
  upload.single('coverImage'),
  checkAdmin,
  updateCourse
);
router.delete('/:courseId', checkAdmin, deleteCourse);
export default router;
