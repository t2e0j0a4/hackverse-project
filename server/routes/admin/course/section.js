import express from 'express';

import { checkAdmin } from '../../../middleware/admin.js';
import {
  addSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection,
} from '../../../controllers/admin/course/section.js';
const router = express.Router();
router.post('/:courseId/add-section', checkAdmin, addSection);

router.patch('/:courseId/section/:sectionId', checkAdmin, updateSection);
router.delete('/:courseId/section/:sectionId', checkAdmin, deleteSection);
export default router;
