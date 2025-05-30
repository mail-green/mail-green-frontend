import React from 'react';
import type { KeywordMailCard } from '../../types/keywordMailCard';
import { BaseMailCardLayout } from '../common/BaseMailCardLayout';

export function KeywordMailCardItem({ card }: { card: KeywordMailCard }) {
    return (
        <BaseMailCardLayout
            title={card.keyword}
            subtitle={card.representMailAddress}
            count={card.count}
        >
            <button className="text-black font-semibold flex items-center gap-1">
                정리하러 가기 <span>›</span>
            </button>
        </BaseMailCardLayout>
    );
} 