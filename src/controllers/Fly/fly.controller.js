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

    // Crear 20 asientos para el nuevo vuelo con precios incrementales
    const seats = Array.from({ length: 20 }, (_, i) => {
      const row = Math.floor(i / 2) + 1; // Cada fila tiene 2 asientos
      const price = 25 + (row - 1) * 5; // Incremento de 5 por cada fila a partir de 25
      return {
        flyId: newFly.flyId,
        seatNumber: `A${i + 1}`,
        price: price,
        state: 'DISPONIBLE'
      };
    });

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
