import { Link, useLocation } from "react-router-dom";
import { Building2, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: "/", label: "Beranda" },
    { path: "/tentang-kami", label: "Tentang Kami" },
    { path: "/blog", label: "Blog" },
    { path: "/galeri", label: "Galeri" },
  ];
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-base sm:text-xl">
            <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <span className="hidden xs:inline">PT Aratindo Karya Utama</span>
            <span className="xs:hidden">Aratindo</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) || (link.path === "/blog" && location.pathname.startsWith("/blog/")) 
                    ? "text-primary" 
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/admin">
              <Button size="sm">Admin</Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary py-2 ${
                      isActive(link.path) || (link.path === "/blog" && location.pathname.startsWith("/blog/"))
                        ? "text-primary" 
                        : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/admin" onClick={() => setOpen(false)}>
                  <Button className="w-full" size="lg">Admin</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;