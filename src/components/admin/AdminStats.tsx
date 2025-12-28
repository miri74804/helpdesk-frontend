import type { Ticket, User } from "../../types";
import StatCard from "../dashboard/StatCard";

interface AdminStatsProps {
    users: User[];
    tickets: Ticket[];
}

const AdminStats = ({ users, tickets }: AdminStatsProps) => {

    const unassignedTickets = tickets.filter(t => t.assigned_to == 2|| t.assigned_to === null).length;
    const urgentTickets = tickets.filter(t => t.priority_name?.toLowerCase() === 'high').length;
    const totalCustomers = users.filter(u => u.role.toLowerCase() === 'customer').length;

    return (
        <div className="admin-stats-grid">
            <StatCard 
                label="ממתינים לשיוך" 
                number={unassignedTickets} 
                icon="⚠️" 
                variant="warning" 
            />
            <StatCard 
                label="דחופים לטיפול"
                number={urgentTickets}
                icon="🔥" 
                variant={"primary"} />
            <StatCard 
                label="סך הכל לקוחות" 
                number={totalCustomers} 
                icon="👥" 
                variant="info" 
            />
        </div>
    );
};

export default AdminStats