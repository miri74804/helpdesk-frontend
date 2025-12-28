import { useForm } from "react-hook-form";
import { addUser } from "../../services/api";
import { useState } from "react";
import type { NewUserPayload } from "../../types";
import ErrorMessage from "../common/ErrorMessage";

interface AddUserModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

const AddUserModal = ({ onClose, onSuccess }: AddUserModalProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<NewUserPayload>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: NewUserPayload) => {
        setLoading(true);
        setError(null);
        try {
            await addUser(data);
            onSuccess();
        } catch (err:any) {
            const msg = err.response?.data?.message || "קרתה שגיאה בהוספת המשתמש";
            setError(msg);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>הוספת משתמש חדש</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input
                        type="text"
                        placeholder="שם מלא"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span className="error-text">שם הוא שדה חובה</span>}

                    <input
                        type="email"
                        placeholder="אימייל"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span className="error-text">אימייל חובה</span>}

                    <input
                        type="password"
                        placeholder="סיסמה"
                        {...register("password", { required: true, minLength: 6 })}
                    />
                    {errors.password && <span className="error-text">סיסמה חייבת להכיל 6 תווים לפחות</span>}

                    <select {...register("role")}>
                        <option value="customer">לקוח</option>
                        <option value="agent">סוכן</option>
                        <option value="admin">מנהל</option>
                    </select>

                    {error && <ErrorMessage error={error} />}

                    <div className="buttons">
                        <button type="button" onClick={onClose} className="cancel-btn">ביטול</button>
                        <button type="submit" disabled={loading}>
                            {loading ? "שומר..." : "שמור משתמש"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;