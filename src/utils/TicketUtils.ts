export const getStatusClass = (statusName: string | null | undefined): string => {
    if (!statusName) return 'status-default';
    const lower = statusName.toLowerCase().replace('_', ' ');
    if (lower === 'open' || lower === 'new') return 'status-open';
    if (lower === 'in progress') return 'status-progress';
    if (lower === 'closed' || lower === 'resolved') return 'status-closed';
    return 'status-default';
};

export const getPriorityClass = (priorityName: string | null | undefined): string => {
    if (!priorityName) return '';
    const lower = priorityName.toLowerCase();
    if (lower === 'high') return 'priority-high';
    if (lower === 'medium') return 'priority-medium';
    if (lower === 'low') return 'priority-low';
    return '';
};