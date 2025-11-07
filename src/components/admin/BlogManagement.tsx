import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  status: string;
  category_id: string | null;
}

const BlogManagement = () => {
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    featured_image: "",
    status: "draft",
    category_id: "",
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          categories (
            id,
            name
          ),
          post_tags (
            tags (
              id,
              name
            )
          )
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  const { data: tags } = useQuery({
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
    mutationFn: async (data: typeof formData) => {
      const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data: newPost, error } = await supabase.from("posts").insert([{
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt || null,
        featured_image: data.featured_image || null,
        status: data.status,
        category_id: data.category_id || null,
        author_id: user?.id,
        published_at: data.status === "published" ? new Date().toISOString() : null,
      }]).select().single();

      if (error) throw error;

      // Add tags
      if (selectedTags.length > 0 && newPost) {
        const postTagsData = selectedTags.map(tagId => ({
          post_id: newPost.id,
          tag_id: tagId,
        }));
        
        const { error: tagsError } = await supabase
          .from("post_tags")
          .insert(postTagsData);
        
        if (tagsError) throw tagsError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      toast.success("Artikel berhasil dibuat");
      resetForm();
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal membuat artikel");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      
      const { error } = await supabase.from("posts").update({
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt || null,
        featured_image: data.featured_image || null,
        status: data.status,
        category_id: data.category_id || null,
        published_at: data.status === "published" ? new Date().toISOString() : null,
      }).eq("id", id);

      if (error) throw error;

      // Update tags: delete old ones and insert new ones
      await supabase.from("post_tags").delete().eq("post_id", id);
      
      if (selectedTags.length > 0) {
        const postTagsData = selectedTags.map(tagId => ({
          post_id: id,
          tag_id: tagId,
        }));
        
        const { error: tagsError } = await supabase
          .from("post_tags")
          .insert(postTagsData);
        
        if (tagsError) throw tagsError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      toast.success("Artikel berhasil diupdate");
      resetForm();
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal mengupdate artikel");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      toast.success("Artikel berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus artikel");
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      featured_image: "",
      status: "draft",
      category_id: "",
    });
    setSelectedTags([]);
    setEditingPost(null);
  };

  const handleEdit = async (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || "",
      featured_image: post.featured_image || "",
      status: post.status,
      category_id: post.category_id || "",
    });
    
    // Load post tags
    const postTags = post.post_tags?.map((pt: any) => pt.tags.id) || [];
    setSelectedTags(postTags);
    
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Blog</h2>
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Artikel Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Artikel" : "Artikel Baru"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="excerpt">Ringkasan</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Ringkasan singkat artikel..."
                />
              </div>
              
              <div>
                <Label htmlFor="content">Konten</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Tulis konten artikel di sini..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <Select 
                    value={formData.category_id} 
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tanpa Kategori</SelectItem>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Tag</Label>
                <div className="flex flex-wrap gap-2 mt-2 p-3 border rounded-md">
                  {tags && tags.length > 0 ? (
                    tags.map((tag) => (
                      <div key={tag.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag.id}`}
                          checked={selectedTags.includes(tag.id)}
                          onCheckedChange={() => toggleTag(tag.id)}
                        />
                        <label
                          htmlFor={`tag-${tag.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {tag.name}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Belum ada tag. Buat tag terlebih dahulu.</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="featured_image">URL Gambar Utama</Label>
                <Input
                  id="featured_image"
                  type="url"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingPost ? "Update" : "Buat"} Artikel
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
        <div className="grid gap-4">
          {posts?.map((post: any) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription className="mt-2 space-y-1">
                      <div>Status: <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge></div>
                      {post.categories && (
                        <div>Kategori: <Badge variant="outline">{post.categories.name}</Badge></div>
                      )}
                      {post.post_tags && post.post_tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          Tag: {post.post_tags.map((pt: any) => (
                            <Badge key={pt.tags.id} variant="secondary" className="text-xs">
                              {pt.tags.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => {
                        if (confirm("Yakin ingin menghapus artikel ini?")) {
                          deleteMutation.mutate(post.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {post.excerpt && (
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
