import React, { useState, useMemo } from 'react';
import GlobalContainer from '../../container/GlobalContainer';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';
import type { FilterList } from '../../types/filter';
import { NavbarContainer } from '../../components/common/navbar';
import { initialFilterData } from '../../data/initialFilterData';
import { KeywordMailCardGroupList } from '../../components/keyword/KeywordMailCardGroupList';
import { useQuery } from '@tanstack/react-query';
import { getKeywordCounts } from '../../utils/fetch/fetch';
import { getFilterParams } from '../../utils/filter/getFilterParams';
import useUser from '../../hooks/useUser';
import type { KeywordMailCard } from '../../types/keywordMailCard';

function RecommendKeyword() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [filterList, setFilterList] = useState<FilterList>(initialFilterData);
    const user = useUser();
    // API 호출
    const { data = [], isLoading } = useQuery({
        queryKey: ['keywordCounts', filterList, keyword],
        queryFn: () => getKeywordCounts<KeywordMailCard[]>({
            ...getFilterParams(user.id, filterList || [], keyword),
        }),
    });

    // 필터링/검색
    const filteredCards = useMemo(() => {
        return data.filter(card => {
            // 검색어: description, top_sender_name, top_sender_addr에 포함되는지
            const kw = keyword.trim().toLowerCase();
            if (kw) {
                const match =
                    card.description.toLowerCase().includes(kw) ||
                    card.top_sender_name.toLowerCase().includes(kw) ||
                    card.top_sender_addr.toLowerCase().includes(kw);
                if (!match) return false;
            }
            // 필터링 로직 추가 (필요시)
            return true;
        });
    }, [data, keyword, filterList]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleCardClick = (card: KeywordMailCard) => {
        navigate(`/recommend/keyword/detail/${card.topic_id}`, {
            state: {
                topic_id: card.topic_id,
                description: card.description,
                filterList,
            },
        });
    };

    return <GlobalContainer>
        <NavbarContainer mode='recommend'
            title='키워드로 정리하기'
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
            {isLoading ? (
                <div className='text-center text-gray-400 py-8'>로딩중...</div>
            ) : (
                <KeywordMailCardGroupList cards={filteredCards} onCardClick={handleCardClick} />
            )}
        </div>
        <div className='h-6'>
        </div>
    </GlobalContainer>;
}

export default RecommendKeyword;
