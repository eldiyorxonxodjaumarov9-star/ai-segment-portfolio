"use client";

import { motion } from "framer-motion";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export function AdminCard({
  title,
  description,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-[0_0_50px_rgba(34,211,238,0.06)] backdrop-blur-xl sm:p-6 ${className}`}
    >
      {(title || description) && (
        <header className="mb-5 border-b border-white/[0.06] pb-4">
          {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
          {description && <p className="mt-1 text-sm text-white/50">{description}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium uppercase tracking-wider text-white/55">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-white/35">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/25 focus:border-cyan-400/40 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]";

export function AdminInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={inputClass} {...props} />;
}

export function AdminTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${inputClass} min-h-[100px] resize-y`} {...props} />;
}

export function AdminToggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-left transition-colors hover:border-cyan-400/25"
    >
      <span className="text-sm text-white/80">{label}</span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-cyan-500/80" : "bg-white/15"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "left-[22px]" : "left-0.5"}`}
        />
      </span>
    </button>
  );
}

export function SaveButton({
  onClick,
  saving,
  saved,
  label = "Saqlash",
}: {
  onClick: () => void;
  saving?: boolean;
  saved?: boolean;
  label?: string;
}) {
  let text = label;
  if (saving) text = "Saqlanmoqda…";
  else if (saved) text = "Saqlandi ✓";

  return (
    <button
      type="button"
      disabled={saving}
      onClick={onClick}
      className="inline-flex min-w-[120px] items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-opacity disabled:opacity-60"
    >
      {text}
    </button>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <motion.div className="h-1.5 overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, value)}%` }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

export function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95, y: 8 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0c0c18] p-6 shadow-[0_0_80px_rgba(168,85,247,0.2)]"
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/55">{message}</p>
        <motion.div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/5"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-500/90 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            O‘chirish
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-300/70">Admin</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm text-white/50">{description}</p>}
      </div>
      {action}
    </div>
  );
}
