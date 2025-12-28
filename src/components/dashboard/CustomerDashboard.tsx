import { useTickets } from "../../context/TicketsContext";
import { Link } from "react-router-dom";
import TicketList from "../tickets/TicketList";
import "../../styles/Dashboard.css";
import StatCard from "./StatCard";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

const CustomerDashboard = () => {
    const { tickets, loading, error } = useTickets();

    const openTickets = tickets.filter(t => t.status_name === 'open');
    const inProgressTickets = tickets.filter(t => t.status_name === 'in_progress');
    const closedTickets = tickets.filter(t => t.status_name === 'closed');

    { loading && <Loading /> }

    { error && <ErrorMessage error={error} /> }


    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">לוח הבקרה שלי</h1>
                    <p className="dashboard-subtitle">סקירה כללית של הפניות שלך</p>
                </div>

                <div className="stats-grid">

                    <StatCard label="סך הכל פניות" number={tickets.length} icon="📊" variant="primary" />
                    <StatCard label="פניות פתוחות" number={openTickets.length} icon="📂" variant="info" />
                    <StatCard label="פניות בטיפול" number={inProgressTickets.length} icon="⏳" variant="warning" />
                    <StatCard label="נסגרו" number={closedTickets.length} icon="✅" variant="success" />

                </div>

                <div className="dashboard-section">
                    <div className="section-header">
                        <h2 className="section-title">הפניות האחרונות שלך</h2>
                    </div>
                    <TicketList tickets={tickets.slice(0, 3)} />
                    <Link to="/tickets" className="view-all-link">
                        צפה בכל הפניות ←
                    </Link>
                </div>

                <div className="dashboard-actions">
                    <Link to="/tickets/new" className="create-ticket-btn">
                        + פתח פנייה חדשה
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;