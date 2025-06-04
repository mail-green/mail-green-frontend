import React from 'react';
import type { KeywordMailCard } from '../../types/keywordMailCard';
import { BaseMailCardLayout } from '../common/BaseMailCardLayout';

export function KeywordMailCardItem({ card, onClick }: { card: KeywordMailCard; onClick?: () => void }) {
    return (
        <BaseMailCardLayout
            title={card.description}
            subtitle={card.top_sender_addr}
            count={card.count}
            onClick={onClick}
        >
            <button className="text-black font-semibold flex items-center gap-1">
                정리하러 가기 <span>›</span>
            </button>
        </BaseMailCardLayout>
    );
} 