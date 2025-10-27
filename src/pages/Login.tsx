import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/LocaleContext";
import { useAuth } from "@/lib/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import heroImage from "@/assets/hero-rehabilitation.jpg";

const Login = () => {
  const { t, locale, setLocale } = useLocale();
  const navigate = useNavigate();
  const { signIn, user, isAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // If user is already logged in, redirect them
    if (user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await signIn(email, password);
      // Navigation is handled in the AuthContext
    } catch (error: any) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 transition-all duration-500 ease-in-out overflow-hidden rounded-lg">
      {/* Left: Login form */}
      <div className="flex items-center justify-center p-8 transition-all duration-500 ease-in-out">
        <div className="w-full max-w-md">
          {/* Language Toggle - Top Right */}
          <div className="flex justify-end mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
          </div>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{t("auth.login.title")}</h1>
            <p className="text-muted-foreground">Welcome back! Please sign in to your account</p>
          </div>

          {/* Form Card */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">
                  {t("auth.login.emailLabel")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.login.emailPlaceholder")}
                  className="w-full p-4 border border-border/30 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">
                  {t("auth.login.passwordLabel")}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.login.passwordPlaceholder")}
                  className="w-full p-4 border border-border/30 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/60"
                  required
                />
              </div>
              {message && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                  {message}
                </div>
              )}
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? "Signing in..." : t("auth.login.submit")} 
              </Button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              {t("auth.login.noAccount")} {" "}
              <Link to="/signup" className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200">
                {t("auth.login.signUpLink")}
              </Link>
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              ← {t("auth.signup.backHome")}
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Image + Contact info */}
      <div className="relative hidden md:block transition-all duration-500 ease-in-out">
        <img
          src={heroImage}
          alt="Physical rehabilitation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/30" />
        <div className="relative h-full flex items-center justify-center p-10 transition-all duration-300 ease-in-out">
          <div className="text-white max-w-md w-full space-y-6">
            <h3 className="text-2xl font-semibold">Contact Info</h3>
            <div className="space-y-4 text-white/90">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  {(() => {
                    const address = t("footer.contact.address");
                    if (typeof address === 'string' && address) {
                      return address.split("\n").map((line: string, i: number) => (
                        <p key={i}>{line}</p>
                      ));
                    }
                    return <p>Address not available</p>;
                  })()}
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span>{t("footer.contact.phone")}</span>
              </div>
              {/* Email removed from contact info per request */}
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p>{t("footer.hours")}</p>
                  <p>{t("footer.hoursSaturday")}</p>
                  <p>{t("footer.hoursSunday")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
