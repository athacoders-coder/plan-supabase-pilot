import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Eye, Mail, Phone, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const ContactSubmissionsManagement = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  const queryClient = useQueryClient();

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status: string; notes: string }) => {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ status, notes })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
      toast.success("Status berhasil diperbarui");
      setDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui status");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
      toast.success("Pesan berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus pesan");
    },
  });

  const handleView = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setStatus(submission.status);
    setNotes(submission.notes || "");
    setDialogOpen(true);
    
    // Mark as read if it's new
    if (submission.status === "new") {
      updateMutation.mutate({
        id: submission.id,
        status: "read",
        notes: submission.notes || "",
      });
    }
  };

  const handleUpdate = () => {
    if (selectedSubmission) {
      updateMutation.mutate({
        id: selectedSubmission.id,
        status,
        notes,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      new: "default",
      read: "secondary",
      replied: "outline",
      archived: "destructive",
    };
    
    const labels: Record<string, string> = {
      new: "Baru",
      read: "Dibaca",
      replied: "Dibalas",
      archived: "Arsip",
    };
    
    return <Badge variant={variants[status] || "secondary"}>{labels[status] || status}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pesan Kontak</CardTitle>
        <CardDescription>Kelola pesan dari formulir kontak</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center py-4 text-muted-foreground">Memuat...</p>
        ) : submissions && submissions.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telepon</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id} className={submission.status === "new" ? "bg-muted/50" : ""}>
                    <TableCell className="text-sm">
                      {format(new Date(submission.created_at), "dd MMM yyyy HH:mm", { locale: id })}
                    </TableCell>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell className="text-sm">{submission.email}</TableCell>
                    <TableCell className="text-sm">{submission.phone}</TableCell>
                    <TableCell>{getStatusBadge(submission.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(submission)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm("Yakin ingin menghapus pesan ini?")) {
                              deleteMutation.mutate(submission.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center py-8 text-muted-foreground">Belum ada pesan kontak</p>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detail Pesan Kontak</DialogTitle>
            </DialogHeader>
            {selectedSubmission && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Nama</Label>
                    <p className="font-medium">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Tanggal</Label>
                    <p className="font-medium">
                      {format(new Date(selectedSubmission.created_at), "dd MMMM yyyy, HH:mm", { locale: id })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${selectedSubmission.email}`} className="text-primary hover:underline">
                    {selectedSubmission.email}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${selectedSubmission.phone}`} className="text-primary hover:underline">
                    {selectedSubmission.phone}
                  </a>
                </div>

                <div>
                  <Label className="text-muted-foreground">Pesan</Label>
                  <div className="mt-2 p-4 bg-muted rounded-md">
                    <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Baru</SelectItem>
                      <SelectItem value="read">Dibaca</SelectItem>
                      <SelectItem value="replied">Dibalas</SelectItem>
                      <SelectItem value="archived">Arsip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Catatan Internal</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tambahkan catatan..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
                    Simpan Perubahan
                  </Button>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Tutup
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ContactSubmissionsManagement;
