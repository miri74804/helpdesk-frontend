import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import { getUsers } from "../../services/api";
import Loading from "../common/Loading";
import type { User } from "../../types";
import { useTickets } from "../../context/TicketsContext";
import TicketList from "../tickets/TicketList";
import '../../styles/Dashboard.css'
import StatCard from "./StatCard";

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { tickets } = useTickets();

  const unassignedTickets = tickets.filter(t => t.assigned_to == 2);
  const urgentTickets = tickets.filter(t => t.priority_name?.toLowerCase() === 'high');
  const totalCustomers = users.filter(u => u.role.toLowerCase() === 'customer');
  const closedTickets = tickets.filter(t => t.status_name === 'closed');



  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await getUsers();

        setUsers(usersData);
      } catch (error) {
        console.error("שגיאה בטעינת נתוני דשבורד:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <Loading />;

  const isMainAdminPage = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main-content">
        {isMainAdminPage ? (
          <div className="admin-overview">
            <header className="admin-header">
              <h1 className="dashboard-title">לוח בקרה למנהל</h1>
              <p className="dashboard-subtitle">סקירה כללית של מצב המערכת</p>
            </header>

            <div className="stats-grid">
              <StatCard label="ממתינים לשיוך" number={unassignedTickets.length} icon="⚠️" variant="warning" />
              <StatCard label="דחופים לטיפול" number={urgentTickets.length} icon="🔥" variant={"primary"} />
              <StatCard label="סך הכל לקוחות" number={totalCustomers.length} icon="👥" variant="info" />
              <StatCard label="נסגרו" number={closedTickets.length} icon="✅" variant="success" />
            </div>

            <div className="admin-quick-actions">
              <h3>פעולות מהירות</h3>
              <div className="action-cards">
                <p>טיקטים קריטיים לטיפול: {tickets.filter(t => t.priority_name === 'high').length}</p>
                <div>
                     {urgentTickets.length == 0 ? <div>מעולה! אין פניות דחופות כרגע</div> : <TicketList tickets={urgentTickets.slice(0, 5)} />}
                  <TicketList tickets={tickets.filter(t => t.priority_name === 'high').slice(0, 5)} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;