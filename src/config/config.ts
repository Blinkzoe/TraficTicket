import dotenv from "dotenv";
dotenv.config();

export const config={
    telegramToken: process.env.TELEGRAM_TOKEN ?? "",
    chatId: process.env.CHAT_ID ?? "",

    vehicles: [
        {
            plate: process.env.VEHICLE1_PLATE ?? "",
            serial: process.env.VEHICLE1_SERIAL ?? "",
            owner: process.env.VEHICLE1_OWNER ?? "",
            engine: process.env.VEHICLE1_ENGINE ?? "",
            tag: process.env.VEHICLE1_TAG ?? "",
        },
        {
            plate: process.env.VEHICLE2_PLATE ?? "",
            serial: process.env.VEHICLE2_SERIAL ?? "",
            owner: process.env.VEHICLE2_OWNER ?? "",
            engine: process.env.VEHICLE2_ENGINE ?? "",
            tag: process.env.VEHICLE2_TAG ?? "",
        },
    ],              
};
