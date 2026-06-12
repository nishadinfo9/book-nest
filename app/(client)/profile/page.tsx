"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  async function uploadImage() {
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Upload failed:", data);
        return;
      }

      console.log(data);
      setPreview(data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) {
            setFile(f);
            setPreview(URL.createObjectURL(f));
          }
        }}
      />

      <button
        onClick={uploadImage}
        disabled={loading || !file}
        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {preview && (
        <Image
          src={preview}
          className="w-32 h-32 rounded-full mt-4"
          alt="Preview"
          width={128}
          height={128}
        />
      )}
    </div>
  );
}
