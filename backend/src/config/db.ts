import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_URL as string);
        console.log(`DB Connected`);

    } catch (error) {

        console.log(`connection faield: ${error}`);

    }
}
