import AdminDashboard from "../components/dashboard/AdminDashboard";
import AgentDashboard from "../components/dashboard/AgentDashboard";
import CustomerDashboard from "../components/dashboard/CustomerDashboard";

const Dashboard = () => {
const user  = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

    return (
        <div>
            {user?.role === 'admin' && <AdminDashboard />}
            {user?.role === 'agent' && <AgentDashboard />}
            {user?.role === 'customer' && <CustomerDashboard />}
        </div>
    );
}

export default Dashboard;