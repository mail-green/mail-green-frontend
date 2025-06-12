import React from 'react';
import type { Subscription } from '../../types/subscription';

interface Props {
    subscription: Subscription;
    onUnsubscribe: () => void;
}

export default function SubscribeMailCard({ subscription, onUnsubscribe }: Props) {
    return (
        <div className="rounded-xl border border-gray-200 p-4 mb-4 flex flex-col gap-2 bg-white cursor-pointer">
            <div>
                <div className="text-xl font-bold">{subscription.name}</div>
                <div className="text-xs text-gray-500">{subscription.sender}</div>
                <div className="text-sm text-gray-400">{subscription.count}건</div>
            </div>
            <button
                className="text-white px-3 py-2 mt-1 rounded-lg bg-main"
                onClick={onUnsubscribe}
            >
                구독 해제
            </button>
        </div>
    );
} 