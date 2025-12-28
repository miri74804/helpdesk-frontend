import React, { useState } from "react";
import type { Priority, Status, Ticket, User } from "../../types";
import { updateTicket } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "../../styles/TicketManagementPanel.css"; 
import { useTickets } from "../../context/TicketsContext";

interface TicketManagementPanelProps {
    ticket: Ticket;
    statuses: Status[];
    priorities: Priority[];
    users: User[];
    onUpdate: (updatedTicket: Ticket) => void;
}

const TicketManagementPanel = ({ ticket, statuses, priorities, users, onUpdate }: TicketManagementPanelProps) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        status_id: ticket.status_id || 0,
        priority_id: ticket.priority_id || 0,
        assigned_to: ticket.assigned_to || 2,
    });

    const { user } = useAuth();
    const { fetchTickets } = useTickets();

    const handleEditClick = () => {
        setIsEditing(true);
        setFormData({
            status_id: ticket.status_id || 0,
            priority_id: ticket.priority_id || 0,
            assigned_to: ticket.assigned_to || 2,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await updateTicket(ticket.id, {
                status_id: formData.status_id,
                priority_id: formData.priority_id,
                assigned_to: formData.assigned_to
            });

            await fetchTickets();
            onUpdate(result);
            setIsEditing(false);
        } catch (error) {
            console.error("שגיאה בעדכון הטיקט:", error);
        }
    };

    return (
        <div className="ticket-management-panel">
            {!isEditing ? (
                <div>
                    <p><span>מזהה יוצר:</span> {ticket.created_by}</p>
                    <button onClick={handleEditClick}>ניהול פנייה</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="panel-edit-form">
                    <div className="form-group">
                        <label>סטטוס:</label>
                        <select
                            value={String(formData.status_id)}
                            onChange={(e) => setFormData({ ...formData, status_id: Number(e.target.value) })}
                        >
                            {statuses.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>עדיפות:</label>
                        <select
                            value={String(formData.priority_id)}
                            onChange={(e) => setFormData({ ...formData, priority_id: Number(e.target.value) })}
                        >
                            {priorities.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    {user?.role === 'admin' && (
                        <div className="form-group">
                            <label>שיוך לנציג:</label>
                            <select
                                value={String(formData.assigned_to)}
                                onChange={(e) => setFormData({ ...formData, assigned_to: Number(e.target.value) })}
                            >
                                {users.filter(u => u.role === 'agent').map((u) => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                        </div>)}

                    <div className="form-actions">
                        <button type="submit">שמור שינויים</button>
                        <button type="button" onClick={() => setIsEditing(false)}>ביטול</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default TicketManagementPanel;