import React from 'react';
import type { SenderMailCard } from '../../types/senderMailCard';
import { MailCardItem } from '../common/MailCardItem';
import { MiniMailCardItem } from '../common/MiniMailCardItem';

export function MailCardGroupList({ cards, onCardClick }: { cards: SenderMailCard[]; onCardClick?: (card: SenderMailCard) => void }) {
    const group1000 = cards.filter(card => card.count >= 1000);
    const group500 = cards.filter(card => card.count >= 500 && card.count < 1000);
    const group100 = cards.filter(card => card.count >= 100 && card.count < 500);
    const group50 = cards.filter(card => card.count >= 50 && card.count < 100);
    const group10 = cards.filter(card => card.count >= 10 && card.count < 50);
    const groupMini = cards.filter(card => card.count < 50);

    return (
        <div>
            {group1000.length > 0 && (
                <>
                    <div className="font-bold text-xl mb-2">1000개+</div>
                    {group1000.map(card => <MailCardItem key={card.id} card={card} onClick={() => onCardClick?.(card)} />)}
                </>
            )}
            {group500.length > 0 && (
                <>
                    <div className="font-bold text-xl mb-2 mt-4">500개+</div>
                    {group500.map(card => <MailCardItem key={card.id} card={card} onClick={() => onCardClick?.(card)} />)}
                </>
            )}
            {group100.length > 0 && (
                <>
                    <div className="font-bold text-xl mb-2 mt-4">100개+</div>
                    {group100.map(card => <MailCardItem key={card.id} card={card} onClick={() => onCardClick?.(card)} />)}
                </>
            )}
            {group50.length > 0 && (
                <>
                    <div className="font-bold text-xl mb-2 mt-4">50개+</div>
                    {group50.map(card => <MailCardItem key={card.id} card={card} onClick={() => onCardClick?.(card)} />)}
                </>
            )}
            {group10.length > 0 && (
                <>
                    <div className="font-bold text-xl mb-2 mt-4">10개+</div>
                    {group10.map(card => <MailCardItem key={card.id} card={card} onClick={() => onCardClick?.(card)} />)}
                </>
            )}
            {groupMini.length > 0 && (
                <>
                    <div className="font-bold text-xl mb-2 mt-4">기타 (10개 미만)</div>
                    {groupMini.map(card => <MiniMailCardItem key={card.id} card={card} onClick={() => onCardClick?.(card)} />)}
                </>
            )}
        </div>
    );
}
