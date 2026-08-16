import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const SETTINGS_FILE = path.join(process.cwd(), "config", "inquiry-settings.json");

const readSettings = async () => {
  try {
    const content = await fs.readFile(SETTINGS_FILE, "utf8");
    const parsed = JSON.parse(content);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    if (error?.code === "ENOENT") {
      return {};
    }
    throw error;
  }
};

const writeSettings = async (settings) => {
  await fs.mkdir(path.dirname(SETTINGS_FILE), { recursive: true });
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));
};

export async function GET() {
  const settings = await readSettings();
  return NextResponse.json(settings);
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const current = await readSettings();
    const next = {
      ...current,
      ...body,
    };

    if (body.defaultCurrency && typeof body.defaultCurrency === "string") {
      next.defaultCurrency = body.defaultCurrency;
    }

    if (body.currencies && typeof body.currencies === "object") {
      next.currencies = body.currencies;
    }

    if (body.portRates && typeof body.portRates === "object") {
      next.portRates = body.portRates;
    }

    await writeSettings(next);
    return NextResponse.json(next);
  } catch (error) {
    console.error("Failed to update inquiry settings", error);
    return NextResponse.json({ message: "Failed to update inquiry settings" }, { status: 500 });
  }
}
