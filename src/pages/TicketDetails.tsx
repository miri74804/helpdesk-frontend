import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Ticket, Comment, Status, Priority, User } from "../types";
import "../styles/TicketDetails.css";
import CommentList from "../components/comments/CommentList";
import CommentForm from "../components/comments/CommentForm";
import TicketMainCard from "../components/tickets/TicketMainCard";
import { getPriorities, getStatuses, getTicketId, getTicketIdComments, getUsers } from "../services/api";
import TicketManagementPanel from "../components/tickets/TicketManagementPanel";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/common/Loading";

const TicketDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [priorities, setPriorities] = useState<Priority[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const { user } = useAuth();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [ticketRes, commentsRes, statusesData, prioritiesData] = await Promise.all([
                getTicketId(Number(id)),
                getTicketIdComments(Number(id)),
                getStatuses(),
                getPriorities(),
                
            ]);

            setTicket(ticketRes);
            setComments(commentsRes);
            setStatuses(statusesData);
            setPriorities(prioritiesData);

            if (user?.role === 'admin') {
                try {
                    const usersData = await getUsers();
                    setUsers(usersData);
                } catch (err) {
                    console.error("אדמין, אבל נכשל בטעינת משתמשים:", err);
                }
            }

        } catch (error) {
            console.error("Error fetching ticket data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

   {loading && <Loading/>}

    if (!ticket) {
        return (
            <div className="ticket-details-page">
                <div className="ticket-details-error">
                    <div className="error-icon">⚠️</div>
                    <h2>טיקט לא נמצא</h2>
                    <p>לא הצלחנו למצוא את הטיקט שחיפשת</p>
                    <button className="back-btn" onClick={() => navigate('/tickets')}>
                        חזרה לרשימת הטיקטים
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="ticket-details-page">
            <div className="ticket-details-container">
                <button className="back-btn-small" onClick={() => navigate('/tickets')}>
                    ← חזרה
                </button>

                <div className="ticket-details-header">
                    <h1 className="ticket-details-title">פרטי פנייה #{id}</h1>
                </div>

                {user?.role !== 'customer' && (
                    <TicketManagementPanel
                        ticket={ticket}
                        statuses={statuses}
                        priorities={priorities}
                        users={users}
                        onUpdate={(updatedTicket) => setTicket(updatedTicket)}
                    />
                )}

                <TicketMainCard ticket={ticket} />

                <div className="comments-section">
                    <div className="comments-header">
                        <h3 className="comments-title">
                            💬 תגובות ({comments.length})
                        </h3>
                    </div>

                    <CommentList comments={comments} ticketAuthorId={ticket.created_by} />

                    <CommentForm ticketId={id!} onCommentAdded={(newComment) => setComments([...comments, newComment])} />
                </div>
            </div>
        </div>
    );
};

export default TicketDetails;