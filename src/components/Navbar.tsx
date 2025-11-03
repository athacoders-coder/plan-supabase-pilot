import { Link, useLocation } from "react-router-dom";
import { Building2 } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Building2 className="h-6 w-6 text-primary" />
            <span>PT Aratindo Karya Utama</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Beranda
            </Link>
            <Link 
              to="/tentang-kami" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/tentang-kami") ? "text-primary" : "text-foreground"
              }`}
            >
              Tentang Kami
            </Link>
            <Link 
              to="/blog" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/blog") || location.pathname.startsWith("/blog/") ? "text-primary" : "text-foreground"
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/galeri" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/galeri") ? "text-primary" : "text-foreground"
              }`}
            >
              Galeri
            </Link>
            <Link to="/admin">
              <Button size="sm">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;