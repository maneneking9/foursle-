import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
}

export default function ImageUpload({ 
  value, 
  onChange, 
  label = 'Upload Image',
  accept = 'image/*'
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    setError(null);

    // Create local preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    await uploadToCloudinary(file);
  };

  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'church_images');
    formData.append('cloud_name', 'dooejcdcn');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dooejcdcn/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onChange(data.secure_url);
      setPreview(data.secure_url);
    } catch (err) {
      console.error('Upload error:', err);
      // Fallback: use local preview as data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError('Using local preview. Configure Cloudinary for production.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative rounded-xl overflow-hidden border-2 border-slate-200">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Change
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500 rounded-lg text-sm font-semibold text-white hover:bg-red-600"
            >
              Remove
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-white flex items-center gap-2">
                <Loader2 size={20} className="animate-spin" />
                Uploading...
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-all",
            "border-slate-300 hover:border-blue-500 hover:bg-blue-50",
            error ? "border-red-300 bg-red-50" : ""
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            error ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
          )}>
            {error ? <X size={20} /> : <Upload size={20} />}
          </div>
          <div className="text-center">
            <p className={cn(
              "font-semibold",
              error ? "text-red-600" : "text-slate-700"
            )}>
              {error || 'Click to upload image'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </button>
      )}

      {value && !preview && (
        <div className="relative rounded-xl overflow-hidden border-2 border-slate-200">
          <img
            src={value}
            alt="Current"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
