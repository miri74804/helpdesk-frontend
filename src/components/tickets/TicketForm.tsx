import { useForm } from "react-hook-form";
import type { TicketFormValues } from "../../types";
import "../../styles/TicketForm.css";
import { useNavigate } from "react-router-dom";

interface TicketFormProps {
    onSubmit: (data: TicketFormValues) => void;
    isLoading?: boolean;
}

const TicketForm = ({ onSubmit, isLoading }: TicketFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<TicketFormValues>();
    const navigate = useNavigate();

    return (
        <form className="ticket-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="subject">נושא</label>
                <input 
                    id="subject" 
                    className={errors.subject ? "error" : ""} 
                    {...register("subject", { required: "נושא הוא שדה חובה" })} 
                />
                {errors.subject && <span className="error-msg">{errors.subject.message}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="description">תיאור</label>
                <textarea 
                    id="description" 
                    className={errors.description ? "error" : ""}
                    {...register("description", { required: "תיאור הוא שדה חובה" })} 
                />
                {errors.description && <span className="error-msg">{errors.description.message}</span>}
            </div>

            <div className="form-buttons">
                <button 
                    type="submit" 
                    className={`submit-btn ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? "שולח..." : "שליחת הפנייה"}
                </button>
                <button 
                    type="button" 
                    className="cancel-btn" 
                    onClick={() => navigate("/tickets")}
                    disabled={isLoading}
                >
                    ביטול וחזרה
                </button>
            </div>
        </form>
    );
}

export default TicketForm;