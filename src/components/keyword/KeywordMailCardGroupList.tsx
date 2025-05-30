import React from 'react';
import type { KeywordMailCard } from '../../types/keywordMailCard';
import { KeywordMailCardItem } from './KeywordMailCardItem';

export function KeywordMailCardGroupList({ cards }: { cards: KeywordMailCard[] }) {
    return (
        <div>
            {cards.map(card => (
                <KeywordMailCardItem key={card.keyword} card={card} />
            ))}
        </div>
    );
} 