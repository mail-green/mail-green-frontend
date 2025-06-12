import React, { useState } from 'react';
import { NavbarContainer } from '../../components/common/navbar';
import GlobalContainer from '../../container/GlobalContainer';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';
import { useSubscriptions } from '../../hooks/api/useSubscriptions';
import { useUnsubscribe } from '../../hooks/api/useUnsubscribe';
import useUser from '../../hooks/useUser';
import SubscribeMailCardGroupList from '../../components/subscribe/SubscribeMailCardGroupList';
import UnsubscribeBottomSheet from '../../components/subscribe/UnsubscribeBottomSheet';
import type { Subscription } from '../../types/subscription';
import Loading from '../../components/common/Loading';

const Subscribe = () => {
    const navigate = useNavigate();
    const user = useUser();
    const [keyword, _] = useState('');
    const [selected, setSelected] = useState<Subscription | null>(null);
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

    const { data: subscriptions = [], isLoading } = useSubscriptions(user.id);
    const unsubscribeMutation = useUnsubscribe(user.id);

    // 검색 필터링
    const filtered = subscriptions.filter(sub => {
        const kw = keyword.trim().toLowerCase();
        if (!kw) return true;
        return (
            sub.name.toLowerCase().includes(kw) ||
            sub.sender.toLowerCase().includes(kw)
        );
    });

    const handleUnsubscribeClick = (sub: Subscription) => {
        setSelected(sub);
        setBottomSheetOpen(true);
    };

    const handleConfirmUnsubscribe = () => {
        if (selected) {
            unsubscribeMutation.mutate(selected.sub_id);
        }
        setBottomSheetOpen(false);
        setSelected(null);
    };

    const handleCloseBottomSheet = () => {
        setBottomSheetOpen(false);
        setSelected(null);
    };

    return (
        <GlobalContainer>
            <NavbarContainer mode='recommend'
                title='구독 정리하기'
                onBack={() => {
                    navigate('/home');
                }} />
            <div className='mt-6 px-4'>
                {isLoading ? (
                    <Loading />
                ) : filtered.length === 0 ? (
                    <div className='text-center text-gray-500'>구독자가 없습니다.</div>
                ) : (
                    <SubscribeMailCardGroupList subscriptions={filtered} onUnsubscribeClick={handleUnsubscribeClick} />
                )}
            </div>
            <UnsubscribeBottomSheet
                open={bottomSheetOpen}
                onClose={handleCloseBottomSheet}
                onConfirm={handleConfirmUnsubscribe}
                name={selected?.name || ''}
            />
            <div className='h-6'></div>
        </GlobalContainer>
    );
}

export default Subscribe;