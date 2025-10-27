import { Calendar, ArrowRight, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/lib/LocaleContext";
import { useAuth } from "@/lib/AuthContext";
import { api } from "@/lib/api";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export const Hero = () => {
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '09:00',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure videos play on mount
    const playVideos = async () => {
      try {
        if (desktopVideoRef.current) {
          await desktopVideoRef.current.play();
        }
        if (mobileVideoRef.current) {
          await mobileVideoRef.current.play();
        }
      } catch (error) {
        console.log('Video autoplay prevented:', error);
      }
    };
    playVideos();
  }, []);

  const handleBookingChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuickBook = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book an appointment",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (!bookingData.date) {
      toast({
        title: "Date Required",
        description: "Please select an appointment date",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Create the appointment start and end times
      const startAt = new Date(`${bookingData.date}T${bookingData.time}`);
      const endAt = new Date(startAt.getTime() + 60 * 60 * 1000); // 1 hour session

      await api.createAppointment({
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        notes: 'Quick booking from hero section'
      });

      toast({
        title: "Appointment Booked!",
        description: "Your appointment has been successfully scheduled.",
      });

      // Reset form
      setBookingData(prev => ({
        ...prev,
        date: ''
      }));

    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-20" style={{ background: '#F9F6F3' }}>
      <div className="absolute inset-0 overflow-hidden">
        {/* Video backgrounds remain the same */}
        <video
          ref={desktopVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Landscape.mp4" type="video/mp4" />
        </video>
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="md:hidden absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Portrait.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #F5C9B0 0%, #A6B28B 100%)', opacity: 0.2 }}></div>
      </div>
      
      <div className="relative container mx-auto px-6">
        <div className={`grid ${isMobile ? '' : 'lg:grid-cols-2'} gap-12 items-center`}>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2" style={{ color: '#A6B28B' }}>
                <Scissors className="w-5 h-5" />
                <span className="text-sm font-medium">Premium Grooming Experience</span>
              </div>
              <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-6xl'} font-bold leading-tight`} style={{ color: '#1C352D' }}>
                Where Style{" "}
                <span style={{ color: '#F5C9B0' }}>
                  Meets Precision.
                </span>
              </h1>
              <p className={`${isMobile ? 'text-lg' : 'text-xl'} max-w-lg`} style={{ color: '#A6B28B' }}>
                Experience the art of traditional barbering with modern techniques. From classic cuts to contemporary styles, we craft looks that define you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isMobile ? (
                <Button 
                  size="lg" 
                  className="w-full" 
                  style={{ background: '#A6B28B', color: '#1C352D' }}
                  onClick={() => setShowMobileBooking(!showMobileBooking)}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {showMobileBooking ? 'Hide Booking' : t("hero.book")}
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="group" 
                  style={{ background: '#A6B28B', color: '#1C352D' }}
                  onClick={() => user ? navigate('/dashboard') : navigate('/login')}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {t("hero.book")}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
              <Button 
                variant="outline" 
                size="lg" 
                className={isMobile ? 'w-full' : ''} 
                style={{ borderColor: '#A6B28B', color: '#1C352D' }}
              >
                {t("hero.see_plans")}
              </Button>
            </div>

            {!isMobile && (
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#A6B28B' }}>2000+</div>
                  <div className="text-sm" style={{ color: '#1C352D' }}>Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#A6B28B' }}>12+</div>
                  <div className="text-sm" style={{ color: '#1C352D' }}>Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#A6B28B' }}>100%</div>
                  <div className="text-sm" style={{ color: '#1C352D' }}>Satisfaction</div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Booking Card */}
          {(!isMobile || showMobileBooking) && (
            <Card className={`p-8 ${isMobile ? 'mt-4' : 'max-w-md ml-auto'}`} style={{ background: '#F5C9B0', borderColor: '#A6B28B' }}>
              <h3 className="text-xl font-semibold mb-6" style={{ color: '#1C352D' }}>{t("hero.quickBooking.title")}</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: '#A6B28B' }}>{t("hero.quickBooking.date")}</label>
                  <input 
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleBookingChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full mt-1 p-3 rounded-lg"
                    style={{ background: '#F9F6F3', borderColor: '#A6B28B', color: '#1C352D' }} 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: '#A6B28B' }}>Time</label>
                  <select
                    name="time"
                    value={bookingData.time}
                    onChange={handleBookingChange}
                    className="w-full mt-1 p-3 rounded-lg"
                    style={{ background: '#F9F6F3', borderColor: '#A6B28B', color: '#1C352D' }}
                  >
                    {Array.from({ length: 9 }, (_, i) => {
                      const hour = i + 9;
                      return (
                        <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                          {`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <Button 
                  className="w-full" 
                  style={{ background: '#1C352D', color: '#F9F6F3' }} 
                  onClick={handleQuickBook}
                  disabled={isSubmitting || !bookingData.date}
                >
                  {isSubmitting ? "Booking..." : t("hero.quickBooking.confirm")}
                </Button>
                {!user && (
                  <p className="text-sm text-center" style={{ color: '#A6B28B' }}>
                    Please <button onClick={() => navigate('/login')} style={{ color: '#F5C9B0', textDecoration: 'underline' }}>login</button> to book an appointment
                  </p>
                )}
              </div>
            </Card>
          )}
          
          {/* Mobile Stats */}
          {isMobile && (
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(166, 178, 139, 0.1)' }}>
                <div className="text-xl font-bold" style={{ color: '#A6B28B' }}>2000+</div>
                <div className="text-sm" style={{ color: '#1C352D' }}>Happy Clients</div>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(166, 178, 139, 0.1)' }}>
                <div className="text-xl font-bold" style={{ color: '#A6B28B' }}>12+</div>
                <div className="text-sm" style={{ color: '#1C352D' }}>Years Experience</div>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(166, 178, 139, 0.1)' }}>
                <div className="text-xl font-bold" style={{ color: '#A6B28B' }}>100%</div>
                <div className="text-sm" style={{ color: '#1C352D' }}>Satisfaction</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};