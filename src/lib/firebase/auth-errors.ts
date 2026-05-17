import type { FirebaseError } from "firebase/app";

export function getAuthErrorMessage(error: unknown): string {
  const code =
    error && typeof error === "object" && "code" in error
      ? String((error as FirebaseError).code)
      : "";

  switch (code) {
    case "auth/invalid-email":
      return "Email formati noto‘g‘ri.";
    case "auth/user-disabled":
      return "Bu hisob o‘chirilgan. Administrator bilan bog‘laning.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email yoki parol noto‘g‘ri.";
    case "auth/too-many-requests":
      return "Juda ko‘p urinish. Biroz kutib qayta urinib ko‘ring.";
    case "auth/network-request-failed":
      return "Internet aloqasi yo‘q. Qayta urinib ko‘ring.";
    case "auth/invalid-api-key":
    case "auth/app-not-authorized":
      return "Firebase sozlamasi noto‘g‘ri. .env.local kalitlarini tekshiring.";
    default:
      return code ? `Kirish xatosi: ${code}` : "Kirish amalga oshmadi.";
  }
}
