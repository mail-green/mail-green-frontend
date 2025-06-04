import React, { useState } from 'react';
import GlobalContainer from '../../container/GlobalContainer';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';
import type { FilterList } from '../../types/filter';
import { NavbarContainer } from '../../components/common/navbar';
import { initialFilterData } from '../../data/initialFilterData';
import type { SenderMailCard } from '../../types/senderMailCard';
import { MailCardGroupList } from '../../components/recommend/MailCardGroupList';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '../../hooks/useDebounce';
import { getFilterParams } from '../../utils/filter/getFilterParams';
import Loading from '../../components/common/Loading';
import { getSenderCounts } from '../../utils/fetch/fetch';
import useUser from '../../hooks/useUser';

type ResponseType = {
    sender: string;
    name: string;
    addr: string;
    count: number;
}

function RecommendSender() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [filterList, setFilterList] = useState<FilterList>(initialFilterData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };
    const user = useUser();

    const debouncedKeyword = useDebounce(keyword, 300);

    const { data: result, isLoading } = useQuery({
        queryKey: ['sender', debouncedKeyword, filterList],
        queryFn: () => getSenderCounts<ResponseType[]>(getFilterParams(user.id, filterList, debouncedKeyword)),
    });

    const filteredCards: SenderMailCard[] = (result ?? []).map(item => ({
        id: item.addr || item.sender || item.name,
        name: item.name,
        from: item.addr ?? item.sender ?? '',
        count: item.count,
    }));

    const handleCardClick = (card: SenderMailCard) => {
        if (!card.from) {
            alert('발신자 정보가 없습니다.');
            return;
        }
        navigate(`/recommend/sender/detail/${encodeURIComponent(card.from)}`, {
            state: {
                sender: card.from,
                name: card.name,
                filterList,
            },
        });
    };

    return <GlobalContainer>
        <NavbarContainer mode='recommend'
            title='발신자별로 정리하기'
            onBack={() => {
                navigate('/home');
            }} />
        <div className='mt-4 px-4'>
            <SearchBar
                value={keyword}
                onChange={handleChange}
                filterList={filterList}
                setFilterList={setFilterList}
            />
        </div>
        <div className='mt-6 px-4'>
            {isLoading && (
                <Loading />
            )}
            {filteredCards.length === 0 && !isLoading && <div className='text-center text-gray-500'>검색 결과가 없습니다.</div>}
            <MailCardGroupList cards={filteredCards} onCardClick={handleCardClick} />
        </div>
        <div className='h-6'>
        </div>
    </GlobalContainer>;
}

export default RecommendSender;
