import { NextRequest, NextResponse } from "next/server";
import {
  createSessionCookie,
  sessionCookieOptions,
  verifyFirebaseIdToken,
  verifySessionCookie,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { idToken?: string };
    const idToken = body.idToken?.trim();

    if (!idToken) {
      return NextResponse.json({ error: "Missing idToken" }, { status: 400 });
    }

    const valid = await verifyFirebaseIdToken(idToken);
    if (!valid) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const sessionCookie = await createSessionCookie(idToken);
    const opts = sessionCookieOptions();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(opts.name, sessionCookie, {
      httpOnly: opts.httpOnly,
      secure: opts.secure,
      sameSite: opts.sameSite,
      path: opts.path,
      maxAge: opts.maxAge,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Session creation failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!cookie) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  const valid = await verifySessionCookie(cookie);
  return NextResponse.json({ authenticated: valid }, { status: valid ? 200 : 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
