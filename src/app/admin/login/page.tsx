"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Lock, Mail, Shield } from "lucide-react";
import { getAuthErrorMessage, useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
function LoginForm() {
  const { login, firebaseReady, missingEnvKeys } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(null);

    if (!firebaseReady) {
      const msg = "Firebase ulanmagan. .env.local ni tekshiring va serverni qayta ishga tushiring.";
      setFieldError(msg);
      toast(msg, "error");
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      toast("Muvaffaqiyatli kirdingiz!", "success");
      const from = searchParams.get("from");
      router.replace(from?.startsWith("/admin") ? from : "/admin/dashboard");
    } catch (err) {
      const msg = getAuthErrorMessage(err);
      setFieldError(msg);
      toast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md"
    >
      <div className="mb-8 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,0.2)]"
        >
          <Shield className="h-7 w-7 text-cyan-300" />
        </motion.div>
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-300/80">Secure access</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">AI SEGMENT Admin</h1>
        <p className="mt-2 text-sm text-white/50">Firebase Authentication — Email &amp; Password</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_80px_rgba(34,211,238,0.12)] backdrop-blur-2xl sm:p-8"
      >
        <motion.div
          className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />

        {!firebaseReady && (
          <div className="relative mb-4 space-y-2 rounded-xl border border-amber-400/25 bg-amber-400/10 px-3 py-3 text-xs leading-relaxed text-amber-100">
            <p className="font-semibold text-amber-50">Firebase kalitlari topilmadi</p>
            <p>
              Fayl: <code className="text-cyan-200">web/.env.local</code> (package.json yonida)
            </p>
            {missingEnvKeys.length > 0 && (
              <ul className="list-inside list-disc text-amber-200/90">
                {missingEnvKeys.map((key) => (
                  <li key={key}>
                    <code className="text-cyan-200/90">{key}</code>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-amber-200/80">
              Firebase Console dan kalitlarni yozing → <code className="text-cyan-200">npm run dev</code> qayta ishga tushiring
            </p>
          </div>
        )}

        {fieldError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-4 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-100"
            role="alert"
          >
            {fieldError}
          </motion.div>
        )}

        <label className="relative mb-4 block">
          <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-white/50">
            <Mail className="h-3.5 w-3.5 text-cyan-400/80" /> Email
          </span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition-[border-color,box-shadow] focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]"
            placeholder="admin@example.com"
          />
        </label>

        <label className="relative mb-6 block">
          <span className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-white/50">
            <Lock className="h-3.5 w-3.5 text-fuchsia-400/80" /> Password
          </span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition-[border-color,box-shadow] focus:border-fuchsia-400/40 focus:shadow-[0_0_0_3px_rgba(192,132,252,0.12)]"
            placeholder="••••••••"
          />
        </label>

        <motion.button
          type="submit"
          disabled={submitting || !firebaseReady}
          whileHover={{ scale: submitting ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-500 py-3.5 text-sm font-semibold text-black shadow-[0_0_40px_rgba(34,211,238,0.35)] disabled:opacity-50"
        >
          <span className="relative z-10">{submitting ? "Kirish…" : "Sign in"}</span>
        </motion.button>
      </form>

      <p className="mt-6 text-center text-xs text-white/35">
        <Link href="/" className="text-cyan-300/80 transition-colors hover:text-cyan-200">
          ← Public site
        </Link>
      </p>
    </motion.div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030308] px-4 py-10">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(34,211,238,0.18),transparent),radial-gradient(ellipse_40%_30%_at_80%_80%,rgba(192,132,252,0.2),transparent)]"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <Suspense
        fallback={
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-400" />
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
