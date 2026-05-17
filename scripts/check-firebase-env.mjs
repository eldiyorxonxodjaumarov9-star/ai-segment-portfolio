import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const webRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envLocalPath = path.join(webRoot, ".env.local");
const envPath = path.join(webRoot, ".env");
const examplePath = path.join(webRoot, ".env.local.example");

const isVercel = process.env.VERCEL === "1";
const isCI = process.env.CI === "true" || process.env.CI === "1";

const REQUIRED = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

/** Load a file into process.env without overriding values already set (e.g. Vercel). */
function loadEnvFile(file) {
  if (!fs.existsSync(file)) return false;
  dotenv.config({ path: file, override: false });
  return true;
}

// Optional local files — never required; Vercel/shell env vars are used as-is.
const loadedLocal = loadEnvFile(envPath) || loadEnvFile(envLocalPath);

// Local-only helper: scaffold .env.local from example when missing.
if (!isVercel && !isCI && !fs.existsSync(envLocalPath) && fs.existsSync(examplePath)) {
  fs.copyFileSync(examplePath, envLocalPath);
  loadEnvFile(envLocalPath);
  console.log("\n✓ Created .env.local from .env.local.example");
  console.log(`  Path: ${envLocalPath}`);
  console.log("  → Open this file and paste your Firebase keys from Firebase Console.\n");
}

const missing = REQUIRED.filter((key) => {
  const v = (process.env[key] ?? "").trim();
  return !v || v === "undefined" || v.startsWith("your-");
});

if (missing.length > 0) {
  console.warn("\n⚠ Firebase environment variables incomplete:");
  missing.forEach((k) => console.warn(`   - ${k}`));

  if (isVercel) {
    console.warn("\n  Vercel → Project → Settings → Environment Variables");
    console.warn("  Add all NEXT_PUBLIC_FIREBASE_* keys for Production, Preview, and Development.\n");
    process.exit(1);
  }

  if (isCI) {
    console.warn("\n  Set these variables in your CI environment.\n");
    process.exit(1);
  }

  console.warn(`\n  Local: add keys to ${envLocalPath} (or export them in your shell).`);
  console.warn("  Firebase Console → Project settings → Your apps → Web app → config\n");
  console.warn("  Dev/build will continue, but admin login will not work until keys are set.\n");
} else {
  let source = "environment";
  if (isVercel) source = "Vercel environment variables";
  else if (fs.existsSync(envLocalPath)) source = ".env.local";
  else if (loadedLocal) source = ".env";
  console.log(`✓ Firebase environment variables loaded from ${source}\n`);
}
