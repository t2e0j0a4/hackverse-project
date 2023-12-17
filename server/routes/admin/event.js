import express from 'epress';
import { upload } from '../../connections/Aws.js';
import { checkAdmin } from '../../middleware/admin.js';
import {
  deleteEvent,
  postEvent,
  updateEvent,
} from '../../controllers/admin/event.js';
const router = express.Router();

router.post('/', upload.single('eventBanner'), checkAdmin, postEvent);
router.patch(
  '/:eventId',
  upload.single('eventBanner'),
  checkAdmin,
  updateEvent
);
router.delete('/:slug', checkAdmin, deleteEvent);
export default router;
