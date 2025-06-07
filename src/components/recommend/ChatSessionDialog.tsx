import React from 'react';
import { Trash2 as LucideTrash2 } from 'lucide-react';

interface ChatSessionDialogProps {
    open: boolean;
    onClose: () => void;
    sessions: { id: string; title: string }[];
    currentSessionId: string;
    switchSession: (id: string) => void;
    removeSession: (id: string) => void;
}

const ChatSessionDialog = ({ open, onClose, sessions, currentSessionId, switchSession, removeSession }: ChatSessionDialogProps) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 w-screen h-full z-[1000] bg-black/25 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="min-w-[320px] max-w-[400px] bg-white rounded-2xl shadow-[0_4px_32px_#0002] p-6 relative"
                onClick={e => e.stopPropagation()}
            >
                <div className="font-bold text-lg mb-4">채팅 목록 관리</div>
                <div className="flex flex-col gap-1.5 max-h-[300px] overflow-y-auto">
                    {sessions.map((s) => (
                        <div key={s.id} className="flex items-center w-full gap-1">
                            <button
                                onClick={() => { switchSession(s.id); onClose(); }}
                                className={`rounded-lg border ${s.id === currentSessionId ? 'border-[#198754] border-[1px] bg-[#e9f7ef]' : 'border-[#ccc] border bg-white'} text-[#222] px-2 py-1 font-medium text-base cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis text-left flex-1`}
                            >
                                {s.title}
                            </button>
                            <button onClick={() => removeSession(s.id)} className="bg-none border-none text-gray-400 text-[18px] cursor-pointer p-0 ml-0.5 leading-none" title="삭제">
                                <LucideTrash2 size={18} color="#888" />
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 bg-none border-none text-[22px] text-gray-400 cursor-pointer"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ChatSessionDialog; 