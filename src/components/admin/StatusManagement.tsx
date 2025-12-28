import { useState, useEffect } from "react";
import { getStatuses, getPriorities, deleteStatus, deletePriority, addStatus, addPriority } from "../../services/api"; 
import Loading from "../common/Loading";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../../styles/Dashboard.css'

const StatusManagement = () => {
    const [statuses, setStatuses] = useState<any[]>([]);
    const [priorities, setPriorities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showStatusInput, setShowStatusInput] = useState(false);
    const [showPriorityInput, setShowPriorityInput] = useState(false);
    const [newStatusName, setNewStatusName] = useState("");
    const [newPriorityName, setNewPriorityName] = useState("");

    const loadData = async () => {
        try {
            const [sData, pData] = await Promise.all([getStatuses(), getPriorities()]);
            setStatuses(sData);
            setPriorities(pData);
        } catch (error) {
            console.error("Error loading settings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleDeleteStatus = async (id: number) => {
        const result = await Swal.fire({
            title: 'האם למחוק סטטוס זה?',
            text: "פעולה זו אינה ניתנת לביטול",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'כן, מחק',
            cancelButtonText: 'ביטול',
            reverseButtons: true
        });
        
        if (!result.isConfirmed) return;
        
        try {
            await deleteStatus(id);
            await loadData();
            Swal.fire({
                icon: 'success',
                title: 'נמחק בהצלחה!',
                confirmButtonColor: '#7c3aed',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'שגיאה',
                text: 'לא ניתן למחוק את הסטטוס. ייתכן שהוא משויך לטיקטים קיימים.',
                confirmButtonColor: '#7c3aed'
            });
        }
    };

    const handleDeletePriority = async (id: number) => {
        const result = await Swal.fire({
            title: 'האם למחוק עדיפות זו?',
            text: "פעולה זו אינה ניתנת לביטול",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'כן, מחק',
            cancelButtonText: 'ביטול',
            reverseButtons: true
        });
        
        if (!result.isConfirmed) return;
        
        try {
            await deletePriority(id);
            await loadData();
            Swal.fire({
                icon: 'success',
                title: 'נמחק בהצלחה!',
                confirmButtonColor: '#7c3aed',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'שגיאה',
                text: 'לא ניתן למחוק את העדיפות.',
                confirmButtonColor: '#7c3aed'
            });
        }
    };

    const handleSaveStatus = async () => {
        if (!newStatusName.trim()) return;
        try {
            await addStatus(newStatusName);
            setNewStatusName(""); 
            setShowStatusInput(false); 
            await loadData();
            Swal.fire({
                icon: 'success',
                title: 'נוסף בהצלחה!',
                confirmButtonColor: '#7c3aed',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'שגיאה',
                text: 'שגיאה בהוספת סטטוס',
                confirmButtonColor: '#7c3aed'
            });
        }
    };

    const handleSavePriority = async () => {
        if (!newPriorityName.trim()) return;
        try {
            await addPriority(newPriorityName);
            setNewPriorityName("");
            setShowPriorityInput(false);
            await loadData();
            Swal.fire({
                icon: 'success',
                title: 'נוסף בהצלחה!',
                confirmButtonColor: '#7c3aed',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'שגיאה',
                text: 'שגיאה בהוספת עדיפות',
                confirmButtonColor: '#7c3aed'
            });
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="settings-container">
            <header className="settings-header">
                <h2>הגדרות מערכת</h2>
                <p>ניהול פרמטרים גלובליים לטיקטים</p>
            </header>

            <div className="settings-grid">
                <section className="settings-section">
                    <h3>סטטוסים קיימים</h3>
                    <table className="admin-table">
                        <tbody>
                            {statuses.map((status) => (
                                <tr key={status.id}>
                                    <td><span className={`status-badge ${status.name.toLowerCase()}`}>{status.name}</span></td>
                                    <td>
                                        <button className="btn-icon" onClick={() => handleDeleteStatus(status.id)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {showStatusInput ? (
                        <div className="add-input-group">
                            <input 
                                type="text" 
                                value={newStatusName}
                                onChange={(e) => setNewStatusName(e.target.value)}
                                placeholder="שם הסטטוס..."
                                autoFocus
                            />
                            <button onClick={handleSaveStatus} className="btn-save">שמור</button>
                            <button onClick={() => setShowStatusInput(false)} className="btn-cancel">ביטול</button>
                        </div>
                    ) : (
                        <button className="btn-secondary" onClick={() => setShowStatusInput(true)}>+ הוסף סטטוס</button>
                    )}
                </section>

                <section className="settings-section">
                    <h3>רמות עדיפות</h3>
                    <table className="admin-table">
                        <tbody>
                            {priorities.map((p) => (
                                <tr key={p.id}>
                                    <td><span className={`priority-tag ${p.name.toLowerCase()}`}>{p.name}</span></td>
                                    <td>
                                        <button className="btn-icon" onClick={() => handleDeletePriority(p.id)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {showPriorityInput ? (
                        <div className="add-input-group">
                            <input 
                                type="text" 
                                value={newPriorityName}
                                onChange={(e) => setNewPriorityName(e.target.value)}
                                placeholder="שם העדיפות..."
                                autoFocus
                            />
                            <button onClick={handleSavePriority} className="btn-save">שמור</button>
                            <button onClick={() => setShowPriorityInput(false)} className="btn-cancel">ביטול</button>
                        </div>
                    ) : (
                        <button className="btn-secondary" onClick={() => setShowPriorityInput(true)}>+ הוסף עדיפות</button>
                    )}
                </section>
            </div>
        </div>
    );
};

export default StatusManagement;