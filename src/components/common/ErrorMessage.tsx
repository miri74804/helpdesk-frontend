import '../../styles/Status.css';

interface ErrorMessageProps {
    error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
    return (
        <div className="page-error-container">
            <div className="page-error">
                {error}
            </div>
        </div>
    );
}

export default ErrorMessage;