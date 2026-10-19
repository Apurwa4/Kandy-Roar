import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "registrations.json");

function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

// Block public GET requests to protect delegate privacy
export async function GET() {
  return NextResponse.json(
    { error: "Access denied. Records are private to the Organizing Committee." },
    { status: 403 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "dob",
      "entity",
      "faculty",
      "frontOffice",
      "backOffice",
      "position",
      "nic",
      "address",
      "emergencyName",
      "emergencyPhone",
    ];

    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const regId = "KR7-" + Math.floor(1000 + Math.random() * 9000);
    const newRecord = {
      id: regId,
      submittedAt: new Date().toISOString(),
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      dob: body.dob,
      entity: body.entity === "Other" && body.entityOther ? body.entityOther.trim() : body.entity,
      faculty: body.faculty === "Other" && body.facultyOther ? body.facultyOther.trim() : body.faculty,
      frontOffice: body.frontOffice,
      backOffice: body.backOffice,
      position: body.position,
      nic: body.nic.trim(),
      uniRegNo: body.uniRegNo?.trim() || "N/A",
      address: body.address.trim(),
      emergencyName: body.emergencyName.trim(),
      emergencyPhone: body.emergencyPhone.trim(),
      message: body.message?.trim() || "",
    };

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
    const isVercel = process.env.VERCEL === "1";

    // Vercel has no persistent local filesystem. Sheets must confirm the save.
    if (isVercel && !webhookUrl) {
      return NextResponse.json(
        { success: false, error: "Registration is temporarily unavailable. Please contact the organizing committee." },
        { status: 503 }
      );
    }

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(newRecord),
          redirect: "follow",
          signal: AbortSignal.timeout(15_000),
        });
        const result = await response.json();
        if (!response.ok || result.error || !(
          result.success === true || result.status === "success" || result.result === "success"
        )) {
          throw new Error("Google Sheets did not confirm the save.");
        }
      } catch {
        // Do not log webhook URLs or delegate details.
        console.error("Google Sheets registration save was not confirmed.");
        return NextResponse.json(
          { success: false, error: "We could not confirm your registration was saved. Please contact the organizing committee before trying again." },
          { status: 502 }
        );
      }
    }

    // Keep a local copy only when running outside Vercel.
    if (!isVercel) {
      try {
        ensureStorage();
        const currentList = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
        currentList.push(newRecord);
        fs.writeFileSync(DATA_FILE, JSON.stringify(currentList, null, 2), "utf8");
      } catch {
        console.error("Local registration backup could not be saved.");
        if (!webhookUrl) {
          return NextResponse.json(
            { success: false, error: "Your registration could not be saved. Please try again later." },
            { status: 500 }
          );
        }
      }
    }

    // Return only registration ID to the public user (never expose any other records)
    return NextResponse.json({
      success: true,
      registrationId: regId,
    });
  } catch (error) {
    console.error("Registration submission error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during submission." },
      { status: 500 }
    );
  }
}
