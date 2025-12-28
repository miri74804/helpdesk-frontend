import type { Ticket } from "../../types";
import TicketItem from "./TicketItem";

interface TicketMainCardProps {
    ticket: Ticket;
}

const TicketMainCard = ({ ticket }: TicketMainCardProps) => {
    return (
        <>
            <TicketItem ticket={ticket} showDate={false} />

            <div className="ticket-description-section">
                <h3 className="section-label">תיאור הבעיה:</h3>
                <p className="ticket-description">{ticket.description}</p>
            </div>

            <div className="ticket-meta">
                <div className="meta-item">
                    <span className="meta-icon">📅</span>
                    <span className="meta-label">נוצר בתאריך:</span>
                    <span className="meta-value">{new Date(ticket.created_at).toLocaleDateString('he-IL')}</span>
                </div>
                {ticket.updated_at && (
                    <div className="meta-item">
                        <span className="meta-icon">🔄</span>
                        <span className="meta-label">עודכן לאחרונה:</span>
                        <span className="meta-value">{new Date(ticket.updated_at).toLocaleDateString('he-IL')}</span>
                    </div>
                )}
            </div>
        </>
    );
}

export default TicketMainCard;
