// types.ts - cleaned-up TypeScript types

export type Role = 'customer' | 'agent' | 'admin'

export interface ErrorResponse {
    message: string;
}

export interface User {
    id: number
    name: string
    email: string
    role: Role
    created_at: string
}

export interface AuthRequest {
    email: string
    password: string
}

export interface AuthResponse {
    token: string
    user: User
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface CreateUserAdmin {
    name: string
    email: string
    password: string
    role: Role
}

export interface Status {
    id: number
    name: string
}

export interface Priority {
    id: number
    name: string
}

export interface Ticket {
    id: number
    subject: string
    description: string
    status_id?: number | null
    priority_id?: number | null
    status_name?: string | null
    priority_name?: string | null
    created_by: number
    assigned_to?: number | null
    created_at: string
    updated_at?: string | null
}

export interface TicketCreate {
    subject: string
    description: string
    status_id?: number
    priority_id?: number
    assigned_to?: number
}

export interface TicketUpdate {
    status_id?: number
    priority_id?: number
    assigned_to?: number
}

export interface Comment {
    id: number
    ticket_id: number
    author_id: number
    content: string
    author_name: string
    author_email: string
    created_at: string
}

export interface CommentCreate {
    content: string
}

export interface TicketFormValues {
    subject: string
    description: string
    priority_id: number;
}