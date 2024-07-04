import { db } from "../../../database/connection.js";

export const createFly = async (req, res) => {
  try {
    const { planeId, originAirportId, originDate, destineAirportId, destineDate, state } = req.body;

    const newFly = await db.fly.create({
      data: {
        planeId,
        originAirportId,
        originDate,
        destineAirportId,
        destineDate,
        state
      }
    });

    // Crear 20 asientos para el nuevo vuelo
    const seats = Array.from({ length: 20 }, (_, i) => ({
      flyId: newFly.flyId,
      seatNumber: `A${i + 1}`,
      price: 100, // Puedes cambiar el precio según sea necesario
      state: 'RESERVADO'
    }));

    await db.seat.createMany({
      data: seats
    });

    res.status(201).json({ newFly, seats });
  } catch (error) {
    res.status(500).json({ error: "Error creating fly: " + error.message });
  }
};

export const getFlies = async (req, res) => {
  try {
    const flies = await db.fly.findMany({
      include: {
        Seat: true
      }
    });

    res.status(200).json(flies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching flies: " + error.message });
  }
};

export const getFlyById = async (req, res) => {
  try {
    const { id } = req.params;

    const fly = await db.fly.findUnique({
      where: { flyId: parseInt(id, 10) },
      include: {
        Seat: true
      }
    });

    if (!fly) {
      return res.status(404).json({ error: "Fly not found" });
    }

    res.status(200).json(fly);
  } catch (error) {
    res.status(500).json({ error: "Error fetching fly: " + error.message });
  }
};
