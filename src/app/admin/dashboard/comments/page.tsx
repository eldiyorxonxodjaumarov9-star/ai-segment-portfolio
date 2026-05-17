"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AdminCard,
  AdminInput,
  AdminTextarea,
  AdminToggle,
  ConfirmModal,
  Field,
  PageHeader,
  ProgressBar,
  SaveButton,
} from "@/components/admin/ui";
import { useAdminContent } from "@/contexts/AdminContentContext";
import { useToast } from "@/contexts/ToastContext";
import { useAdminItemEditor } from "@/hooks/useAdminDraft";
import { newId, uploadFile } from "@/lib/firebase/content-service";
import type { CommentItem } from "@/lib/firebase/types";

export default function CommentsManagerPage() {
  const { content, saveCommentItem, deleteCommentItem, saveStatus } = useAdminContent();
  const { toast } = useToast();
  const { selectItem, draft: selected, setDraft: setSelected, clearDirty } = useAdminItemEditor(content.comments);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploadPct, setUploadPct] = useState(0);

  const saving = saveStatus === "saving";
  const saved = saveStatus === "saved";

  const addComment = async () => {
    const video = content.videos[0];
    const c: CommentItem = {
      id: newId("cm"),
      videoId: video?.id ?? "v1",
      videoTitle: video?.title ?? "Video",
      user: "new_user",
      avatarUrl: "",
      avatarSeed: `cm-${Date.now()}`,
      text: "New comment",
      likes: 0,
      time: "Hozir",
      pinned: false,
      spam: false,
    };
    try {
      await saveCommentItem(c);
      selectItem(c.id);
      toast("Comment added");
    } catch {
      toast("Add failed", "error");
    }
  };

  const save = async () => {
    if (!selected) return;
    try {
      await saveCommentItem(selected);
      clearDirty();
      toast("Comment saved");
    } catch {
      toast("Save failed", "error");
    }
  };

  return (
    <div>
      <PageHeader
        title="Comments"
        description="Moderate, pin, edit usernames, avatars, and likes."
        action={
          <button
            type="button"
            onClick={addComment}
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm text-cyan-100"
          >
            <Plus className="h-4 w-4" /> Add comment
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <AdminCard title="All comments">
          <ul className="max-h-[60vh] space-y-1 overflow-y-auto">
            {content.comments.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => selectItem(c.id)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-xs ${selected?.id === c.id ? "bg-cyan-400/10 text-cyan-100" : "text-white/60 hover:bg-white/5"} ${c.spam ? "opacity-40" : ""}`}
                >
                  <span className="font-medium text-white/90">{c.user}</span>
                  <span className="mt-0.5 block truncate text-white/40">{c.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </AdminCard>

        {selected && (
          <AdminCard title="Edit comment">
            <div className="mb-4 flex justify-end">
              <SaveButton onClick={save} saving={saving} saved={saved} />
            </div>
            <div className="space-y-4">
              <Field label="Username">
                <AdminInput value={selected.user} onChange={(e) => setSelected({ ...selected, user: e.target.value })} />
              </Field>
              <Field label="Comment text">
                <AdminTextarea value={selected.text} onChange={(e) => setSelected({ ...selected, text: e.target.value })} />
              </Field>
              <Field label="Video title">
                <AdminInput
                  value={selected.videoTitle}
                  onChange={(e) => setSelected({ ...selected, videoTitle: e.target.value })}
                />
              </Field>
              <Field label="Likes">
                <AdminInput
                  type="number"
                  value={selected.likes}
                  onChange={(e) => setSelected({ ...selected, likes: Number(e.target.value) })}
                />
              </Field>
              <Field label="Time label">
                <AdminInput value={selected.time} onChange={(e) => setSelected({ ...selected, time: e.target.value })} />
              </Field>
              <Field label="Avatar upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await uploadFile(`avatars/${selected.id}-${file.name}`, file, setUploadPct);
                    setSelected({ ...selected, avatarUrl: url });
                    setUploadPct(0);
                  }}
                  className="text-sm text-white/50 file:rounded-lg file:border-0 file:bg-cyan-400/20 file:px-3 file:py-1.5"
                />
                {uploadPct > 0 && <ProgressBar value={uploadPct} />}
              </Field>
              <AdminToggle label="Pinned" checked={selected.pinned} onChange={(pinned) => setSelected({ ...selected, pinned })} />
              <AdminToggle label="Mark as spam" checked={selected.spam} onChange={(spam) => setSelected({ ...selected, spam })} />
              <button type="button" onClick={() => setDeleteId(selected.id)} className="flex items-center gap-2 text-sm text-red-300">
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </AdminCard>
        )}
      </div>

      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete comment?"
        message="Remove this comment from the public site."
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          if (!deleteId) return;
          try {
            await deleteCommentItem(deleteId);
            setDeleteId(null);
            toast("Deleted");
          } catch {
            toast("Delete failed", "error");
          }
        }}
      />
    </div>
  );
}
