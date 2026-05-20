'use client';
import { useRef, useState } from 'react';

interface ImageUploaderProps {
  currentUrl: string;
  onUpload: (url: string) => void;
  className?: string;
}

export default function ImageUploader({ currentUrl, onUpload, className = '' }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onUpload(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {currentUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={currentUrl} alt="Current" className="w-full h-full object-cover" />
      )}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        style={{ background: 'rgba(8,28,21,0.85)', backdropFilter: 'blur(4px)' }}
        onClick={() => inputRef.current?.click()}
      >
        {loading ? (
          <div className="text-[#d4ff7d] text-xs animate-pulse">Uploading…</div>
        ) : (
          <>
            <span className="text-2xl mb-1">📷</span>
            <span className="text-[#d4ff7d] text-xs tracking-wider">Change Image</span>
          </>
        )}
      </div>
      {error && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-900/80 text-red-300 text-xs p-1 text-center">
          {error}
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}
