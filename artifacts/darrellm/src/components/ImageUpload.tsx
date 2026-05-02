import { useState } from "react";
import { api } from "@/lib/api";
import { Upload, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  value?: string | null;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

const ImageUpload = ({ value, onChange, folder = "uploads", label = "Image" }: Props) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await api.uploadFile(file, folder);
      onChange(url);
      toast({ title: "Uploaded!" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err?.message || "Try again", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1.5">{label}</label>
      <div className="flex items-center gap-3">
        {value && (
          <div className="relative w-16 h-16 rounded-md overflow-hidden border border-border shrink-0">
            <img src={value} alt="" className="w-full h-full object-cover" />
            <button type="button" onClick={() => onChange("")} className="absolute top-0 right-0 bg-background/80 p-0.5 rounded-bl">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        <label className="flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm cursor-pointer hover:bg-accent transition-colors">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? "Uploading..." : "Choose file"}
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
        </label>
        {value && (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent border border-border rounded-md px-3 py-2 text-xs font-mono text-muted-foreground"
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
