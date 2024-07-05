import { db } from "../../../database/connection.js";

export const createBooking = async (req, res) => {
  try {
    const { passengerId, roundFlyId, bookInDate, returnFlyId, state } = req.body;

    // Crear la reservación
    const newBooking = await db.bookings.create({
      data: {
        passengerId,
        roundFlyId,
        bookInDate,
        returnFlyId,
        state
      }
    });

    // Generar el ticket para el vuelo de ida
    const outboundSeat = await db.seat.findFirst({
      where: { flyId: roundFlyId, state: 'DISPONIBLE' },
      orderBy: { seatNumber: 'asc' }
    });

    if (!outboundSeat) {
      return res.status(400).json({ error: "No hay asientos disponibles para el vuelo de ida" });
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
    if (returnFlyId) {
      const returnSeat = await db.seat.findFirst({
        where: { flyId: returnFlyId, state: 'DISPONIBLE' },
        orderBy: { seatNumber: 'asc' }
      });

      if (!returnSeat) {
        return res.status(400).json({ error: "No hay asientos disponibles para el vuelo de regreso" });
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
    const bookings = await db.bookings.findMany({
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

    const booking = await db.bookings.findUnique({
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

export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Buscar la reserva
    const booking = await db.bookings.findUnique({
      where: { bookingId },
      include: { Ticket: true }
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Actualizar el estado de la reserva a "CANCELADO"
    await db.bookings.update({
      where: { bookingId },
      data: { state: 'CANCELADO' }
    });

    // Liberar los asientos asociados
    for (const ticket of booking.Ticket) {
      await db.seat.updateMany({
        where: { seatNumber: ticket.seatNumber },
        data: { state: 'DISPONIBLE' }
      });
    }

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error cancelling booking: " + error.message });
  }
};
