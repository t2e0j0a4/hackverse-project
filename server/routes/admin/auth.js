import express from 'express';
import { registerAdmin, loginAdmin } from '../../controllers/admin/auth.js';
const router = express.Router();

router.post('/auth/register', registerAdmin);
router.post('/auth/login', loginAdmin);
export default router;
