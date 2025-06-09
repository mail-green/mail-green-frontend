import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage, MarkImportantResult, ReadMailResult, DeleteMailResult, SearchMailResult, UnsubscribeMailResult, GptFunctionName } from '../../types/gptChat';

interface Props {
    message: ChatMessage;
    onExpandMailList?: (mails: SearchMailResult) => void;
}

function renderResult(result: ChatMessage['result'], functionName?: GptFunctionName, onExpandMailList?: (mails: SearchMailResult) => void) {
    if (!result) return null;
    switch (functionName) {
        case 'search_mail': {
            const mails = result as SearchMailResult;
            if (mails.length === 0) return <div>검색 결과가 없습니다.</div>;
            const showCount = 3;
            const isCompressed = mails.length > showCount;
            const shown = mails.slice(0, showCount);
            return (
                <div>
                    <ul style={{ paddingLeft: 16, margin: 0 }}>
                        {shown.map((mail) => (
                            <li key={mail.id} style={{ marginBottom: 4 }}>
                                <b>{mail.subject}</b> <span style={{ color: '#888' }}>({mail.sender})</span>
                                <div style={{ fontSize: 12, color: '#888' }}>{mail.snippet}</div>
                            </li>
                        ))}
                    </ul>
                    {isCompressed && (
                        <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
                            외 {mails.length - showCount}개
                            {onExpandMailList && (
                                <button style={{ marginLeft: 8, fontSize: 12, color: '#198754', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => onExpandMailList(mails)}>
                                    전체 보기
                                </button>
                            )}
                        </div>
                    )}
                </div>
            );
        }
        case 'mark_important': {
            const { count, starred_mails } = result as MarkImportantResult;
            return (
                <div>
                    <b>{count}개 메일에 별표 완료!</b>
                    <ul style={{ paddingLeft: 16, margin: 0 }}>
                        {starred_mails.map((mail) => (
                            <li key={mail.id}>{mail.subject} <span style={{ color: '#888' }}>({mail.sender})</span></li>
                        ))}
                    </ul>
                </div>
            );
        }
        case 'read_mail': {
            const { count } = result as ReadMailResult;
            return <div>{count}개 메일을 읽음 처리했습니다.</div>;
        }
        case 'delete_mail': {
            const { count } = result as DeleteMailResult;
            return <div>{count}개 메일을 삭제했습니다.</div>;
        }
        case 'unsubscribe_mail': {
            const { unsubscribed, failed, count } = result as UnsubscribeMailResult;
            return (
                <div>
                    <div>{count}개 구독 해제 완료</div>
                    {unsubscribed.length > 0 && (
                        <ul style={{ paddingLeft: 16, margin: 0 }}>
                            {unsubscribed.map((mail) => (
                                <li key={mail.id}>{mail.subject} <span style={{ color: '#888' }}>({mail.sender})</span></li>
                            ))}
                        </ul>
                    )}
                    {failed.length > 0 && (
                        <div style={{ color: 'red' }}>
                            실패: {failed.map((f) => `${f.id} (${f.error})`).join(', ')}
                        </div>
                    )}
                </div>
            );
        }
        default:
            return <div style={{ color: 'gray' }}>지원하지 않는 기능이거나, 결과 파싱에 실패했습니다.</div>;
    }
}

export default function ChatMessage({ message, onExpandMailList }: Props) {
    const isUser = message.role === 'user';
    return (
        <div style={{
            display: 'flex',
            flexDirection: isUser ? 'row-reverse' : 'row',
            alignItems: 'flex-start',
            margin: '8px 0',
        }}>
            <div style={{
                background: isUser ? 'linear-gradient(90deg, #d1e7dd 60%, #b6e2d3 100%)' : 'linear-gradient(90deg, #f8f9fa 60%, #e9ecef 100%)',
                color: '#222',
                borderRadius: 16,
                padding: '12px 18px',
                maxWidth: '70%',
                minWidth: 60,
                wordBreak: 'break-all',
                boxShadow: isUser ? '0 2px 8px #b6e2d355' : '0 2px 8px #e9ecef55',
                border: isUser ? '1.5px solid #b6e2d3' : '1.5px solid #e9ecef',
                position: 'relative',
                transition: 'box-shadow 0.3s',
            }}>
                <div>
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                {message.role === 'gpt' && message.result && (
                    <div style={{ marginTop: 8 }}>{renderResult(message.result, message.functionName, onExpandMailList)}</div>
                )}
                {message.role === 'gpt' && message.error && (
                    <div style={{ color: 'red', marginTop: 8 }}>{message.error}</div>
                )}
            </div>
        </div>
    );
} 