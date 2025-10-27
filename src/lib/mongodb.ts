import axios, { AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  role: 'customer' | 'admin' | 'staff';
  isActive?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Appointment {
  _id: string;
  customerId: string | User;
  staffId?: string | User | null;
  startAt: string;
  endAt: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string | null;
  cancellationReason?: string | null;
  reminderSent: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth API
export const authAPI = {
  signUp: async (data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/signin', { email, password });
    return response.data;
  },

  getMe: async (): Promise<{ user: User }> => {
    const response = await apiClient.get<{ user: User }>('/auth/me');
    return response.data;
  },

  signOut: async (): Promise<void> => {
    await apiClient.post('/auth/signout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
};

// Appointments API
export const appointmentsAPI = {
  getAll: async (): Promise<{ appointments: Appointment[] }> => {
    const response = await apiClient.get<{ appointments: Appointment[] }>('/appointments/admin');
    return response.data;
  },

  getMy: async (): Promise<{ appointments: Appointment[] }> => {
    const response = await apiClient.get<{ appointments: Appointment[] }>('/appointments/my');
    return response.data;
  },

  create: async (data: {
    startAt: string;
    endAt: string;
    notes?: string;
    staffId?: string;
  }): Promise<{ appointment: Appointment }> => {
    const response = await apiClient.post<{ appointment: Appointment }>('/appointments', data);
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<{
      startAt: string;
      endAt: string;
      status: string;
      notes: string;
      cancellationReason: string;
      staffId: string;
    }>
  ): Promise<{ appointment: Appointment }> => {
    const response = await apiClient.put<{ appointment: Appointment }>(`/appointments/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/appointments/${id}`);
  },
};

export default apiClient;