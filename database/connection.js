import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient(); 

export const conectionDB = async () => {
    try {
        await db.$connect();
        console.log('>> Connected Database!');
    } catch (error) {
        console.log(error);
        console.log('xx Not Connected.');
        await db.$disconnect();
    }
}
