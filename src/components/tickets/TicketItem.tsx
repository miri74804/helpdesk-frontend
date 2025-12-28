import type { Ticket } from "../../types";
import { getStatusClass, getPriorityClass } from '../../utils/TicketUtils';
import "../../styles/TicketItem.css";

interface TicketItemProps {
    ticket: Ticket;
    showDate?: boolean;
}

const TicketItem = ({ ticket, showDate=true }: TicketItemProps) => {

    return (
        <div className="ticket-main-card">
            <div className="ticket-header-section">
                <h2 className="ticket-subject">{ticket.subject}</h2>
                <div className="ticket-badges">
                    <span className={`badge badge-status ${getStatusClass(ticket.status_name)}`}>
                        {`סטטוס: ${ticket.status_name}`}
                    </span>
                    {ticket.priority_name && (
                        <span className={`badge badge-priority ${getPriorityClass(ticket.priority_name)}`}>
                            {`עדיפות: ${ticket.priority_name}`}
                        </span>
                    )}
                </div>
            </div>
            {showDate && <p className="ti-date">נוצר בתאריך: {new Date(ticket.created_at).toLocaleDateString('he-IL')}</p>}
        </div>
    );
}

export default TicketItem;