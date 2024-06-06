import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Create.css';

const Create = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFiles, setImageFiles] = useState([null, null, null]);
    const navigate = useNavigate();

    const handleImageChange = (index, e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const newImageFiles = [...imageFiles];
            newImageFiles[index] = files[0];
            setImageFiles(newImageFiles);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const imageUrls = [];
        for (let i = 0; i < imageFiles.length; i++) {
            if (imageFiles[i]) {
                // 이미지 파일을 읽어서 Base64 형태로 변환
                const reader = new FileReader();
                reader.readAsDataURL(imageFiles[i]);
                reader.onload = () => {
                    imageUrls.push(reader.result);
                    if (imageUrls.length === imageFiles.length) {
                        // 모든 이미지가 처리되면 새 글 저장
                        const newPost = {
                            title,
                            content,
                            images: imageUrls,
                        };
                        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
                        const updatedPosts = [...storedPosts, newPost];
                        localStorage.setItem('posts', JSON.stringify(updatedPosts));
                        navigate('/');
                    }
                };
            } else {
                // 이미지가 선택되지 않은 경우에도 반영
                imageUrls.push('');
            }
        }
    };

    return (
        <div className="create-container">
            <h1 className="create-heading">새 글 작성하기</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>제목:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>내용:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>사진1:</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageChange(0, e)} />
                </div>
                <div className="form-group">
                    <label>사진2:</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageChange(1, e)} />
                </div>
                <div className="form-group">
                    <label>사진3:</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageChange(2, e)} />
                </div>
                <button type="submit" className="submit-btn">
                    저장
                </button>
                <Link to="/" className="return-link">
                    메인으로 돌아가기
                </Link>
            </form>
        </div>
    );
};

export default Create;
