import type { Comment } from "../../types";

interface CommentListProps {
    comments: Comment[];
    ticketAuthorId: number;
}

const CommentList = ({ comments, ticketAuthorId }: CommentListProps) => {
    return (
        <>
            {comments.length > 0 ? (
                <div className="comments-list">
                    {comments.map((comment, index) => {
                        const isCustomer = comment.author_id === ticketAuthorId;
                        return (
                            <div className={`comment-item ${isCustomer ? 'comment-customer' : 'comment-agent'}`}>
                                <div className="comment-avatar">
                                    {index + 1}
                                </div>
                                <div className="comment-content">
                                    <p className="comment-text">{comment.content}</p>
                                    <div className="comment-meta">
                                        <span className="comment-author">{comment.author_name}</span>
                                        <span className="comment-date">
                                            {new Date(comment.created_at).toLocaleString('he-IL')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="no-comments">
                    <div className="no-comments-icon">💭</div>
                    <p>אין תגובות בטיקט זה עדיין</p>
                </div>
            )}
        </>
    );
}

export default CommentList;