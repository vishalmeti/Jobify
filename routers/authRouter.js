import { Router } from 'express';
import { register, login, deleteUser } from '../controllers/authController.js';
import { validateLoginInput, validateRegisterInput } from '../middleware/validationMiddleware.js';
const router = Router();

router.post('/register',validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.delete('/:email',deleteUser)

export default router;