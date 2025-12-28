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