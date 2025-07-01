 import {Router} from 'express';
import { createUser, getAllUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/register', createUser);
router.get('/allusers', getAllUser);

export default router;
