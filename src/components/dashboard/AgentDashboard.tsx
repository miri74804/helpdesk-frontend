import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTickets } from "../../context/TicketsContext";
import TicketList from "../tickets/TicketList";
import StatCard from "./StatCard";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

const AgentDashboard = () => {

  const { tickets, loading, error } = useTickets();
  const { user } = useAuth();

  const unassignedTickets = tickets.filter(t => t.assigned_to === 2);//ברירת המחדל
  const myTickets = tickets.filter(t => t.assigned_to === user?.id);
  const openTickets = myTickets.filter(t => t.status_name === 'open');
  const closedTickets = myTickets.filter(t => t.status_name === 'closed');
  const highPriorityTickets = myTickets.filter(t => t.priority_name === 'high');

  {loading && <Loading/>}

  {error && <ErrorMessage error={error}/>}

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">לוח הבקרה שלי</h1>
          <p className="dashboard-subtitle">סקירת עבודה יומית</p>
        </div>

        <div className="stats-grid">
          <StatCard label="ממתינים לשיוך" number={unassignedTickets.length} icon="🆕" variant="primary" />
          <StatCard label="הפניות שלי" number={openTickets.length} icon="📂" variant="info" />
          <StatCard label="דחוף לטיפול" number={highPriorityTickets.length} icon="🔥" variant="warning" />
          <StatCard label="נסגרו" number={closedTickets.length} icon="✅" variant="success" />
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">הפניות האחרונות שלך</h2>
          </div>
          {highPriorityTickets.length == 0 ? <div>מעולה! אין פניות דחופות כרגע</div> : <TicketList tickets={highPriorityTickets.slice(0, 5)} />}
          <Link to="/tickets" className="view-all-link">
            צפה בכל הפניות ←
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AgentDashboard;
