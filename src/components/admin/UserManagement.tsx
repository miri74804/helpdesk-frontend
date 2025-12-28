import { useEffect, useState } from "react";
import type { User } from "../../types";
import { getUsers } from "../../services/api";
import Loading from "../common/Loading";
import UserTable from "./UserTable";
import AddUserModal from "./AddUserModal";
import "../../styles/UserManagement.css";
import Swal from "sweetalert2";

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

    const handleSuccess = () => {
        fetchData();
        setIsModalOpen(false);
        
        Swal.fire({
            icon: "success",
            title: "המשתמש נוסף בהצלחה!",
            showConfirmButton: false,
            timer: 2000
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="user-management-page">
            <div className="user-management-container">
                <div className="user-management-header">
                    <h2 className="user-management-title">ניהול משתמשים</h2>
                    <button className="add-user-btn" onClick={() => setIsModalOpen(true)}>
                        + הוסף משתמש
                    </button>
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <div className="users-table-container">
                        <UserTable users={users} />
                    </div>
                )}

                {isModalOpen && (
                    <AddUserModal
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={handleSuccess}
                    />
                )}
            </div>
        </div>
    );
}

export default UserManagement;