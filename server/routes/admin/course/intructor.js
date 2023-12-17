import express from 'express';
import {
  addInstructor,
  deleteInstructor,
  getAllInstructors,
  getInstructorById,
  updateInstructor,
} from '../../../controllers/admin/course/instructor.js';
import { checkAdmin } from '../../../middleware/admin.js';
import { upload } from '../../../connections/Aws.js';
const router = express.Router();
router.post('/', upload.single('profilePic'), checkAdmin, addInstructor);
router.patch(
  '/:instructorId',
  upload.single('profilePic'),
  checkAdmin,
  updateInstructor
);
router.delete('/:instructorId', checkAdmin, deleteInstructor);
router.get('/:instructorId', checkAdmin, getInstructorById);
router.get('/all', checkAdmin, getAllInstructors);

export default router;
