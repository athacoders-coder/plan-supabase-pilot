import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const phoneNumber = "6281234567890"; // Format: country code + number (no + or spaces)
  const message = encodeURIComponent("Halo, saya ingin bertanya tentang layanan PT Aratindo Karya Utama");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat via WhatsApp"
    >
      <Button
        size="lg"
        className="rounded-full h-14 w-14 shadow-elegant hover:shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-card text-card-foreground px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium pointer-events-none">
        Chat via WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
