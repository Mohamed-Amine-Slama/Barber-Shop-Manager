import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/AuthContext";
import { api } from "@/lib/api";

export const useUserAppointments = () => {
  const { user } = useAuth();

  const fetchUserAppointments = async () => {
    if (user?.role === 'admin') {
      const data = await api.getAdminAppointments();
      return data.appointments || [];
    } else {
      const data = await api.getAppointments();
      return data.appointments || [];
    }
  };

  return useQuery({
    queryKey: ['user-appointments', user?._id],
    queryFn: fetchUserAppointments,
    enabled: !!user,
  });
};
