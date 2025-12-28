interface StatCardProps {
    label: string;
    number: number;
    icon: string;
    variant: 'primary' | 'info' | 'warning' | 'success';
}

const StatCard= ({ label, number, icon, variant }: StatCardProps) => {
    return (
        <div className={`stat-card stat-card-${variant}`}>
            <div className="stat-icon">{icon}</div>
            <div className="stat-content">
                <div className="stat-number">{number}</div>
                <div className="stat-label">{label}</div>
            </div>
        </div>
    );
}
 
export default StatCard;