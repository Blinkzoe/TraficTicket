// src/services/telegram.ts

import axios from "axios";
import { config } from "./config/config.js";

export async function sendTelegram(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${config.telegramToken}/sendMessage`;

    try {
        await axios.post(url, {
            chat_id: config.chatId,
            text: message,
            parse_mode: "Markdown"
        });

        console.log("📲 Telegram enviado");
    } catch (err) {
        console.error("❌ Error Telegram:", err);
    }
}