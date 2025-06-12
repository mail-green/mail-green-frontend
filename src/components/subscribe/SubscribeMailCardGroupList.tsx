import React from 'react';
import type { Subscription } from '../../types/subscription';
import SubscribeMailCard from './SubscribeMailCard';

interface Props {
    subscriptions: Subscription[];
    onUnsubscribeClick: (subscription: Subscription) => void;
}

export default function SubscribeMailCardGroupList({ subscriptions, onUnsubscribeClick }: Props) {
    return (
        <div>
            {subscriptions.map(sub => (
                <SubscribeMailCard
                    key={sub.sender}
                    subscription={sub}
                    onUnsubscribe={() => onUnsubscribeClick(sub)}
                />
            ))}
        </div>
    );
} 