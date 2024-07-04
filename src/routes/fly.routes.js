import express from 'express';
import { createFly, getFlies, getFlyById } from '../controllers/Fly/fly.controller.js';

const router = express.Router();

router.post('/flies', createFly);
router.get('/flies', getFlies);
router.get('/flies/:id', getFlyById);

export default router;
