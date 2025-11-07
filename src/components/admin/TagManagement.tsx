import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

const TagManagement = () => {
  const [open, setOpen] = useState(false);
  const [tagName, setTagName] = useState("");

  const queryClient = useQueryClient();

  const { data: tags, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (name: string) => {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      
      const { error } = await supabase.from("tags").insert([{
        name,
        slug,
      }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag berhasil dibuat");
      setTagName("");
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal membuat tag");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tags").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus tag");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tagName.trim()) {
      createMutation.mutate(tagName.trim());
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Tag Blog</CardTitle>
            <CardDescription>Kelola tag untuk artikel</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Tag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Tag Baru</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="tagName">Nama Tag</Label>
                  <Input
                    id="tagName"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    placeholder="Misalnya: Inovasi"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending}>
                    Simpan
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center py-4 text-muted-foreground">Memuat...</p>
        ) : tags && tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-sm py-1.5 px-3">
                {tag.name}
                <button
                  onClick={() => {
                    if (confirm(`Yakin ingin menghapus tag "${tag.name}"?`)) {
                      deleteMutation.mutate(tag.id);
                    }
                  }}
                  className="ml-2 hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-muted-foreground">Belum ada tag</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TagManagement;
