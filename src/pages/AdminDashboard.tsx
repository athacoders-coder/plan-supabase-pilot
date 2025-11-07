import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import { toast } from "sonner";
import BlogManagement from "@/components/admin/BlogManagement";
import GalleryManagement from "@/components/admin/GalleryManagement";
import CategoryManagement from "@/components/admin/CategoryManagement";
import TagManagement from "@/components/admin/TagManagement";
import ContactSubmissionsManagement from "@/components/admin/ContactSubmissionsManagement";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/admin");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (!roles) {
        toast.error("Anda tidak memiliki akses admin");
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logout berhasil");
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Kembali ke Website
              </Link>
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full max-w-4xl grid-cols-5 mb-6">
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="categories">Kategori</TabsTrigger>
            <TabsTrigger value="tags">Tag</TabsTrigger>
            <TabsTrigger value="gallery">Galeri</TabsTrigger>
            <TabsTrigger value="contacts">Pesan</TabsTrigger>
          </TabsList>

          <TabsContent value="blog" className="mt-6">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <CategoryManagement />
          </TabsContent>

          <TabsContent value="tags" className="mt-6">
            <TagManagement />
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <GalleryManagement />
          </TabsContent>

          <TabsContent value="contacts" className="mt-6">
            <ContactSubmissionsManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
