import dotenv from "dotenv";
dotenv.config();

function required(name: string, value: string | undefined): string {
    if (!value) throw new Error(`Missing env var: ${name}`);
    return value;
}

export const config = {
    telegramToken: required("TELEGRAM_TOKEN", process.env.TELEGRAM_TOKEN),
    chatId: required("CHAT_ID", process.env.CHAT_ID),
    headless: process.env.HEADLESS === "true",
    url: "https://gobiernoenlinea1.jalisco.gob.mx/serviciosVehiculares/"
};