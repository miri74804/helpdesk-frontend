import { useContext, useReducer, createContext, useEffect, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import type { Ticket } from "../types";
import { getTickets } from "../services/api";

interface TicketsState {
    tickets: Ticket[];
    loading: boolean;
    error: string | null;
}

type TicketsAction =
    | { type: 'SET_TICKETS'; payload: Ticket[] }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'CLEAR_TICKETS' }

interface TicketsContextType extends TicketsState {
    fetchTickets: () => void;
}

const initialState: TicketsState = {
    tickets: [],
    loading: false,
    error: null,
};

const ticketsReducer = (state: TicketsState, action: TicketsAction): TicketsState => {
    switch (action.type) {
        case 'SET_TICKETS':
            return { ...state, tickets: action.payload, loading: false, error: null };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'CLEAR_TICKETS':
            return initialState;
        default:
            return state;
    }
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const useTickets = () => {
    const ctx = useContext(TicketsContext);
    if (!ctx) {
        throw new Error("useTickets must be used within a TicketsProvider");
    }
    return ctx;
};

export const TicketsProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(ticketsReducer, initialState);
    const { isAuthenticated } = useAuth();

    const fetchTickets = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await getTickets();
            dispatch({ type: 'SET_TICKETS', payload: response});
        } catch (err: any) {
            dispatch({ type: 'SET_ERROR', payload: err.response?.data?.message || 'שגיאה בטעינת הטיקטים' });
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchTickets();
        } else {
            dispatch({ type: 'CLEAR_TICKETS' });
        }
    }, [isAuthenticated]);

    return (
        <TicketsContext.Provider value={{ ...state, fetchTickets }}>
            {children}
        </TicketsContext.Provider>
    );
};