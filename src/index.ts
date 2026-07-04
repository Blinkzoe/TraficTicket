import { loadVehicles } from "./utils/vehicles.js";
import { consultarVehiculo } from "./services/scraper.js";
import { sendTelegram } from "./services/telegram.js";

function joinReports(reports: string[]): string {
    return reports.join("\n\n---\n\n");
}

async function main() {
    console.log("=== INICIO BOT ===");

    const vehicles = loadVehicles();

    const results: string[] = [];

    for (const v of vehicles) {
        const result = await consultarVehiculo(v);
        results.push(result);
    }

    const message =
        `📊 REPORTE VEHÍCULOS\n\n` +
        joinReports(results);

    await sendTelegram(message);
}

main().catch(console.error);