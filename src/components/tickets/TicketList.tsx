import { Link } from "react-router-dom";
import type { Ticket } from "../../types";
import TicketItem from "./TicketItem";

interface TicketListProps {
    tickets: Ticket[];
}

const TicketList = ({ tickets}: TicketListProps) => {
    return(
    <div className="tickets-list">
        {tickets.map(ticket => (
            <Link key={ticket.id} to={`/tickets/${ticket.id}`}>
                <TicketItem ticket={ticket} />
            </Link>
        ))}
    </div>
    )
}


export default TicketList;