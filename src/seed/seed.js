import { db } from "../../database/connection.js";

export async function seedDatabase() {
    const airports = [
        { address: "One World Way, Los Angeles, CA 90045", name: "Los Angeles International Airport", country: "USA", region: "California", state: "OPERATIVO" },
        { address: "Hartsfield-Jackson Atlanta International Airport, Atlanta, GA 30320", name: "Hartsfield-Jackson Atlanta International Airport", country: "USA", region: "Georgia", state: "OPERATIVO" },
        { address: "Chicago, IL 60666", name: "O'Hare International Airport", country: "USA", region: "Illinois", state: "FUERA_DE_SERVICIO" },
        { address: "John F Kennedy International Airport, Queens, NY 11430", name: "John F. Kennedy International Airport", country: "USA", region: "New York", state: "INACTIVO" },
        { address: "Beijing, China", name: "Beijing Capital International Airport", country: "China", region: "Beijing", state: "OPERATIVO" },
        { address: "Singapore Changi Airport, Singapore", name: "Changi Airport", country: "Singapore", region: "Singapore", state: "OPERATIVO" },
        { address: "Dubai International Airport, Dubai, UAE", name: "Dubai International Airport", country: "UAE", region: "Dubai", state: "FUERA_DE_SERVICIO" },
        { address: "Heathrow Airport, Longford TW6, UK", name: "Heathrow Airport", country: "UK", region: "London", state: "OPERATIVO" },
        { address: "Haneda Airport, Tokyo, Japan", name: "Haneda Airport", country: "Japan", region: "Tokyo", state: "INACTIVO" },
        { address: "Charles de Gaulle Airport, 95700 Roissy-en-France, France", name: "Charles de Gaulle Airport", country: "France", region: "Île-de-France", state: "OPERATIVO" }
      ];
      
      for (const airport of airports) {
        await db.airport.create({ data: airport });
      }
      
    
      const flights = [
        { planeId: 1, originAirportId: 1, originDate: new Date('2023-07-01T08:00:00.000Z'), destineAirportId: 2, destineDate: new Date('2023-07-01T12:00:00.000Z'), state: "OPERATIVO" },
        { planeId: 2, originAirportId: 2, originDate: new Date('2023-07-02T14:00:00.000Z'), destineAirportId: 3, destineDate: new Date('2023-07-02T18:00:00.000Z'), state: "OPERATIVO" },
        { planeId: 3, originAirportId: 3, originDate: new Date('2023-07-03T10:00:00.000Z'), destineAirportId: 4, destineDate: new Date('2023-07-03T14:00:00.000Z'), state: "OPERATIVO" },
        { planeId: 4, originAirportId: 4, originDate: new Date('2023-07-04T06:00:00.000Z'), destineAirportId: 5, destineDate: new Date('2023-07-04T10:00:00.000Z'), state: "OPERATIVO" },
        { planeId: 5, originAirportId: 5, originDate: new Date('2023-07-05T08:00:00.000Z'), destineAirportId: 6, destineDate: new Date('2023-07-05T12:00:00.000Z'), state: "OPERATIVO" },
        { planeId: 6, originAirportId: 6, originDate: new Date('2023-07-06T09:00:00.000Z'), destineAirportId: 7, destineDate: new Date('2023-07-06T13:00:00.000Z'), state: "OPERATIVO" },
        { planeId: 7, originAirportId: 7, originDate: new Date('2023-07-07T11:00:00.000Z'), destineAirportId: 8, destineDate: new Date('2023-07-07T15:00:00.000Z'), state: "OPERATIVO" },
        { planeId: 8, originAirportId: 8, originDate: new Date('2023-07-08T12:00:00.000Z'), destineAirportId: 9, destineDate: new Date('2023-07-08T16:00:00.000Z'), state: "OPERATIVO" },
        { planeId: 9, originAirportId: 9, originDate: new Date('2023-07-09T07:00:00.000Z'), destineAirportId: 10, destineDate: new Date('2023-07-09T11:00:00.000Z'), state: "OPERATIVO" },
        { planeId: 10, originAirportId: 10, originDate: new Date('2023-07-10T13:00:00.000Z'), destineAirportId: 1, destineDate: new Date('2023-07-10T17:00:00.000Z'), state: "OPERATIVO" }
      ];
      
      for (const flight of flights) {
        const newFly = await db.fly.create({ data: flight });
      
        // Crear 20 asientos para el nuevo vuelo
        const seats = Array.from({ length: 20 }, (_, i) => ({
          flyId: newFly.flyId,
          seatNumber: `A${i + 1}`,
          price: i < 10 ? 25 + (i * 5) : 75, // Precio incrementando de 25 a 75, dos asientos por fila
          state: 'DISPONIBLE'
        }));
      
        await db.seat.createMany({
          data: seats
        });
      }
          

      const passengers = [
        { name: "John", lastname: "Doe", documentType: "DNI", documentNumber: "12345678", phone: "555-1234", email: "johndoe@example.com" },
        { name: "Jane", lastname: "Smith", documentType: "CE", documentNumber: "87654321", phone: "555-5678", email: "janesmith@example.com" }
      ];
      
      for (const passenger of passengers) {
        await db.passenger.create({ data: passenger });
      }
      

  console.log("Database seeded successfully.");
}