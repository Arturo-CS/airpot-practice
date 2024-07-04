import express from 'express';
import { createPassenger, getPassengers, getPassengerById, updatePassenger, deletePassenger } from '../controllers/Passenger/passenger.controller.js';

const router = express.Router();

router.post('/passengers', createPassenger);
router.get('/passengers', getPassengers);
router.get('/passengers/:id', getPassengerById);
router.put('/passengers/:id', updatePassenger);
router.delete('/passengers/:id', deletePassenger);

export default router;
