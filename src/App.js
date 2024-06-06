import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Detail from './pages/Detail';
import Create from './pages/Create'; // Create 컴포넌트 추가

function App() {
    useEffect(() => {
        if (!localStorage.getItem('posts')) {
            const examplePosts = [
                {
                    title: '패션 트렌드 2024',
                    content: '2024년 패션 트렌드에 대해 알아봅니다.',
                    images: [
                        'https://example.com/image1.jpg',
                        'https://example.com/image2.jpg',
                        'https://example.com/image3.jpg',
                    ],
                },
            ];
            localStorage.setItem('posts', JSON.stringify(examplePosts));
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/create" element={<Create />} /> {/* Create 컴포넌트에 대한 라우팅 추가 */}
            </Routes>
        </Router>
    );
}

export default App;
