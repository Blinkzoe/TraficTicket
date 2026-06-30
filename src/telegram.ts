import axios from "axios";
import { config } from "./config";

export async function SendTelegram(
    message: string
): Promise<void> {
    const url = `https://api.telegram.org/bot${config.telegramToken}/sendMessage`;

    try {
        await axios.post(url, {
            chat_id: config.chatId,
            text: message,
            parse_mode: "Markdown"
        });
        console.log("Message sent to Telegram successfully.");
    } catch (error) {
        console.error("Error sending message to Telegram:", error);
    }
}
