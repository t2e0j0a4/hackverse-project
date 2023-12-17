import express from 'express';
import {
  getAllStudents,
  getStudent,
} from '../../controllers/public/student.js';
import {
  getAllCourses,
  getCourseById,
} from '../../controllers/admin/course/courses.js';
import {
  getAllSections,
  getSectionById,
} from '../../controllers/admin/course/section.js';
import {
  getLectureById,
  getLecturesBySection,
} from '../../controllers/admin/course/lecture.js';
import {
  allEvents,
  eventBySlug,
  searchEvent,
} from '../../controllers/public/event.js';
import { insertEvents } from '../../controllers/admin/event.js';

const router = express.Router();
// router.post('/events', insertEvents);
router.get('/student/all', getAllStudents);
router.get('/student/:studentId', getStudent);
router.get('/courses/all', getAllCourses);
router.get('/course/:courseId', getCourseById);
router.get('/course/:courseId/section/all', getAllSections);
router.get('/course/:courseId/section/:sectionId', getSectionById);
router.get(
  '/course/:courseId/section/:sectionId/lecture/all',

  getLecturesBySection
);
router.get(
  '/course/:courseId/section/:sectionId/lecture/:lectureId',

  getLectureById
);
router.get('/event/all', allEvents);
router.get('/event/:slug', eventBySlug);
router.get('/events', searchEvent);

export default router;
