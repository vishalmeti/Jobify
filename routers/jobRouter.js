import { Router } from 'express';
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import { validateIdParam, validateJobInput } from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

// router.get('/', getAllJobs);
// router.post('/', createJob);

router.route('/').get(getAllJobs).post(validateJobInput,checkForTestUser, createJob);
router
  .route('/:id')
  .get(validateIdParam,getJob)
  .patch(validateJobInput,validateIdParam,checkForTestUser, updateJob)
  .delete(validateIdParam,checkForTestUser,deleteJob);
  
export default router;