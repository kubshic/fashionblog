import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Main.css';

const Main = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        }
    }, []);

    return (
        <div className="main-container">
            <h1 className="main-heading">패션 아카이브</h1>
            <Link to="/create" className="create-link">
                새 글 작성하기
            </Link>
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index} className="post-container">
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-content">{post.content}</p>
                        <div className="image-container">
                            {post.images.map((image, idx) => (
                                <img key={idx} src={image} alt={`img-${idx}`} className="post-image" />
                            ))}
                        </div>
                        <Link to={`/detail/${index}`} className="detail-link">
                            상세 보기
                        </Link>
                    </div>
                ))
            ) : (
                <p className="no-posts">게시글이 없습니다.</p>
            )}
        </div>
    );
};

export default Main;
