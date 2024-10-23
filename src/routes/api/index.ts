import {Router} from 'express';
import employeeRoute from './employeeRoutes.ts';
import departmentRoute from './departmentRoutes.ts';
import roleRoute from './roleRoutes.ts';

const router = Router();

router.use('/employee', employeeRoute);
router.use('/department', departmentRoute);
router.use('./role', roleRoute);

export default router;