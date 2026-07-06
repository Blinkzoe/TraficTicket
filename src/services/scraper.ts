import { chromium, Browser } from "playwright";
import { config } from "../config/config.js";
import type { Vehicle } from "../types/vehicle.js";

export async function consultarVehiculo(vehicle: Vehicle): Promise<string> {
    let browser: Browser | null = null;

    try {
        console.log(`🚀 Checking ${vehicle.tag}`);

        browser = await chromium.launch({
            headless: config.headless
        });

        const page = await browser.newPage();

        await page.goto(config.url, {
            waitUntil: "domcontentloaded",
            timeout: 60000
        });

        await page.fill('//*[@id="placa"]', vehicle.plate);
        await page.fill('//*[@id="numeroSerie"]', vehicle.serial);
        await page.fill('//*[@id="nombrePropietario"]', vehicle.owner);
        await page.fill('//*[@id="numeroMotor"]', vehicle.engine);

        await page.click('//*[@id="btnConsultar"]');
        //await page.waitForTimeout(2000); 

        // SweetAlert2 toast displayed when the vehicle has no outstanding debts
        const toast = page.locator(".swal2-popup.swal2-toast");

        try {
            await toast.waitFor({
                state: "visible",
                timeout: 3000
            });

            const message = (await toast.innerText()).trim();

            if (message.toLowerCase().includes("no tiene adeudos")) {
                return (
                    `✅ Vehicle: ${vehicle.tag}\n` +
                    `📋 Status: No outstanding debts\n` +
                    `💬 Message: ${message}`
                );
            }
        } catch {
            // The toast may not appear if the system returns a debt report.
            // Continue checking the debt container.
        }

        // Container where debt information is displayed
        const debtContainer = page.locator('//*[@id="frmAdeudos"]/div[3]');

        if (await debtContainer.isVisible()) {
            const debtDetails = (await debtContainer.innerText()).trim();

            return formatDebtReport(vehicle, debtDetails);
        }

        return `⚠️ Unable to determine the status of ${vehicle.tag}`;

    } catch (err: any) {
        return `❌ Error checking ${vehicle.tag}: ${err.message}`;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

function formatDebtReport(vehicle: Vehicle, debtDetails: string): string {
    return (
        `⚠️ Outstanding Debt: ${vehicle.tag} (${vehicle.plate})\n\n` +
        "```\n" +
        debtDetails +
        "\n```"
    );
}