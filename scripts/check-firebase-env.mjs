import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const webRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(webRoot, ".env.local");
const examplePath = path.join(webRoot, ".env.local.example");

const REQUIRED = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return {};
  const parsed = dotenv.parse(fs.readFileSync(file));
  for (const [k, v] of Object.entries(parsed)) {
    if (v !== undefined && v !== "") process.env[k] = v;
  }
  return parsed;
}

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath);
    console.log("\n✓ Created .env.local from .env.local.example");
    console.log(`  Path: ${envPath}`);
    console.log("  → Open this file and paste your Firebase keys from Firebase Console.\n");
  } else {
    console.error("\n✗ Missing .env.local");
    console.error(`  Create: ${envPath}\n`);
    process.exit(1);
  }
}

loadEnvFile(envPath);
loadEnvFile(path.join(webRoot, ".env"));

const missing = REQUIRED.filter((key) => {
  const v = (process.env[key] ?? "").trim();
  return !v || v === "undefined" || v.startsWith("your-");
});

if (missing.length > 0) {
  console.warn("\n⚠ Firebase keys incomplete in .env.local:");
  missing.forEach((k) => console.warn(`   - ${k}`));
  console.warn(`\n  Edit: ${envPath}`);
  console.warn("  Firebase Console → Project settings → Your apps → Web app → config\n");
  console.warn("  Dev server will start, but admin login will not work until keys are set.\n");
} else {
  console.log("✓ Firebase environment variables loaded from .env.local\n");
}
