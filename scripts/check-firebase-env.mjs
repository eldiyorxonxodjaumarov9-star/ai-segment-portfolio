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

  console.warn("\n  Set NEXT_PUBLIC_FIREBASE_* in your environment before running the app.");
  console.warn("  Firebase Console → Project settings → Your apps → Web app → config\n");
  console.warn("  Dev/build will continue, but admin login will not work until keys are set.\n");
} else {
  const source = isVercel ? "Vercel environment variables" : "process.env";
  console.log(`✓ Firebase environment variables loaded from ${source}\n`);
}
