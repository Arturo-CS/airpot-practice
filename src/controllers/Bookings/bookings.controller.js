import { db } from "../../../database/connection.js";

export const createBooking = async (req, res) => {
  try {
    const { passengerId, roundFly, bookInDate, returnFly, state } = req.body;

    // Crear la reservación
    const newBooking = await db.booking.create({
      data: {
        passengerId,
        roundFly,
        bookInDate,
        returnFly,
        state
      }
    });

    // Generar el ticket para el vuelo de ida
    const outboundSeat = await db.seat.findFirst({
      where: { flyId: roundFly, state: 'RESERVADO' },
      orderBy: { seatNumber: 'asc' }
    });

    if (!outboundSeat) {
      return res.status(400).json({ error: "No available seats for outbound flight" });
    }

    const outboundTicket = await db.ticket.create({
      data: {
        bookingId: newBooking.bookingId,
        seatNumber: outboundSeat.seatNumber,
        boardingTime: new Date(), // Puedes ajustar esto según tus necesidades
        terminal: 'A', // Ajusta esto según sea necesario
        gate: '1' // Ajusta esto según sea necesario
      }
    });

    // Actualizar el estado del asiento a 'COMPRADO'
    await db.seat.update({
      where: { seatId: outboundSeat.seatId },
      data: { state: 'COMPRADO' }
    });

    const tickets = [outboundTicket];

    // Si es ida y vuelta, generar el ticket para el vuelo de regreso
    if (returnFly) {
      const returnSeat = await db.seat.findFirst({
        where: { flyId: returnFly, state: 'RESERVADO' },
        orderBy: { seatNumber: 'asc' }
      });

      if (!returnSeat) {
        return res.status(400).json({ error: "No available seats for return flight" });
      }

      const returnTicket = await db.ticket.create({
        data: {
          bookingId: newBooking.bookingId,
          seatNumber: returnSeat.seatNumber,
          boardingTime: new Date(), // Puedes ajustar esto según tus necesidades
          terminal: 'B', // Ajusta esto según sea necesario
          gate: '2' // Ajusta esto según sea necesario
        }
      });

      // Actualizar el estado del asiento a 'COMPRADO'
      await db.seat.update({
        where: { seatId: returnSeat.seatId },
        data: { state: 'COMPRADO' }
      });

      tickets.push(returnTicket);
    }

    res.status(201).json({ newBooking, tickets });
  } catch (error) {
    res.status(500).json({ error: "Error creating booking: " + error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await db.booking.findMany({
      include: {
        Passenger: true,
        Ticket: true
      }
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings: " + error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await db.booking.findUnique({
      where: { bookingId: parseInt(id, 10) },
      include: {
        Passenger: true,
        Ticket: true
      }
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Error fetching booking: " + error.message });
  }
};
