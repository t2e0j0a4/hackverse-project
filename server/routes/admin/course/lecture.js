import express from 'express';
import { upload } from '../../../connections/Aws.js';
import { checkAdmin } from '../../../middleware/admin.js';
import {
  addLecture,
  updateLecture,
  deleteLecture,
  getLectureById,
  getLecturesBySection,
} from '../../../controllers/admin/course/lecture.js';

const router = express.Router();
router.post(
  '/:courseId/section/:sectionId/lecture',
  upload.single('lectureVideo'),
  checkAdmin,
  addLecture
);
router.patch(
  '/:courseId/section/:sectionId/lecture/:lectureId',
  upload.single('lectureVideo'),
  checkAdmin,
  updateLecture
);
router.delete(
  '/:courseId/section/:sectionId/lecture/:lectureId',
  checkAdmin,
  deleteLecture
);

export default router;
