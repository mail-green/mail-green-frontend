import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import RecommendAI from './pages/recommend/AI';
import RecommendKeyword from './pages/recommend/Keyword';
import RecommendSender from './pages/recommend/Sender';
import RecommendGPT from './pages/recommend/GPT';
import LoginSuccessPage from './pages/LoginSuccessPage';
import RecommendSenderDetail from './pages/recommendDetail/Sender';
import RecommendKeywordDetail from './pages/recommendDetail/Keyword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/success" element={<LoginSuccessPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recommend/ai" element={<RecommendAI />} />
        <Route path="/recommend/keyword" element={<RecommendKeyword />} />
        <Route path="/recommend/sender" element={<RecommendSender />} />
        <Route path="/recommend/gpt" element={<RecommendGPT />} />
        <Route path="/recommend/sender/detail/:sender" element={<RecommendSenderDetail />} />
        <Route path="/recommend/keyword/detail/:topic_id" element={<RecommendKeywordDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
