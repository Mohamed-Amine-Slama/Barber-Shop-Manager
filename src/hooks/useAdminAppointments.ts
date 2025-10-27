import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const fetchAdminAppointments = async () => {
  const data = await api.getAdminAppointments();
  return data.appointments || [];
};

export const useAdminAppointments = () => {
  return useQuery({ queryKey: ["admin_appointments"], queryFn: fetchAdminAppointments, refetchOnWindowFocus: false });
};
