const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface User {
  _id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  role: 'customer' | 'admin' | 'staff';
  isActive: boolean;
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
  createdAt: string;
  updatedAt: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const api = {
  // Auth
  async signUp(data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to sign up');
    }
    return response.json();
  },

  async signIn(data: { email: string; password: string }) {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to sign in');
    }
    return response.json();
  },

  async getMe() {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get user info');
    }
    return response.json();
  },

  async signOut() {
    const response = await fetch(`${API_URL}/auth/signout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to sign out');
    }
    return response.json();
  },

  // Appointments
  async getAppointments() {
    const response = await fetch(`${API_URL}/appointments/my`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return response.json();
  },

  async createAppointment(data: {
    startAt: string;
    endAt: string;
    notes?: string;
    staffId?: string;
  }) {
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create appointment');
    }
    return response.json();
  },

  async updateAppointment(id: string, data: {
    startAt?: string;
    endAt?: string;
    status?: string;
    notes?: string;
    cancellationReason?: string;
    staffId?: string;
  }) {
    const response = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update appointment');
    }
    return response.json();
  },

  async deleteAppointment(id: string) {
    const response = await fetch(`${API_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete appointment');
    }
    return response.json();
  },

  async getAdminAppointments() {
    const response = await fetch(`${API_URL}/appointments/admin`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch admin appointments');
    return response.json();
  },

  // Staff
  async getStaffMembers() {
    const response = await fetch(`${API_URL}/users/staff`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch staff members');
    return response.json();
  },

  async updateUser(id: string, data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    isActive?: boolean;
  }) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update user');
    }
    return response.json();
  }
};

