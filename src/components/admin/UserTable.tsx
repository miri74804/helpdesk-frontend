import type { User } from "../../types";

interface UserTableProps {
    users:User[];
}

const UserTable = ({ users }: UserTableProps) => {
    return (
        users.length === 0 ? <p className="no-data">לא נמצאו משתמשים במערכת</p> :
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
    );
};

export default UserTable;