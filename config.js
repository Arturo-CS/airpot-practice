import { config } from "dotenv";
config();

export const TOKEN_SECRET = 'some secret key'

export const PORT = process.env.PORT || 4000