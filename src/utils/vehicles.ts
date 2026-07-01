import fs from "fs";
import path from "path";
import type { Vehicle } from "../types/vehicle.js";

const filePath = path.join(process.cwd(), "data", "vehicles.json");

export function loadVehicles(): Vehicle[] {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data) as Vehicle[];
}