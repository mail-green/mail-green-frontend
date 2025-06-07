import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarContainer } from '../../components/common/navbar';
import GlobalContainer from '../../container/GlobalContainer';
import ChatHistory from '../../components/recommend/ChatHistory';
import ChatInput from '../../components/recommend/ChatInput';
import { useChatHistory } from '../../hooks/useChatHistory';
import { askGpt } from '../../utils/fetch/askGpt';
import { v4 as uuidv4 } from 'uuid';
import type { ChatMessage } from '../../types/gptChat';
import useUser from '../../hooks/useUser';
import ChatSessionDialog from '../../components/recommend/ChatSessionDialog';

function RecommendGPT() {


    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const { sessions, currentSession, currentSessionId, addMessage, createNewSession, switchSession, removeSession } = useChatHistory();
    const [showDialog, setShowDialog] = useState(false);

    // 컴포넌트 언마운트 시 로딩 해제
    useEffect(() => {
        return () => setLoading(false);
    }, []);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        const userMsg: ChatMessage = {
            id: uuidv4(),
            role: 'user',
            content: input,
            createdAt: new Date().toISOString(),
        };
        addMessage(userMsg);
        setInput('');
        setLoading(true);
        try {
            const gptMsg = await askGpt(userMsg.content, user.id);
            addMessage({
                ...gptMsg,
                id: uuidv4(),
                role: 'gpt',
                createdAt: new Date().toISOString(),
            });
        } catch (e) {
            addMessage({
                id: uuidv4(),
                role: 'gpt',
                content: '오류가 발생했습니다.',
                createdAt: new Date().toISOString(),
                error: e instanceof Error ? e.message : '알 수 없는 오류',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlobalContainer>
            <div className="relative h-full flex flex-col">

                <div className="sticky top-0 z-10">
                    <NavbarContainer
                        mode='gpt'
                        title='GPT로 정리하기'
                        onBack={() => navigate('/home')}
                        onHistory={() => setShowDialog(true)}
                        onNewChat={createNewSession}
                    />
                </div>

                <ChatSessionDialog
                    open={showDialog}
                    onClose={() => setShowDialog(false)}
                    sessions={sessions}
                    currentSessionId={currentSessionId}
                    switchSession={switchSession}
                    removeSession={removeSession}
                />
                {/* 채팅 내역: NavBar와 입력창 사이에서만 스크롤 */}
                <div className="flex-1 overflow-y-auto px-2">
                    <ChatHistory history={currentSession.history} loading={loading} />
                </div>

                <div className="sticky bottom-0 z-10">
                    <ChatInput
                        value={input}
                        onChange={setInput}
                        onSend={handleSend}
                        disabled={loading}
                    />
                </div>
            </div>
        </GlobalContainer>
    );
}

export default RecommendGPT;
