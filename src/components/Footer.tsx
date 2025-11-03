import { Building2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span className="font-semibold text-sm sm:text-base">PT Aratindo Karya Utama</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            © 2025 PT Aratindo Karya Utama. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;