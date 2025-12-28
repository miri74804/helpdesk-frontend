import { useEffect, useState } from "react";
import type { User } from "../../types";
import { getUsers } from "../../services/api";
import Loading from "../common/Loading";

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const userData = await getUsers();
            setUsers(userData);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchData(); 
    }, []);

    return (
        <div className="user-management-page">
            <header className="admin-header">
                <h2>ניהול משתמשים</h2>
                <button className="add-btn">+ הוסף משתמש</button>
            </header>

            {loading ? (
                <Loading />
            ) : users.length === 0 ? (
                <p className="no-data">לא נמצאו משתמשים במערכת</p>
            ) : (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>שם</th>
                            <th>אימייל</th>
                            <th>תפקיד</th>
                            <th>נוצר ב</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{new Date(user.created_at).toLocaleDateString('he-IL')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UserManagement;