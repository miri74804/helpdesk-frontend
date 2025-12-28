import { useNavigate } from "react-router-dom";
import type { TicketFormValues } from "../types";
import api from "../services/axiosInstance";
import TicketForm from "../components/tickets/TicketForm";
import Swal from "sweetalert2";
import "../styles/NewTicket.css";
import { useState } from "react";
import { useTickets } from "../context/TicketsContext";

const NewTicket = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { fetchTickets } = useTickets();

    const navigate = useNavigate();

    const handleFormSubmit = async (data: TicketFormValues) => {
        setIsSubmitting(true);
        try {
            const ticketData = {
                ...data,
                priority_id: 1
            };

            const response = await api.post('/tickets', ticketData);

            if (response.status === 201) {
                await fetchTickets();

                await Swal.fire({
                    icon: "success",
                    title: "!הטיקט נוצר בהצלחה",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/tickets");
            }
        } catch (error) {
            console.error("Failed to create ticket:", error);
            Swal.fire({
                icon: "error",
                title: "אופס, משהו השתבש ביצירת הטיקט. נסי שוב.",
                showConfirmButton: true
            });
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="new-ticket-container">
            <div className="new-ticket-header">
                <h1 className="new-ticket-title">פתיחת פנייה חדשה</h1>
                <p className="new-ticket-subtitle">אנא מלאי את פרטי התקלה ונחזור אלייך בהקדם.</p>
            </div>

            <TicketForm onSubmit={handleFormSubmit} isLoading={isSubmitting} />

        </div>
    );
}

export default NewTicket;
