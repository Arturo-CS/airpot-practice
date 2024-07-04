import { db } from "../../../database/connection.js";

export const createAirport = async (req, res) => {
  try {
    const { address, name, country, region, state } = req.body;

    const newAirport = await db.airport.create({
      data: {
        address,
        name,
        country,
        region,
        state
      }
    });

    res.status(201).json(newAirport);
  } catch (error) {
    res.status(500).json({ error: "Error creating airport: " + error.message });
  }
};

export const getAirports = async (req, res) => {
  try {
    const airports = await db.airport.findMany();

    res.status(200).json(airports);
  } catch (error) {
    res.status(500).json({ error: "Error fetching airports: " + error.message });
  }
};

export const getAirportById = async (req, res) => {
  try {
    const { id } = req.params;

    const airport = await db.airport.findUnique({
      where: { airportId: parseInt(id, 10) }
    });

    if (!airport) {
      return res.status(404).json({ error: "Airport not found" });
    }

    res.status(200).json(airport);
  } catch (error) {
    res.status(500).json({ error: "Error fetching airport: " + error.message });
  }
};
