"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAdminContent } from "@/contexts/AdminContentContext";
import { debounce } from "@/lib/utils/debounce";
import type { AnalyticsData, SiteConfigDoc } from "@/lib/firebase/types";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useAdminConfigDraft<T>({
  select,
  merge,
  autosave = false,
  debounceMs = 1000,
}: {
  select: (config: SiteConfigDoc) => T;
  merge: (config: SiteConfigDoc, draft: T) => SiteConfigDoc;
  autosave?: boolean;
  debounceMs?: number;
}) {
  const { content, patchConfig, saveStatus: globalSaveStatus } = useAdminContent();
  const contentRef = useRef(content);
  contentRef.current = content;

  const [draft, setDraft] = useState<T>(() => select(content.config));
  const [localStatus, setLocalStatus] = useState<SaveStatus>("idle");
  const dirtyRef = useRef(false);
  const draftRef = useRef(draft);
  const lastSavedRef = useRef(JSON.stringify(select(content.config)));

  draftRef.current = draft;

  const remoteSig = JSON.stringify(select(content.config));

  useEffect(() => {
    if (dirtyRef.current) return;
    if (remoteSig === lastSavedRef.current) return;
    lastSavedRef.current = remoteSig;
    setDraft(JSON.parse(remoteSig) as T);
  }, [remoteSig]);

  const persist = useCallback(async () => {
    const cfg = contentRef.current.config;
    const nextConfig = merge(cfg, draftRef.current);
    const payload = JSON.stringify(select(nextConfig));
    if (payload === lastSavedRef.current) {
      dirtyRef.current = false;
      setLocalStatus("idle");
      return;
    }

    setLocalStatus("saving");
    try {
      await patchConfig(nextConfig);
      lastSavedRef.current = payload;
      dirtyRef.current = false;
      setLocalStatus("saved");
      window.setTimeout(() => setLocalStatus("idle"), 2000);
    } catch {
      setLocalStatus("error");
      window.setTimeout(() => setLocalStatus("idle"), 3000);
    }
  }, [merge, patchConfig, select]);

  const debouncedPersist = useRef(debounce(() => void persist(), debounceMs)).current;

  useEffect(() => () => debouncedPersist.cancel(), [debouncedPersist]);

  const setDraftDirty = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setDraft((prev) => {
        const next = typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater;
        draftRef.current = next;
        return next;
      });
      dirtyRef.current = true;
      if (autosave) debouncedPersist();
    },
    [autosave, debouncedPersist],
  );

  const saveNow = useCallback(async () => {
    debouncedPersist.cancel();
    await persist();
  }, [debouncedPersist, persist]);

  const saving = localStatus === "saving" || globalSaveStatus === "saving";
  const saved = localStatus === "saved" || globalSaveStatus === "saved";

  return {
    draft,
    setDraft: setDraftDirty,
    saveNow,
    saving,
    saved,
    status: saving ? ("saving" as const) : saved ? ("saved" as const) : localStatus,
  };
}

export function useAdminAnalyticsDraft({
  autosave = false,
  debounceMs = 1000,
}: {
  autosave?: boolean;
  debounceMs?: number;
} = {}) {
  const { content, patchAnalytics, saveStatus: globalSaveStatus } = useAdminContent();
  const contentRef = useRef(content);
  contentRef.current = content;

  const [draft, setDraft] = useState<AnalyticsData>(() => content.analytics);
  const [localStatus, setLocalStatus] = useState<SaveStatus>("idle");
  const dirtyRef = useRef(false);
  const draftRef = useRef(draft);
  const lastSavedRef = useRef(JSON.stringify(content.analytics));

  draftRef.current = draft;

  const remoteSig = JSON.stringify(content.analytics);

  useEffect(() => {
    if (dirtyRef.current) return;
    if (remoteSig === lastSavedRef.current) return;
    lastSavedRef.current = remoteSig;
    setDraft(JSON.parse(remoteSig) as AnalyticsData);
  }, [remoteSig]);

  const persist = useCallback(async () => {
    const payload = JSON.stringify(draftRef.current);
    if (payload === lastSavedRef.current) {
      dirtyRef.current = false;
      setLocalStatus("idle");
      return;
    }

    setLocalStatus("saving");
    try {
      await patchAnalytics(draftRef.current);
      lastSavedRef.current = payload;
      dirtyRef.current = false;
      setLocalStatus("saved");
      window.setTimeout(() => setLocalStatus("idle"), 2000);
    } catch {
      setLocalStatus("error");
      window.setTimeout(() => setLocalStatus("idle"), 3000);
    }
  }, [patchAnalytics]);

  const debouncedPersist = useRef(debounce(() => void persist(), debounceMs)).current;

  useEffect(() => () => debouncedPersist.cancel(), [debouncedPersist]);

  const setDraftDirty = useCallback(
    (updater: AnalyticsData | ((prev: AnalyticsData) => AnalyticsData)) => {
      setDraft((prev) => {
        const next = typeof updater === "function" ? (updater as (p: AnalyticsData) => AnalyticsData)(prev) : updater;
        draftRef.current = next;
        return next;
      });
      dirtyRef.current = true;
      if (autosave) debouncedPersist();
    },
    [autosave, debouncedPersist],
  );

  const saveNow = useCallback(async () => {
    debouncedPersist.cancel();
    await persist();
  }, [debouncedPersist, persist]);

  const saving = localStatus === "saving" || globalSaveStatus === "saving";
  const saved = localStatus === "saved" || globalSaveStatus === "saved";

  return { draft, setDraft: setDraftDirty, saveNow, saving, saved };
}

/** Local editor for a single item in a Firestore collection list */
export function useAdminItemEditor<T extends { id: string }>(items: T[]) {
  const [selectedId, setSelectedIdState] = useState<string | null>(() => items[0]?.id ?? null);
  const dirtyRef = useRef(false);
  const [draft, setDraftState] = useState<T | null>(null);

  const remote = items.find((i) => i.id === selectedId) ?? null;
  const remoteSig = remote ? JSON.stringify(remote) : "";

  useEffect(() => {
    if (!remote) {
      setDraftState(null);
      dirtyRef.current = false;
      return;
    }
    if (dirtyRef.current) return;
    setDraftState(JSON.parse(remoteSig) as T);
  }, [remoteSig, selectedId, remote]);

  useEffect(() => {
    if (selectedId && items.some((i) => i.id === selectedId)) return;
    const nextId = items[0]?.id ?? null;
    dirtyRef.current = false;
    setSelectedIdState(nextId);
  }, [items, selectedId]);

  const selectItem = useCallback((id: string) => {
    dirtyRef.current = false;
    setSelectedIdState(id);
  }, []);

  const setDraft = useCallback((updater: T | ((prev: T) => T)) => {
    setDraftState((prev) => {
      if (!prev) return prev;
      const next = typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater;
      return next;
    });
    dirtyRef.current = true;
  }, []);

  const clearDirty = useCallback(() => {
    dirtyRef.current = false;
  }, []);

  return {
    items,
    selectedId,
    selectItem,
    draft,
    setDraft,
    clearDirty,
    isDirty: () => dirtyRef.current,
  };
}
