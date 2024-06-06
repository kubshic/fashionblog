import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/Detail.css';

const Detail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const navigate = useNavigate();
    const imageRefs = useRef([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const selectedPost = storedPosts.find((post, index) => index.toString() === id);
        if (selectedPost) {
            setPost(selectedPost);
            setComments(selectedPost.comments || []);
        } else {
            navigate('/'); // 해당 포스트가 없으면 메인 페이지로 이동
        }
    }, [id, navigate]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = () => {
        if (comment.trim() !== '') {
            const newComment = {
                id: comments.length,
                content: comment,
            };
            const updatedComments = [...comments, newComment];
            const updatedPosts = JSON.parse(localStorage.getItem('posts')).map((p, index) => {
                if (index.toString() === id) {
                    return { ...p, comments: updatedComments };
                }
                return p;
            });
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            setComments(updatedComments);
            setComment('');
        }
    };

    const handleDeleteComment = (commentId) => {
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        const updatedPosts = JSON.parse(localStorage.getItem('posts')).map((p, index) => {
            if (index.toString() === id) {
                return { ...p, comments: updatedComments };
            }
            return p;
        });
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setComments(updatedComments);
    };

    const handleImageClick = (index, imageUrl) => {
        setSelectedImageIndex(index);
    };

    const handleHrefChange = (newHref) => {
        const updatedImages = [...post.images];
        updatedImages[selectedImageIndex] = newHref;
        const updatedPosts = JSON.parse(localStorage.getItem('posts')).map((p, index) => {
            if (index.toString() === id) {
                return { ...p, images: updatedImages };
            }
            return p;
        });
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setPost({ ...post, images: updatedImages });
    };

    const handleDeletePost = () => {
        const updatedPosts = JSON.parse(localStorage.getItem('posts')).filter((post, index) => index.toString() !== id);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        navigate('/');
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="detail-container">
            <h1 className="detail-heading">{post.title}</h1>
            <p className="detail-content">{post.content}</p>
            <div className="image-container">
                {post.images.map((imageUrl, index) => (
                    <a
                        key={index}
                        href={imageUrl}
                        onClick={() => handleImageClick(index, imageUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img className="detail-image" src={imageUrl} alt={`Image ${index + 1}`} />
                    </a>
                ))}
            </div>
            <h2 className="comment-heading">댓글</h2>
            <ul className="comment-list">
                {comments.map((comment) => (
                    <li key={comment.id} className="comment-item">
                        <p className="comment-content">{comment.content}</p>
                        <button className="delete-comment-btn" onClick={() => handleDeleteComment(comment.id)}>
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
            <textarea
                className="add-comment-input"
                value={comment}
                onChange={handleCommentChange}
                placeholder="댓글을 입력하세요"
            />
            <button className="add-comment-btn" onClick={handleAddComment}>
                댓글 추가
            </button>
            <button className="delete-post-btn" onClick={handleDeletePost}>
                글 삭제
            </button>
            <Link className="return-btn" to="/">
                메인으로 돌아가기
            </Link>
            {selectedImageIndex !== null && (
                <div>
                    <input
                        type="text"
                        placeholder="새로운 링크 주소 입력"
                        onChange={(e) => handleHrefChange(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
};

export default Detail;
