/**connection page to mongoose */

import mongoose, { Mongoose } from 'mongoose';

let isConnected = false; //variable to check if mongoose is connected

export const connectToDB = async () => {
    mongoose.set('strictQuery', true); //to prevent unknown field queries

    /**check if we have a mongodb URL to connect to  */
    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');

    /**check if we are alreadyt connected  */
    if(isConnected) return console.log('Already connected to MongoDB');

    /**if its not the case, we will try to make a connection */
    try {
        await mongoose.connect(process.env.MONGODB_URL); //trying to connect to mongodb DB
        
        isConnected = true; 
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}
