import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminStats from "../admin/AdminStats";
import { getUsers } from "../../services/api";
import Loading from "../common/Loading";
import type { User } from "../../types";
import { useTickets } from "../../context/TicketsContext";
import TicketList from "../tickets/TicketList";
import '../../styles/Dashboard.css'

const AdminDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    
    const location = useLocation();
    const {tickets} = useTickets();



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
                            <h1>לוח בקרה למנהל</h1>
                            <p>סקירה כללית של מצב המערכת</p>
                        </header>
                        
                        <AdminStats users={users} tickets={tickets} />
                        
                        <div className="admin-quick-actions">
                            <h3>פעולות מהירות</h3>
                            <div className="action-cards">
                                <p>טיקטים קריטיים לטיפול: {tickets.filter(t => t.priority_name === 'high').length}</p>
                                <div>
                                   <TicketList tickets={tickets.filter(t => t.priority_name === 'high').slice(0, 5)}/>
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