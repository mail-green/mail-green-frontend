import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import RecommendAI from './pages/recommend/AI';
import RecommendKeyword from './pages/recommend/Keyword';
import RecommendSender from './pages/recommend/Sender';
import RecommendGPT from './pages/recommend/GPT';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recommend/ai" element={<RecommendAI />} />
        <Route path="/recommend/keyword" element={<RecommendKeyword />} />
        <Route path="/recommend/sender" element={<RecommendSender />} />
        <Route path="/recommend/gpt" element={<RecommendGPT />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
