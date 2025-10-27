import { useEffect, useState } from "react";
import { Calendar, Menu, User, LogOut, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/LocaleContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const userEmail = user?.email || null;
  const firstName = user?.firstName || null;
  const lastName = user?.lastName || null;

  const handleLogin = async () => {
    // navigate to the login page where users can sign in or sign up
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNavClick = (sectionId: string) => {
    // Close mobile menu if open
    setMobileMenuOpen(false);
    
    // If not on home page, navigate to home first
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const { locale, setLocale, t } = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b" style={{ background: '#F9F6F3', borderColor: '#A6B28B' }}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/Logo.png" alt="Premium Barber Shop Logo" className="h-10 w-10 object-contain rounded-full" />
            <div>
              <h1 className="text-lg font-bold" style={{ color: '#1C352D' }}>{t("header.title")}</h1>
              <p className="text-sm" style={{ color: '#A6B28B' }}>{t("header.subtitle")}</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => handleNavClick('services')} style={{ color: '#1C352D' }} className="hover:opacity-70 transition-opacity">{t("header.nav.services")}</button>
            <button onClick={() => handleNavClick('gallery')} style={{ color: '#1C352D' }} className="hover:opacity-70 transition-opacity">{t("header.nav.gallery")}</button>
            <button onClick={() => handleNavClick('about')} style={{ color: '#1C352D' }} className="hover:opacity-70 transition-opacity">{t("header.nav.about")}</button>
            <button onClick={() => handleNavClick('location')} style={{ color: '#1C352D' }} className="hover:opacity-70 transition-opacity">{t("header.nav.location")}</button>
          </nav>
          
          <div className="flex items-center space-x-4">
            {!isMobile && (
              <Button 
                size="sm" 
                style={{ background: '#A6B28B', color: '#1C352D' }} 
                onClick={() => userEmail ? navigate('/dashboard') : navigate('/login')}
              >
                <Calendar className="w-4 h-4 mr-2" />Book Now
              </Button>
            )}
            
            {userEmail ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full" style={{ background: '#F5C9B0', color: '#1C352D' }}>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {firstName && lastName ? `${firstName[0]}${lastName[0]}` : userEmail ? userEmail[0].toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount style={{ background: '#F9F6F3', borderColor: '#A6B28B' }}>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none" style={{ color: '#1C352D' }}>{firstName} {lastName}</p>
                      <p className="text-xs leading-none" style={{ color: '#A6B28B' }}>{userEmail}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => isAdmin ? navigate('/admin') : navigate('/dashboard')} style={{ color: '#1C352D', background: '#F5C9B0' }}>
                    <User className="mr-2 h-4 w-4" style={{ color: '#A6B28B' }} />Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} style={{ color: '#F9F6F3', background: '#A6B28B' }}>
                    <LogOut className="mr-2 h-4 w-4" style={{ color: '#F5C9B0' }} />{t("header.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm" style={{ background: '#A6B28B', color: '#1C352D' }} onClick={handleLogin}>
                {t("header.login")}
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" style={{ color: '#1C352D', background: '#F5C9B0' }}>
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" style={{ background: '#F9F6F3', borderColor: '#A6B28B' }}>
                <DropdownMenuItem onClick={() => setLocale("en")} style={locale === "en" ? { background: '#A6B28B', color: '#1C352D' } : {}}>
                  <span role="img" aria-label="English" className="mr-2">🇬🇧</span> English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale("fr")} style={locale === "fr" ? { background: '#A6B28B', color: '#1C352D' } : {}}>
                  <span role="img" aria-label="Français" className="mr-2">🇫🇷</span> Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale("ar")} style={locale === "ar" ? { background: '#A6B28B', color: '#1C352D' } : {}}>
                  <span role="img" aria-label="العربية" className="mr-2">🇹🇳</span> العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="md:hidden"
              style={{ borderColor: '#A6B28B', color: '#1C352D' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && mobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t" style={{ borderColor: '#A6B28B' }}>
            <div className="flex flex-col space-y-4">
              <button onClick={() => handleNavClick('services')} className="px-4 py-2 hover:bg-opacity-10 rounded text-left" style={{ color: '#1C352D' }}>{t("header.nav.services")}</button>
              <button onClick={() => handleNavClick('gallery')} className="px-4 py-2 hover:bg-opacity-10 rounded text-left" style={{ color: '#1C352D' }}>{t("header.nav.gallery")}</button>
              <button onClick={() => handleNavClick('about')} className="px-4 py-2 hover:bg-opacity-10 rounded text-left" style={{ color: '#1C352D' }}>{t("header.nav.about")}</button>
              <button onClick={() => handleNavClick('location')} className="px-4 py-2 hover:bg-opacity-10 rounded text-left" style={{ color: '#1C352D' }}>{t("header.nav.location")}</button>
              <Button 
                className="w-full" 
                style={{ background: '#A6B28B', color: '#1C352D' }} 
                onClick={() => userEmail ? navigate('/dashboard') : navigate('/login')}
              >
                <Calendar className="w-4 h-4 mr-2" />Book Now
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};