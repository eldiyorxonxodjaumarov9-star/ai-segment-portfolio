"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { defaultSiteContent } from "@/lib/firebase/defaults";
import {
  saveAnalytics,
  saveBrand,
  saveComment,
  saveSiteConfig,
  saveVideo,
  subscribeSiteContent,
  deleteBrand,
  deleteComment,
  deleteVideo,
  reorderBrands,
  reorderVideos,
} from "@/lib/firebase/content-service";
import { isSameSiteContent } from "@/lib/firebase/content-equality";
import { beginWriteGuard } from "@/lib/firebase/write-guard";
import type { AnalyticsData, BrandItem, CommentItem, SiteConfigDoc, SiteContent, VideoItem } from "@/lib/firebase/types";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface AdminContentContextValue {
  content: SiteContent;
  loading: boolean;
  saveStatus: SaveStatus;
  patchConfig: (config: SiteConfigDoc) => Promise<void>;
  patchAnalytics: (data: AnalyticsData) => Promise<void>;
  saveVideoItem: (video: VideoItem) => Promise<void>;
  deleteVideoItem: (id: string) => Promise<void>;
  reorderVideoItems: (items: VideoItem[]) => Promise<void>;
  saveBrandItem: (brand: BrandItem) => Promise<void>;
  deleteBrandItem: (id: string) => Promise<void>;
  reorderBrandItems: (items: BrandItem[]) => Promise<void>;
  saveCommentItem: (comment: CommentItem) => Promise<void>;
  deleteCommentItem: (id: string) => Promise<void>;
}

const AdminContentContext = createContext<AdminContentContextValue | null>(null);

export function AdminContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const saveStatusTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pendingWrites = useRef(0);

  const markSaving = useCallback(() => {
    pendingWrites.current += 1;
    setSaveStatus("saving");
    if (saveStatusTimer.current) clearTimeout(saveStatusTimer.current);
  }, []);

  const markSaved = useCallback(() => {
    pendingWrites.current = Math.max(0, pendingWrites.current - 1);
    if (pendingWrites.current > 0) return;
    setSaveStatus("saved");
    if (saveStatusTimer.current) clearTimeout(saveStatusTimer.current);
    saveStatusTimer.current = setTimeout(() => setSaveStatus("idle"), 2000);
  }, []);

  const markError = useCallback(() => {
    pendingWrites.current = 0;
    setSaveStatus("error");
    if (saveStatusTimer.current) clearTimeout(saveStatusTimer.current);
    saveStatusTimer.current = setTimeout(() => setSaveStatus("idle"), 3000);
  }, []);

  useEffect(() => {
    let emitTimer: ReturnType<typeof setTimeout> | undefined;
    let lastSig = "";

    const unsub = subscribeSiteContent((data) => {
      const sig = JSON.stringify(data);
      if (sig === lastSig) return;
      lastSig = sig;

      if (emitTimer) clearTimeout(emitTimer);
      emitTimer = setTimeout(() => {
        setContent((prev) => (isSameSiteContent(prev, data) ? prev : data));
        setLoading(false);
      }, 120);
    });

    return () => {
      if (emitTimer) clearTimeout(emitTimer);
      unsub();
    };
  }, []);

  const withWrite = useCallback(
    async (fn: () => Promise<void>) => {
      markSaving();
      beginWriteGuard();
      try {
        await fn();
        markSaved();
      } catch {
        markError();
        throw new Error("Save failed");
      }
    },
    [markSaving, markSaved, markError],
  );

  const patchConfig = useCallback(
    (config: SiteConfigDoc) => withWrite(() => saveSiteConfig(config, { skipIfUnchanged: true })),
    [withWrite],
  );

  const patchAnalytics = useCallback(
    (data: AnalyticsData) => withWrite(() => saveAnalytics(data)),
    [withWrite],
  );

  const saveVideoItem = useCallback((video: VideoItem) => withWrite(() => saveVideo(video)), [withWrite]);
  const deleteVideoItem = useCallback((id: string) => withWrite(() => deleteVideo(id)), [withWrite]);
  const reorderVideoItems = useCallback(
    (items: VideoItem[]) => withWrite(() => reorderVideos(items)),
    [withWrite],
  );

  const saveBrandItem = useCallback((brand: BrandItem) => withWrite(() => saveBrand(brand)), [withWrite]);
  const deleteBrandItem = useCallback((id: string) => withWrite(() => deleteBrand(id)), [withWrite]);
  const reorderBrandItems = useCallback(
    (items: BrandItem[]) => withWrite(() => reorderBrands(items)),
    [withWrite],
  );

  const saveCommentItem = useCallback(
    (comment: CommentItem) => withWrite(() => saveComment(comment)),
    [withWrite],
  );
  const deleteCommentItem = useCallback((id: string) => withWrite(() => deleteComment(id)), [withWrite]);

  const value = useMemo(
    () => ({
      content,
      loading,
      saveStatus,
      patchConfig,
      patchAnalytics,
      saveVideoItem,
      deleteVideoItem,
      reorderVideoItems,
      saveBrandItem,
      deleteBrandItem,
      reorderBrandItems,
      saveCommentItem,
      deleteCommentItem,
    }),
    [
      content,
      loading,
      saveStatus,
      patchConfig,
      patchAnalytics,
      saveVideoItem,
      deleteVideoItem,
      reorderVideoItems,
      saveBrandItem,
      deleteBrandItem,
      reorderBrandItems,
      saveCommentItem,
      deleteCommentItem,
    ],
  );

  return <AdminContentContext.Provider value={value}>{children}</AdminContentContext.Provider>;
}

export function useAdminContent() {
  const ctx = useContext(AdminContentContext);
  if (!ctx) throw new Error("useAdminContent must be used within AdminContentProvider");
  return ctx;
}
