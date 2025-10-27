import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/lib/LocaleContext";
import { useAuth } from "@/lib/AuthContext";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import barberLogin from "@/assets/1.jpg";
import barberSignup from "@/assets/3.jpg";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface AnimatedAuthProps {
  initialMode?: 'login' | 'signup';
}

const AnimatedAuth: React.FC<AnimatedAuthProps> = ({ initialMode = 'login' }) => {
  const { t } = useLocale();
  const navigate = useNavigate();
  const { signIn, user, isAdmin } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'exit' | 'enter'>('idle');
  
  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  // Signup state
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, isAdmin, navigate]);

  const switchMode = (newMode: 'login' | 'signup') => {
    if (mode === newMode || isTransitioning) return;
    
    setIsTransitioning(true);
    setAnimationPhase('exit');
    setMessage(null);
    
    // Exit animation
    setTimeout(() => {
      setMode(newMode);
      setAnimationPhase('enter');
      
      // Enter animation
      setTimeout(() => {
        setAnimationPhase('idle');
        setIsTransitioning(false);
      }, 100);
    }, 600);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await signIn(loginData.email, loginData.password);
    } catch (error: any) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Store token
      localStorage.setItem('token', data.token);

      setMessage('Account created successfully! Redirecting to dashboard...');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error: any) {
      setMessage(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getFormAnimationClass = () => {
    if (animationPhase === 'idle') {
      return 'translate-x-0 translate-y-0 opacity-100 scale-100 blur-0';
    }
    
    if (animationPhase === 'exit') {
      if (mode === 'login') {
        return 'translate-x-[-120%] opacity-0 scale-95 blur-sm rotate-[-2deg]';
      } else {
        return 'translate-y-[120%] opacity-0 scale-95 blur-sm rotate-[2deg]';
      }
    }
    
    if (animationPhase === 'enter') {
      if (mode === 'login') {
        return 'translate-y-[-120%] opacity-0 scale-105 blur-sm rotate-[2deg]';
      } else {
        return 'translate-y-[120%] opacity-0 scale-105 blur-sm rotate-[-2deg]';
      }
    }
    return 'translate-x-0 translate-y-0 opacity-100 scale-100 blur-0';
  };

  const getImageAnimationClass = () => {
    if (animationPhase === 'idle') {
      return 'translate-x-0 translate-y-0 opacity-100 scale-100 blur-0';
    }
    if (animationPhase === 'exit') {
      if (mode === 'login') {
        return 'translate-x-[120%] opacity-0 scale-110 blur-md rotate-[3deg]';
      } else {
        return 'translate-y-[-120%] opacity-0 scale-110 blur-md rotate-[-3deg]';
      }
    }
    if (animationPhase === 'enter') {
      if (mode === 'login') {
        return 'translate-x-[120%] opacity-0 scale-90 blur-md rotate-[-3deg]';
      } else {
        return 'translate-y-[-120%] opacity-0 scale-90 blur-md rotate-[3deg]';
      }
    }
    return 'translate-x-0 translate-y-0 opacity-100 scale-100 blur-0';
  };

  const renderContactInfo = () => (
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
        <div className="flex items-center">
          <Mail className="w-5 h-5 mr-3 text-primary" />
          <span>{t("footer.contact.email")}</span>
        </div>
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
  );

  // Login form
  const renderLoginForm = () => (
    <div className="w-full max-w-md" style={{ background: '#F9F6F3' }}>
      {/* ...form content as previously coded... */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: '#F5C9B0' }}>
          <div className="w-8 h-8 rounded-full" style={{ background: '#1C352D' }}></div>
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#1C352D' }}>{t("auth.login.title")}</h1>
        <p style={{ color: '#A6B28B' }}>Welcome back! Please sign in to your account</p>
      </div>
      <div className="rounded-2xl p-8 shadow-xl" style={{ background: '#F9F6F3', border: '1px solid #A6B28B' }}>
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#1C352D' }}>{t("auth.login.emailLabel")}</label>
            <input type="email" value={loginData.email} onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))} placeholder={t("auth.login.emailPlaceholder")} className="w-full p-4 rounded-xl" style={{ background: '#F9F6F3', border: '1px solid #A6B28B', color: '#1C352D' }} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#1C352D' }}>{t("auth.login.passwordLabel")}</label>
            <input type="password" value={loginData.password} onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))} placeholder={t("auth.login.passwordPlaceholder")} className="w-full p-4 rounded-xl" style={{ background: '#F9F6F3', border: '1px solid #A6B28B', color: '#1C352D' }} required />
          </div>
          {message && (<div className="p-3 rounded-lg text-sm font-medium" style={{ background: '#F5C9B0', color: '#1C352D' }}>{message}</div>)}
          <Button type="submit" disabled={loading} className="w-full h-12 text-base font-semibold rounded-xl" style={{ background: '#1C352D', color: '#F9F6F3' }}>{loading ? "Signing in..." : t("auth.login.submit")}</Button>
        </form>
      </div>
      <div className="text-center mt-8">
        <p style={{ color: '#A6B28B' }}>{t("auth.login.noAccount")} <button onClick={() => switchMode('signup')} style={{ color: '#F5C9B0', fontWeight: 'bold' }}>{t("auth.login.signUpLink")}</button></p>
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} style={{ color: '#A6B28B' }}>← {t("auth.signup.backHome")}</Button>
      </div>
    </div>
  );

  // Signup form
  const renderSignupForm = () => (
    <div className="w-full max-w-md" style={{ background: '#F9F6F3' }}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: '#F5C9B0' }}>
          <div className="w-8 h-8 rounded-full" style={{ background: '#1C352D' }}></div>
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#1C352D' }}>{t("auth.signup.title")}</h1>
        <p style={{ color: '#A6B28B' }}>Create your account to get started</p>
      </div>
      <div className="rounded-2xl p-8 shadow-xl" style={{ background: '#F9F6F3', border: '1px solid #A6B28B' }}>
        <form onSubmit={handleSignupSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#1C352D' }}>{t("auth.signup.firstNameLabel")}</label>
              <Input name="firstName" value={signupData.firstName} onChange={(e) => setSignupData(prev => ({ ...prev, firstName: e.target.value }))} placeholder={t("auth.signup.firstNamePlaceholder")} className="p-4 rounded-xl" style={{ background: '#F9F6F3', border: '1px solid #A6B28B', color: '#1C352D' }} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#1C352D' }}>{t("auth.signup.lastNameLabel")}</label>
              <Input name="lastName" value={signupData.lastName} onChange={(e) => setSignupData(prev => ({ ...prev, lastName: e.target.value }))} placeholder={t("auth.signup.lastNamePlaceholder")} className="p-4 rounded-xl" style={{ background: '#F9F6F3', border: '1px solid #A6B28B', color: '#1C352D' }} required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#1C352D' }}>{t("auth.signup.emailLabel")}</label>
            <Input name="email" type="email" value={signupData.email} onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))} placeholder={t("auth.signup.emailPlaceholder")} className="p-4 rounded-xl" style={{ background: '#F9F6F3', border: '1px solid #A6B28B', color: '#1C352D' }} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#1C352D' }}>{t("auth.signup.phoneLabel")}</label>
            <Input name="phone" type="tel" value={signupData.phone} onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))} placeholder={t("auth.signup.phonePlaceholder")} className="p-4 rounded-xl" style={{ background: '#F9F6F3', border: '1px solid #A6B28B', color: '#1C352D' }} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#1C352D' }}>{t("auth.signup.passwordLabel")}</label>
            <Input name="password" type="password" value={signupData.password} onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))} placeholder={t("auth.signup.passwordPlaceholder")} className="p-4 rounded-xl" style={{ background: '#F9F6F3', border: '1px solid #A6B28B', color: '#1C352D' }} required minLength={6} />
          </div>
          {message && (
            <div className="p-3 rounded-lg text-sm font-medium" style={{ background: message.includes('successful') ? '#A6B28B' : '#F5C9B0', color: '#1C352D' }}>{message}</div>
          )}
          <Button type="submit" disabled={loading} className="w-full h-12 text-base font-semibold rounded-xl" style={{ background: '#1C352D', color: '#F9F6F3' }}>{loading ? "Creating Account..." : t("auth.signup.submit")}</Button>
        </form>
      </div>
      <div className="text-center mt-8">
        <p style={{ color: '#A6B28B' }}>{t("auth.signup.haveAccount")} <button onClick={() => switchMode('login')} style={{ color: '#F5C9B0', fontWeight: 'bold' }}>{t("auth.signup.loginLink")}</button></p>
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} style={{ color: '#A6B28B' }}>← {t("auth.signup.backHome")}</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen grid md:grid-cols-2 overflow-hidden rounded-lg" style={{ background: '#F9F6F3' }}>
      {/* Form Section */}
      <div 
        className={`flex items-center justify-center p-8 transition-all duration-700 ease-out ${
          mode === 'login' ? 'order-1' : 'order-2'
        } ${getFormAnimationClass()}`}
      >
        {mode === 'login' ? renderLoginForm() : renderSignupForm()}
      </div>
      {/* Image Section */}
      <div 
        className={`relative hidden md:block transition-all duration-700 ease-out ${
          mode === 'login' ? 'order-2' : 'order-1'
        } ${getImageAnimationClass()}`}
      >
        <img
          src={mode === 'login' ? barberLogin : barberSignup}
          alt={mode === 'login' ? 'Barber login' : 'Barber signup'}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/30" />
        <div className={`relative h-full flex items-center justify-center p-10 transition-all duration-500 ease-out ${animationPhase === 'enter' ? 'animate-in fade-in slide-in-from-right-8 delay-200' : ''}`}>
          {renderContactInfo()}
        </div>
      </div>
    </div>
  );
};

export default AnimatedAuth;