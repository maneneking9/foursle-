import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  folder?: string;
  currentImage?: string;
  label?: string;
}

export default function ImageUpload({ 
  onUpload, 
  folder = 'uploads', 
  currentImage, 
  label = 'Upload Image'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/upload-file`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        onUpload(data.url);
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
      setPreview(currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id={`upload-${folder}`}
      />
      
      {preview ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative group"
        >
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            type="button"
          >
            <X size={16} />
          </button>
          <label
            htmlFor={`upload-${folder}`}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-lg"
          >
            <Upload className="text-white" size={32} />
          </label>
        </motion.div>
      ) : (
        <label
          htmlFor={`upload-${folder}`}
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          {uploading ? (
            <Loader2 className="animate-spin text-blue-500" size={48} />
          ) : (
            <>
              <Upload className="text-gray-400 mb-2" size={48} />
              <span className="text-sm text-gray-600">{label}</span>
              <span className="text-xs text-gray-400 mt-1">Click to browse</span>
            </>
          )}
        </label>
      )}
    </div>
  );
}
