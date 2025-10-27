import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Languages, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppointmentBookingDialog } from "./AppointmentBookingDialog";
import { RescheduleDialog } from "./RescheduleDialog";
import { useUserAppointments } from "@/hooks/useUserAppointments";
import { format } from "date-fns";
import { useLocale } from "@/lib/LocaleContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface Appointment {
  id: number;
  service: { name: string } | null;
  start_at: string;
  end_at: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function UserDashboard() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const { data: appointments, isLoading, error, refetch } = useUserAppointments();
  const { t, locale, setLocale } = useLocale();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleReschedule = (appointment: any) => {
    setSelectedAppointment(appointment);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center mb-4 md:mb-6">
        <Button 
          variant="ghost" 
          className="mr-2 md:mr-4" 
          size={isMobile ? "sm" : "default"}
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" /> {t("dashboard.user.backHome")}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{t("dashboard.user.welcome")}</h1>
          <p className="text-sm md:text-base text-muted-foreground">{user?.email}</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size={isMobile ? "sm" : "icon"} className={isMobile ? "flex-1" : ""}>
                <Globe className="w-4 h-4" />
                {isMobile && <span className="ml-2">{locale.toUpperCase()}</span>}
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
          <Button onClick={handleLogout} variant="outline" size={isMobile ? "sm" : "default"} className={isMobile ? "flex-1" : ""}>
            {t("dashboard.user.logout")}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.user.appointments.title")}</CardTitle>
              <CardDescription>{t("dashboard.user.appointments.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => setShowBookingDialog(true)}
              >
                {t("dashboard.user.appointments.bookNew")}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.user.profile.title")}</CardTitle>
              <CardDescription>{t("dashboard.user.profile.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => navigate('/profile')}
              >
                {t("dashboard.user.profile.view")}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.user.support.title")}</CardTitle>
              <CardDescription>{t("dashboard.user.support.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => navigate('/support')}
              >
                {t("dashboard.user.support.contact")}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.user.appointments.upcoming")}</CardTitle>
            <CardDescription>
              {t("dashboard.user.appointments.manage")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div>{t("dashboard.user.appointments.loading")}</div>
            ) : error ? (
              <div className="text-red-600">{t("dashboard.user.appointments.error")}</div>
            ) : appointments?.length === 0 ? (
              <div className="text-muted-foreground">{t("dashboard.user.appointments.none")}</div>
            ) : (
              <div className="space-y-4">
                {appointments?.map((appointment: any) => {
                  try {
                    // Safely create Date objects and handle timezone
                    const startDate = new Date(appointment.startAt);
                    const endDate = new Date(appointment.endAt);
                    
                    // Double-check date validity
                    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                      console.error('Invalid date for appointment:', appointment);
                      return null;
                    }

                    return (
                      <Card key={appointment._id}>
                        <CardContent className="p-3 md:p-4">
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm md:text-base">
                                {format(startDate, 'PPP')}
                              </h4>
                              <p className="text-xs md:text-sm text-muted-foreground">
                                {format(startDate, 'p')} - {format(endDate, 'p')}
                              </p>
                              <div className="mt-1 md:mt-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  appointment.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                                  appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReschedule(appointment)}
                              disabled={appointment.status === 'cancelled'}
                              className="w-full md:w-auto"
                            >
                              {t("dashboard.user.appointments.reschedule")}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  } catch (error) {
                    console.error('Error rendering appointment:', error);
                    return null;
                  }
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <AppointmentBookingDialog 
          open={showBookingDialog}
          onOpenChange={setShowBookingDialog}
        />
        
        {selectedAppointment && (
          <RescheduleDialog
            appointment={selectedAppointment}
            open={!!selectedAppointment}
            onOpenChange={(open) => !open && setSelectedAppointment(null)}
            onRescheduled={() => {
              refetch();
              setSelectedAppointment(null);
            }}
          />
        )}
      </div>

      {/* Add upcoming appointments section here later */}
    </div>
  );
}
