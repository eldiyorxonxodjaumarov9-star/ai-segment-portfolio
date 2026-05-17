"use client";

import Image from "next/image";
import { Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminCard, AdminInput, ConfirmModal, Field, PageHeader, ProgressBar } from "@/components/admin/ui";
import { useToast } from "@/contexts/ToastContext";
import {
  deleteMediaItem,
  newId,
  saveMediaItem,
  subscribeMedia,
  uploadFile,
} from "@/lib/firebase/content-service";
import type { MediaItem } from "@/lib/firebase/types";

export default function MediaLibraryPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [folder, setFolder] = useState("general");
  const [uploadPct, setUploadPct] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);

  useEffect(() => subscribeMedia(setItems), []);

  const onUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    for (const file of Array.from(files)) {
      const id = newId("media");
      const path = `media/${folder}/${id}-${file.name}`;
      try {
        const url = await uploadFile(path, file, setUploadPct);
        const item: MediaItem = {
          id,
          name: file.name,
          url,
          storagePath: path,
          type: file.type.startsWith("video") ? "video" : "image",
          folder,
          size: file.size,
          createdAt: new Date().toISOString(),
        };
        await saveMediaItem(item);
        toast(`${file.name} uploaded`);
      } catch {
        toast(`Failed: ${file.name}`, "error");
      }
    }
    setUploadPct(0);
  };

  return (
    <div>
      <PageHeader title="Media Library" description="Upload, preview, organize, and delete media assets." />

      <AdminCard title="Upload">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <Field label="Folder">
            <AdminInput value={folder} onChange={(e) => setFolder(e.target.value)} placeholder="general" />
          </Field>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm text-cyan-100">
            <Upload className="h-4 w-4" />
            Upload files
            <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={(e) => onUpload(e.target.files)} />
          </label>
        </div>
        {uploadPct > 0 && <div className="mt-3"><ProgressBar value={uploadPct} /></div>}
      </AdminCard>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40">
            <div className="relative aspect-video bg-black/60">
              {item.type === "image" ? (
                <Image src={item.url} alt={item.name} fill className="object-cover" unoptimized />
              ) : (
                <video src={item.url} className="h-full w-full object-cover" controls />
              )}
            </div>
            <div className="p-3">
              <p className="truncate text-xs font-medium text-white/80">{item.name}</p>
              <p className="text-[10px] text-white/35">{item.folder}</p>
              <button
                type="button"
                onClick={() => setDeleteTarget(item)}
                className="mt-2 flex items-center gap-1 text-xs text-red-300"
              >
                <Trash2 className="h-3 w-3" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete file?"
        message="Removes from Storage and library."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (deleteTarget) {
            await deleteMediaItem(deleteTarget);
            toast("File deleted");
          }
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
