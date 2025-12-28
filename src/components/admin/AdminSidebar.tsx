import { NavLink } from "react-router-dom";
import "../../styles/AdminSidebar.css";


const AdminSidebar = () => {
    return (
       <aside className="admin-sidebar">
            <div className="sidebar-header">
                <h3>ניהול מערכת</h3>
            </div>
            <nav className="sidebar-nav">
                <NavLink to="" end>📊 סקירה כללית</NavLink>
                <NavLink to="users">👥 ניהול משתמשים</NavLink>
                <NavLink to="settings">⚙️ הגדרות</NavLink>
            </nav>
        </aside>
    );
}

export default AdminSidebar;





