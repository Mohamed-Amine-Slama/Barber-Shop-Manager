import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { addDays, set } from "date-fns";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface AppointmentBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Function to round a date to the nearest 30 minutes
function roundTo30Minutes(date: Date) {
  const minutes = date.getMinutes();
  const roundedMinutes = minutes < 30 ? 0 : 30;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), roundedMinutes, 0, 0);
}

export function AppointmentBookingDialog({ open, onOpenChange }: AppointmentBookingDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Available time slots (10:00 to 23:00)
  const timeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
    "22:00", "22:30", "23:00"
  ];


  const handleSubmit = async () => {
    if (!date || !time || !user) {
      setMessage("Please select date and time");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Combine date and time
      const [hours, minutes] = time.split(':');
      // Create a new Date object to avoid mutating the original date
      const appointmentDate = new Date(date!.getTime());
      const startAt = set(appointmentDate, {
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: 0,
        milliseconds: 0
      });

      // Calculate end time (30 minutes after start time)
      const endAt = new Date(startAt.getTime());
      endAt.setMinutes(endAt.getMinutes() + 30);

      // Create the appointment
      const { appointment } = await api.createAppointment({
        startAt: startAt.toISOString(),
        endAt: endAt.toISOString(),
        notes: null
      });

      if (appointment) {
        toast({
          title: "Success!",
          description: "Your appointment has been booked successfully.",
        });
        setMessage("Appointment booked successfully!");
        setTimeout(() => {
          onOpenChange(false);
          setDate(undefined);
          setTime(undefined);
          setMessage(null);
        }, 1500);
      }
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      const errorMessage = error?.response?.data?.message || error.message || 'Failed to book appointment';
      setMessage(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" style={{ background: '#F9F6F3', border: '1px solid #A6B28B' }}>
        <DialogHeader>
          <DialogTitle style={{ color: '#1C352D' }}>Book Appointment</DialogTitle>
          <DialogDescription style={{ color: '#A6B28B' }}>
            Choose your preferred date and time for your appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label style={{ color: '#1C352D' }}>Select Date</Label>
            <Calendar 
              mode="single" 
              selected={date} 
              onSelect={setDate} 
              disabled={(date) => {
                // Disable past dates, dates beyond 30 days, and Mondays
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isMonday = date.getDay() === 1;
                const isPast = date < today;
                const isTooFar = date > addDays(new Date(), 30);
                return isPast || isTooFar || isMonday;
              }} 
              className="rounded-md" 
              style={{ border: '1px solid #A6B28B', background: '#F9F6F3' }} 
            />
          </div>
          {date && (
            <div className="space-y-2">
              <Label style={{ color: '#1C352D' }}>Select Time</Label>
              <Select onValueChange={setTime}>
                <SelectTrigger style={{ border: '1px solid #A6B28B', background: '#F9F6F3', color: '#1C352D' }}>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot} style={{ color: '#1C352D', background: '#F9F6F3' }}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        {message && (<div className="text-sm mt-2" style={{ color: message.includes('successfully') ? '#A6B28B' : '#F5C9B0' }}>{message}</div>)}
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading || !date || !time} style={{ background: '#1C352D', color: '#F9F6F3' }}>{loading ? "Booking..." : "Book Appointment"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
