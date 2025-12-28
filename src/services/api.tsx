import type {  NewUserPayload } from "../types";
import api from "./axiosInstance"

export const getTickets = async () => {
    const response = await api.get('/tickets');
    return response.data;
}

export const getTicketId = async (ticketId: number) => {
    const response = await api.get(`/tickets/${ticketId}`);
    return response.data;
}

export const getTicketIdComments = async (ticketId: number) => {
    const response = await api.get(`/tickets/${ticketId}/comments`);
    return response.data;
}

export const getStatuses = async () => {
    const response = await api.get('/statuses');
    return response.data;
}

export const getPriorities = async () => {
    const response = await api.get('/priorities');
    return response.data;
}

export const updateTicket = async (ticketId: number, data: any) => {
    const response = await api.patch(`/tickets/${ticketId}`, data);
    return response.data;
}

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
}

export const addUser = async (userData: NewUserPayload) => {
  const response = await  api.post('/users', userData);
  return response.data;
};

// מחיקה
export const deleteStatus = (id: number) => api.delete(`/statuses/${id}`);
export const deletePriority = (id: number) => api.delete(`/priorities/${id}`);

// הוספה
export const addStatus = (name: string) => api.post('/statuses', { name });
export const addPriority = (name: string) => api.post('/priorities', { name });