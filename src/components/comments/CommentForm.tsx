import { useState } from "react";
import api from "../../services/axiosInstance";
import type { Comment } from "../../types";

interface CommentFormProps {
    ticketId: string;
    onCommentAdded: (newComment: Comment) => void;
}

const CommentForm = ({ ticketId, onCommentAdded }: CommentFormProps) => {

    const [newCommentContent, setNewCommentContent] = useState("");
    const [submittingComment, setSubmittingComment] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentContent.trim()) return;

        setSubmittingComment(true);
        try {
            const response = await api.post(`/tickets/${ticketId}/comments`, { content: newCommentContent })
            const newCommentFromServer = {
                ...response.data,
                created_at: response.data.created_at || new Date().toISOString()
            };
            onCommentAdded(newCommentFromServer);
            setNewCommentContent("");
            setIsFormVisible(false);
        } catch (error) {
            console.error("Error adding comment:", error);
        } finally {
            setSubmittingComment(false);
        }
    };

    const handleCancelComment = () => {
        setNewCommentContent("");
        setIsFormVisible(false);
    };

    return (
        <div className="add-comment-section">
            {isFormVisible ? (
                <form onSubmit={handleAddComment}>
                    <textarea
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                        placeholder="כתוב את התגובה שלך כאן..."
                    />
                    <div className="form-actions">
                        <button
                            className="add-comment-submit"
                            disabled={submittingComment}
                            type="submit">
                            {submittingComment ? "שולח..." : "שלח"}
                        </button>
                        <button
                            type="button"
                            className="add-comment-cancel"
                            onClick={handleCancelComment}>
                            ביטול
                        </button>
                    </div>
                </form>
            ) : (
                <button className="add-comment-title" onClick={() => setIsFormVisible(true)}>הוסף תגובה חדשה</button>
            )}
        </div>
    );
}

export default CommentForm;