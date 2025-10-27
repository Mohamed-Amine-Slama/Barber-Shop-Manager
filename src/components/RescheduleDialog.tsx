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
import { useState } from "react";
import { api, Appointment } from "@/lib/api";
import { addDays, set } from "date-fns";

interface RescheduleDialogProps {
  appointment: Appointment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRescheduled: () => void;
}

export function RescheduleDialog({ 
  appointment, 
  open, 
  onOpenChange,
  onRescheduled 
}: RescheduleDialogProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Available time slots
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "14:00", "15:00", "16:00", "17:00"
  ];

  const handleSubmit = async () => {
    if (!date || !time) {
      setMessage("Please select both date and time");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Parse and combine date and time
      const [hours, minutes] = time.split(':');
      const startAt = set(date, {
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: 0,
        milliseconds: 0
      });

      // Calculate end time (1 hour duration)
      const endAt = new Date(startAt.getTime() + 60 * 60 * 1000);
      
      // Update the appointment
      const { appointment: updatedAppointment } = await api.updateAppointment(
        appointment._id,
        {
          startAt: startAt.toISOString(),
          endAt: endAt.toISOString(),
        }
      );

      // If we got here, the update was successful
      setMessage("Appointment rescheduled successfully!");
      onRescheduled();
      
      // Close dialog after a delay
      setTimeout(() => {
        onOpenChange(false);
        setDate(undefined);
        setTime(undefined);
        setMessage(null);
      }, 2000);

    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" style={{ background: '#F9F6F3', border: '1px solid #A6B28B' }}>
        <DialogHeader>
          <DialogTitle style={{ color: '#1C352D' }}>Reschedule Appointment</DialogTitle>
          <DialogDescription style={{ color: '#A6B28B' }}>Choose a new date and time for your appointment.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label style={{ color: '#1C352D' }}>Select New Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
              className="rounded-md"
              style={{ border: '1px solid #A6B28B', background: '#F9F6F3' }}
            />
          </div>

          {date && (
            <div className="space-y-2">
              <Label style={{ color: '#1C352D' }}>Select New Time</Label>
              <Select onValueChange={setTime}>
                <SelectTrigger style={{ border: '1px solid #A6B28B', background: '#F9F6F3', color: '#1C352D' }}>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot} style={{ color: '#1C352D', background: '#F9F6F3' }}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {message && (
          <div className="text-sm mt-2" style={{ color: message.includes('successfully') ? '#A6B28B' : '#F5C9B0' }}>
            {message}
          </div>
        )}

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={loading || !date || !time}
            style={{ background: '#1C352D', color: '#F9F6F3' }}
          >
            {loading ? "Rescheduling..." : "Reschedule Appointment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
