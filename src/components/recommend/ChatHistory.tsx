import React, { useRef, useEffect } from 'react';
import type { ChatMessage } from '../../types/gptChat';
import ChatMessageComp from './ChatMessage';

interface Props {
    history: ChatMessage[];
    loading: boolean;
}

export default function ChatHistory({ history, loading }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null);

    // 새 메시지 추가 시 스크롤 하단 고정
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // 마지막 user 메시지 index 찾기 (로딩중 메시지 위치)
    const lastUserIdx = [...history].reverse().findIndex((msg) => msg.role === 'user');
    const lastUserAbsIdx = lastUserIdx === -1 ? -1 : history.length - 1 - lastUserIdx;

    // 마지막 gpt 메시지 index (로딩중 메시지와 겹칠 때 방지)
    const lastGptIdx = [...history].reverse().findIndex((msg) => msg.role === 'gpt');
    const lastGptAbsIdx = lastGptIdx === -1 ? -1 : history.length - 1 - lastGptIdx;

    // 로딩중 메시지는 마지막 user 메시지 바로 아래, 단 gpt가 없으면 첫 user 아래
    const showLoadingAt = loading && lastUserAbsIdx > lastGptAbsIdx ? lastUserAbsIdx : -1;

    const handleExpandMailList = () => {
        alert('메일 전체 보기는 추후 별도 페이지에서 지원됩니다.');
        // TODO: 페이지 이동/모달 등으로 전체 메일 리스트 보여주기
    };

    return (
        <div className='flex-1 overflow-y-auto mx-2'>
            {history.map((msg, i) => (
                <React.Fragment key={msg.id}>
                    <ChatMessageComp message={msg} onExpandMailList={handleExpandMailList} />
                    {i === showLoadingAt && (
                        <div className="w-full my-4 flex items-start">
                            <div className="px-4 py-3 text-sm font-medium relative animate-pulse max-w-xs">
                                <span className="text-gray-500">답변을 생성 중입니다...</span>
                            </div>
                        </div>
                    )}
                </React.Fragment>
            ))}
            <div ref={bottomRef} />
        </div>
    );
} 