import express from 'express';
import { createAirport, getAirports, getAirportById } from '../controllers/Airport/airport.controller.js';

const router = express.Router();

router.post('/airports', createAirport);
router.get('/airports', getAirports);
router.get('/airports/:id', getAirportById);

export default router;
