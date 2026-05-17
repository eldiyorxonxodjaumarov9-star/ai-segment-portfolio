"use client";

import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AdminCard,
  AdminInput,
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
import type { BrandItem } from "@/lib/firebase/types";

export default function BrandsManagerPage() {
  const { content, saveBrandItem, deleteBrandItem, reorderBrandItems, saveStatus } = useAdminContent();
  const { toast } = useToast();
  const { items, selectItem, draft: selected, setDraft: setSelected, clearDirty } = useAdminItemEditor(
    content.brands,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploadPct, setUploadPct] = useState(0);

  const saving = saveStatus === "saving";
  const saved = saveStatus === "saved";

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const next = [...items];
    const [removed] = next.splice(result.source.index, 1);
    next.splice(result.destination.index, 0, removed);
    try {
      await reorderBrandItems(next);
      clearDirty();
      toast("Brand order updated");
    } catch {
      toast("Reorder failed", "error");
    }
  };

  const addBrand = async () => {
    const b: BrandItem = {
      id: newId("brand"),
      name: "NEW BRAND",
      tone: "from-cyan-500/30 to-violet-600/40",
      logoUrl: "",
      order: items.length,
    };
    try {
      await saveBrandItem(b);
      selectItem(b.id);
      toast("Brand added");
    } catch {
      toast("Add failed", "error");
    }
  };

  const saveCurrent = async () => {
    if (!selected) return;
    try {
      await saveBrandItem(selected);
      clearDirty();
      toast("Brand saved");
    } catch {
      toast("Save failed", "error");
    }
  };

  return (
    <div>
      <PageHeader
        title="Brands"
        description="Upload logos, edit names, and reorder the carousel."
        action={
          <button
            type="button"
            onClick={addBrand}
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm text-cyan-100"
          >
            <Plus className="h-4 w-4" /> Add brand
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="Carousel order">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="brands">
              {(provided) => (
                <ul ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                  {items.map((b, index) => (
                    <Draggable key={b.id} draggableId={b.id} index={index}>
                      {(drag) => (
                        <li
                          ref={drag.innerRef}
                          {...drag.draggableProps}
                          className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${selected?.id === b.id ? "border-cyan-400/40 bg-cyan-400/10" : "border-white/[0.06] bg-black/30"}`}
                          onClick={() => selectItem(b.id)}
                        >
                          <span {...drag.dragHandleProps}>
                            <GripVertical className="h-4 w-4 text-white/30" />
                          </span>
                          <span className="text-sm font-semibold tracking-wider text-white/80">{b.name}</span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </AdminCard>

        {selected && (
          <AdminCard title="Edit brand">
            <div className="mb-4 flex justify-end">
              <SaveButton onClick={saveCurrent} saving={saving} saved={saved} />
            </div>
            <div className="space-y-4">
              <Field label="Brand name">
                <AdminInput value={selected.name} onChange={(e) => setSelected({ ...selected, name: e.target.value })} />
              </Field>
              <Field label="Gradient tone (Tailwind classes)" hint="e.g. from-cyan-500/30 to-violet-600/40">
                <AdminInput value={selected.tone} onChange={(e) => setSelected({ ...selected, tone: e.target.value })} />
              </Field>
              <Field label="Logo upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await uploadFile(`brands/${selected.id}-${file.name}`, file, setUploadPct);
                    setSelected({ ...selected, logoUrl: url });
                    setUploadPct(0);
                  }}
                  className="text-sm text-white/50 file:rounded-lg file:border-0 file:bg-cyan-400/20 file:px-3 file:py-1.5 file:text-cyan-100"
                />
                {uploadPct > 0 && <ProgressBar value={uploadPct} />}
              </Field>
              <button type="button" onClick={() => setDeleteId(selected.id)} className="flex items-center gap-2 text-sm text-red-300">
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </AdminCard>
        )}
      </div>

      <ConfirmModal
        open={Boolean(deleteId)}
        title="Delete brand?"
        message="Remove this brand from the carousel."
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          if (!deleteId) return;
          try {
            await deleteBrandItem(deleteId);
            setDeleteId(null);
            toast("Brand deleted");
          } catch {
            toast("Delete failed", "error");
          }
        }}
      />
    </div>
  );
}
