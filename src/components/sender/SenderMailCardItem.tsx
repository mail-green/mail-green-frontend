import React from 'react';
import type { SenderMailCard } from '../../types/senderMailCard';
import { BaseMailCardLayout } from '../common/BaseMailCardLayout';

export function SenderMailCardItem({ card }: { card: SenderMailCard }) {
    return (
        <BaseMailCardLayout
            title={`${card.name}에서 온 메일`}
            subtitle={card.from}
            count={card.count}
        >
            <button className="text-black font-semibold flex items-center gap-1">
                정리하러 가기 <span>›</span>
            </button>
        </BaseMailCardLayout>
    );
} 