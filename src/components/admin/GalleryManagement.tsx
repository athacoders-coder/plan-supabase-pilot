import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface Photo {
  id: string;
  image_path: string;
  title: string | null;
  caption: string | null;
}

const GalleryManagement = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    image_path: "",
    title: "",
    caption: "",
  });

  const queryClient = useQueryClient();

  const { data: photos, isLoading } = useQuery({
    queryKey: ["admin-photos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from("photos").insert([{
        ...data,
        uploaded_by: user?.id,
      }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-photos"] });
      toast.success("Foto berhasil ditambahkan");
      resetForm();
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menambahkan foto");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("photos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-photos"] });
      toast.success("Foto berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus foto");
    },
  });

  const resetForm = () => {
    setFormData({
      image_path: "",
      title: "",
      caption: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Galeri</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Foto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Foto Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="image_path">URL Gambar</Label>
                <Input
                  id="image_path"
                  type="url"
                  value={formData.image_path}
                  onChange={(e) => setFormData({ ...formData, image_path: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="title">Judul (Opsional)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="caption">Keterangan (Opsional)</Label>
                <Textarea
                  id="caption"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending}>
                  Tambah Foto
                </Button>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Batal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p>Memuat...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos?.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <img 
                src={photo.image_path} 
                alt={photo.title || "Gallery photo"}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                {photo.title && <h3 className="font-semibold mb-1">{photo.title}</h3>}
                {photo.caption && <p className="text-sm text-muted-foreground mb-3">{photo.caption}</p>}
                <Button 
                  size="sm" 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => deleteMutation.mutate(photo.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;