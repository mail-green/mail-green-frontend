import React from 'react';
import type { KeywordMailCard } from '../../types/keywordMailCard';
import { KeywordMailCardItem } from './KeywordMailCardItem';

export function KeywordMailCardGroupList({ cards, onCardClick }: { cards: KeywordMailCard[], onCardClick?: (card: KeywordMailCard) => void }) {
    return (
        <div>
            {cards.map(card => (
                <KeywordMailCardItem key={card.topic_id} card={card} onClick={onCardClick ? () => onCardClick(card) : undefined} />
            ))}
        </div>
    );
} 