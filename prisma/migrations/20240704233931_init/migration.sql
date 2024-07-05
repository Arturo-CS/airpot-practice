-- CreateEnum
CREATE TYPE "AirportState" AS ENUM ('OPERATIVO', 'FUERA_DE_SERVICIO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "FlyState" AS ENUM ('CANCELADO', 'OPERATIVO');

-- CreateEnum
CREATE TYPE "SeatState" AS ENUM ('RESERVADO', 'COMPRADO', 'DISPONIBLE');

-- CreateEnum
CREATE TYPE "BookingState" AS ENUM ('RESERVADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('DNI', 'CE');

-- CreateTable
CREATE TABLE "Airport" (
    "airportId" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "state" "AirportState" NOT NULL,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("airportId")
);

-- CreateTable
CREATE TABLE "Fly" (
    "flyId" SERIAL NOT NULL,
    "planeId" INTEGER NOT NULL,
    "originAirportId" INTEGER NOT NULL,
    "originDate" TIMESTAMP(3) NOT NULL,
    "destineAirportId" INTEGER NOT NULL,
    "destineDate" TIMESTAMP(3) NOT NULL,
    "state" "FlyState" NOT NULL,

    CONSTRAINT "Fly_pkey" PRIMARY KEY ("flyId")
);

-- CreateTable
CREATE TABLE "Seat" (
    "seatId" SERIAL NOT NULL,
    "flyId" INTEGER NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "state" "SeatState" NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("seatId")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "bookingId" SERIAL NOT NULL,
    "passengerId" INTEGER NOT NULL,
    "roundFly" TEXT NOT NULL,
    "bookInDate" TIMESTAMP(3) NOT NULL,
    "returnFly" TEXT NOT NULL,
    "state" "BookingState" NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("bookingId")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketId" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "boardingTime" TIMESTAMP(3) NOT NULL,
    "terminal" TEXT NOT NULL,
    "gate" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "Passenger" (
    "passengerId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Passenger_pkey" PRIMARY KEY ("passengerId")
);

-- AddForeignKey
ALTER TABLE "Fly" ADD CONSTRAINT "Fly_originAirportId_fkey" FOREIGN KEY ("originAirportId") REFERENCES "Airport"("airportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fly" ADD CONSTRAINT "Fly_destineAirportId_fkey" FOREIGN KEY ("destineAirportId") REFERENCES "Airport"("airportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_flyId_fkey" FOREIGN KEY ("flyId") REFERENCES "Fly"("flyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "Passenger"("passengerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Bookings"("bookingId") ON DELETE RESTRICT ON UPDATE CASCADE;
