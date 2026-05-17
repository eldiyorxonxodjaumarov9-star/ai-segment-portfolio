const required = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID"
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error("Missing Firebase ENV:");
  missing.forEach((v) => console.error(v));
  process.exit(1);
}

console.log("Firebase ENV OK");
