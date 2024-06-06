import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ReactDOM.createRoot를 사용하여 루트 엘리먼트를 렌더링합니다.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
