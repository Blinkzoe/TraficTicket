import { chromium, Browser } from "playwright";
import { config } from "../config/config.js";
import type { Vehicle } from "../types/vehicle.js";

export async function consultarVehiculo(vehicle: Vehicle): Promise<string> {
    let browser: Browser | null = null;

    try {
        console.log(`🚀 Consultando ${vehicle.tag}`);

        browser = await chromium.launch({
            headless: config.headless
        });

        const page = await browser.newPage();

        await page.goto(config.url, { timeout: 60000 });

        await page.fill('//*[@id="placa"]', vehicle.plate);
        await page.fill('//*[@id="numeroSerie"]', vehicle.serial);
        await page.fill('//*[@id="nombrePropietario"]', vehicle.owner);
        await page.fill('//*[@id="numeroMotor"]', vehicle.engine);

        await page.click('//*[@id="btnConsultar"]');

        await page.waitForTimeout(8000);

        const el = page.locator('//*[@id="frmAdeudos"]/div[3]');

        if (await el.isVisible()) {
            const txt = (await el.innerText()).trim();

            if (txt.length > 100) {
                return formatAdeudo(vehicle, txt);
            }

            return `✅ Limpio: ${vehicle.tag}`;
        }

        return `✅ Limpio: ${vehicle.tag}`;
    } catch (err: any) {
        return `❌ Error ${vehicle.tag}: ${err.message}`;
    } finally {
        if (browser) await browser.close();
    }
}

function formatAdeudo(vehicle: Vehicle, text: string): string {
    return (
        `⚠️ Adeudo: ${vehicle.tag} (${vehicle.plate})\n\n` +
        "```" + "\n" +
        text +
        "\n```"
    );
}