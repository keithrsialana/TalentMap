
import express from 'express';
import apiRoutes from './api/index.ts';
import { Request,Response } from 'express';
const router = express.Router();

router.use('/api', apiRoutes);
router.get('*', (_req:Request, res:Response) => {
    res.status(404).end();
});

export default router;
