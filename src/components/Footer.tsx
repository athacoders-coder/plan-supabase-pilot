import { Building2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <span className="font-semibold">PT Aratindo Karya Utama</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 PT Aratindo Karya Utama. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;