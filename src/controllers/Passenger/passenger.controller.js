import { db } from "../../../database/connection.js";

export const createPassenger = async (req, res) => {
  try {
    const { name, lastname, documentType, documentNumber, phone, email } = req.body;

    const newPassenger = await db.passenger.create({
      data: {
        name,
        lastname,
        documentType,
        documentNumber,
        phone,
        email
      }
    });

    res.status(201).json(newPassenger);
  } catch (error) {
    res.status(500).json({ error: "Error creating passenger: " + error.message });
  }
};

export const getPassengers = async (req, res) => {
  try {
    const passengers = await db.passenger.findMany();

    res.status(200).json(passengers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching passengers: " + error.message });
  }
};

export const getPassengerById = async (req, res) => {
  try {
    const { id } = req.params;

    const passenger = await db.passenger.findUnique({
      where: { passengerId: parseInt(id, 10) }
    });

    if (!passenger) {
      return res.status(404).json({ error: "Passenger not found" });
    }

    res.status(200).json(passenger);
  } catch (error) {
    res.status(500).json({ error: "Error fetching passenger: " + error.message });
  }
};

export const updatePassenger = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, documentType, documentNumber, phone, email } = req.body;

    const updatedPassenger = await db.passenger.update({
      where: { passengerId: parseInt(id, 10) },
      data: {
        name,
        lastname,
        documentType,
        documentNumber,
        phone,
        email
      }
    });

    res.status(200).json(updatedPassenger);
  } catch (error) {
    res.status(500).json({ error: "Error updating passenger: " + error.message });
  }
};

export const deletePassenger = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPassenger = await db.passenger.delete({
      where: { passengerId: parseInt(id, 10) }
    });

    res.status(200).json(deletedPassenger);
  } catch (error) {
    res.status(500).json({ error: "Error deleting passenger: " + error.message });
  }
};
