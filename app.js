import express from 'express';
import cors from "cors";
import morgan from 'morgan';
import cookie from 'cookie-parser';
import airportRoutes from './src/routes/airport.routes.js';
import passengerRoutes from './src/routes/passenger.routes.js';
import flyRoutes from './src/routes/fly.routes.js'
import bookingsRoutes from './src/routes/bookings.routes.js'
import { seedDatabase } from './src/seed/seed.js';

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    optionsSuccessStatus: 200,
    credentials: true
    //allowedHeaders: 'Content-Type'
}))

app.use(morgan('dev'))
app.use(cookie())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//seedDatabase()
// Agregar la ruta "/" para mostrar el mensaje de bienvenida
app.get('/', (req, res) => {
    res.send('Bienvenido a la práctica - Semana 9');
});

app.use('/api', airportRoutes);
app.use('/api', passengerRoutes);
app.use('/api', flyRoutes);
app.use('/api', bookingsRoutes);

export default app;