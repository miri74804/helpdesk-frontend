import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Tickets.css";
import TicketList from "../components/tickets/TicketList";
import { useNavigate } from "react-router-dom";
import { useTickets } from "../context/TicketsContext";

const Tickets = () => {

    const { tickets, loading, error } = useTickets()
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");

    const { user } = useAuth();
    const navigate = useNavigate();

    const filteredTickets = tickets.filter(ticket => {
        let hasAccess = false;
        if (user?.role === 'admin') hasAccess = true;
        else if (user?.role === 'agent') hasAccess = ticket.assigned_to === user.id;
        else if (user?.role === 'customer') hasAccess = ticket.created_by === user.id;

        if (!hasAccess) return false;

        const statusMatch = statusFilter === "all" || ticket.status_name?.toLocaleLowerCase() === statusFilter;
        const priorityMatch = priorityFilter === "all" || ticket.priority_name?.toLocaleLowerCase() === priorityFilter;

        return statusMatch && priorityMatch;
    });

    return (
        <div className="tickets-page">
            <div className="tickets-container">
                <div className="tickets-header">
                    {user?.role === 'admin' ? (
                        <h1 className="tickets-title">ניהול מערכת פניות</h1>
                    ) : user?.role === 'agent' ? (
                        <h1 className="tickets-title">הפניות בטיפולי</h1>
                    ) : (
                        <h1 className="tickets-title">הפניות שלי</h1>
                    )}
                    {user?.role === 'admin' ? (
                        <p className="tickets-subtitle">ניהול וצפייה בכל הפניות בארגון</p>
                    ) : user?.role === 'agent' ? (
                        <p className="tickets-subtitle">ניהול פניות שהוקצו לטיפולי</p>
                    ) : (
                        <p className="tickets-subtitle">כל הפניות שלך במקום אחד</p>
                    )}

                    <div className="tickets-filters">
                        <select name="status" id="status" className="filter-group" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="all">כל הסטטוסים</option>
                            <option value="open">פתוח</option>
                            <option value="in_progress">בטיפול</option>
                            <option value="closed">סגור</option>
                        </select>

                        <select name="priority" id="priority" className="filter-group" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
                            <option value="all">כל העדיפויות</option>
                            <option value="low">נמוך</option>
                            <option value="medium">בינוני</option>
                            <option value="high">גבוה</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="tickets-loading">
                        <div className="spinner"></div>
                    </div>
                ) : error ? (
                    <div className="tickets-empty">
                        <div className="tickets-empty-icon">⚠️</div>
                        <p className="tickets-empty-text">{error}</p>
                    </div>
                ) : filteredTickets.length === 0 ?
                    statusFilter !== "all" || priorityFilter !== "all" ? (
                        <div className="tickets-empty">
                            <div className="tickets-empty-icon">🔍</div>
                            <p className="tickets-empty-text">לא נמצאו טיקטים תואמים</p>
                            <p className="tickets-subtitle">נסה לשנות את מסנני החיפוש</p>
                        </div>
                    ) : (
                        <div className="tickets-empty">
                            <div className="tickets-empty-icon">📭</div>
                            <p className="tickets-empty-text">אין לך טיקטים עדיין</p>
                            <p className="tickets-subtitle">התחל בפתיחת טיקט חדש</p>
                        </div>
                    ) : (
                        <TicketList tickets={filteredTickets} />
                    )}

                {user?.role === 'customer' && (
                    <div className="tickets-actions">
                        <button className="add-ticket-btn" onClick={() => navigate('/tickets/new')}>
                            + פתיחת פנייה חדשה
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Tickets;