import { useContext, useReducer, createContext, type ReactNode } from "react";
import type { AuthResponse, User } from "../types";

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
}

type AuthAction =
    | { type: 'LOGIN'; payload: AuthResponse }
    | { type: 'LOGOUT' }
    | { type: 'SET_LOADING'; payload: boolean }

interface AuthContextType extends AuthState {
    login: (data: AuthResponse) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

const initialAuthState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
            };
        case 'LOGOUT':
            return initialAuthState;
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    const login = (data: AuthResponse) => {
        dispatch({ type: 'LOGIN', payload: data });
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const setLoading = (loading: boolean) => {
        dispatch({ type: 'SET_LOADING', payload: loading });
    };


    return (
        <AuthContext.Provider value={{ ...state, login, logout, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};