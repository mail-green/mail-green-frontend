import React from 'react';
import type { SenderMailCard } from '../../types/senderMailCard';

export function MiniMailCardItem({ card }: { card: SenderMailCard }) {
    return (
        <div className="rounded-lg border border-gray-200 p-2 mb-2 flex items-center justify-between bg-white">
            <div>
                <span className="font-semibold" style={{ color: 'var(--color-main)' }}>{card.name}</span>
                <span className="ml-2 text-gray-400 text-xs">{card.from}</span>
            </div>
            <span
                className="rounded-full px-2 py-0.5 text-xs font-bold"
                style={{ background: 'var(--color-main-light)', color: 'var(--color-main)' }}
            >
                {card.count}
            </span>
        </div>
    );
} 