import React from 'react';
import type { SenderMailCard } from '../../types/senderMailCard';

export function MailCardItem({ card, onClick }: { card: SenderMailCard; onClick?: () => void }) {
    return (
        <div className="rounded-xl border border-gray-200 p-4 mb-4 flex flex-col gap-2 bg-white cursor-pointer" onClick={onClick}>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-xl font-bold" style={{ color: 'var(--color-main)' }}>{card.name}에서 온 메일</div>
                    <div className="text-gray-400">{card.from}</div>
                </div>
                <div
                    className="rounded-full px-3 py-1 text-sm font-bold"
                    style={{ background: 'var(--color-main-light)', color: 'var(--color-main)' }}
                >
                    {card.count}
                </div>
            </div>
            <div className="flex justify-end">
                <button className="text-black font-semibold flex items-center gap-1" onClick={e => { e.stopPropagation(); onClick?.(); }}>
                    정리하러 가기 <span>›</span>
                </button>
            </div>
        </div>
    );
}
