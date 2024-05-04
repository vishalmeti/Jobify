import { Router } from 'express';
import { register, login, logout, deleteUser, alluser } from '../controllers/authController.js';
import { validateLoginInput, validateRegisterInput } from '../middleware/validationMiddleware.js';
const router = Router();

router.post('/register',validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.post('/logout', logout);
router.get('/all', alluser);
router.delete('/:email',deleteUser)

export default router;