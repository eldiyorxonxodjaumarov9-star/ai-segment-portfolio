/** Sync Firebase client auth with httpOnly session cookie (middleware). */
export async function establishServerSession(idToken: string): Promise<void> {
  const res = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
    credentials: "same-origin",
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? "Failed to create session");
  }
}

export async function clearServerSession(): Promise<void> {
  await fetch("/api/auth/session", { method: "DELETE", credentials: "same-origin" });
}

export async function checkServerSession(): Promise<boolean> {
  const res = await fetch("/api/auth/session", { credentials: "same-origin" });
  if (!res.ok) return false;
  const data = (await res.json()) as { authenticated?: boolean };
  return Boolean(data.authenticated);
}
