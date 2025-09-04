"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CATEGORY_KEYWORDS } from "@/lib/tags";

type Props = {
  initialCategories?: string[];
  onSaved?: (selected: string[]) => void;
  className?: string;
};

export default function PreferencesChecklist({initialCategories, onSaved, className }: Props) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);

  // Build initial keys state
  useEffect(() => {
    const initial: Record<string, boolean> = {};
    Object.keys(CATEGORY_KEYWORDS).forEach((k) => (initial[k] = false));
    setSelected(initial);
  }, []);

  // Load saved preferences from API
  useEffect(() => {
    if (!initialCategories || initialCategories.length === 0) return;
    setSelected((prev) => {
      const copy = { ...prev };
      initialCategories.forEach((c) => {
        if (c in copy) copy[c] = true;
      });
      return copy;
    });
  }, [initialCategories]);

  const toggle = (key: string) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const save = async () => {
    setSaving(true);
    const categories = Object.keys(selected).filter((k) => selected[k]);
    try {
      const res = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ categories }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Save failed");
      }
      toast("Preferences saved");
      if (onSaved) onSaved(categories);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    const initial: Record<string, boolean> = {};
    Object.keys(CATEGORY_KEYWORDS).forEach((k) => (initial[k] = false));
    setSelected(initial);
  };

  const categoryLabel = (key: string) =>
    key.charAt(0).toUpperCase() + key.slice(1);

  return (
    <div className={className}>
      <div className="text-sm font-medium mb-2">Select categories</div>

      <div className="max-h-56 overflow-auto pr-2 space-y-2">
        {Object.keys(CATEGORY_KEYWORDS).map((key) => (
          <label
            key={key}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={!!selected[key]}
              onChange={() => toggle(key)}
              className="h-4 w-4 cursor-pointer"
              aria-label={categoryLabel(key)}
            />
            <div className="text-sm">{categoryLabel(key)}</div>
          </label>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-3 cursor-pointer">
        <Button size="sm" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetToDefaults}
          disabled={saving}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
