import express from 'express';
import { createBooking, getBookings, getBookingById } from '../controllers/Bookings/bookings.controller.js';

const router = express.Router();

router.post('/bookings', createBooking);
router.get('/bookings', getBookings);
router.get('/bookings/:id', getBookingById);

export default router;
