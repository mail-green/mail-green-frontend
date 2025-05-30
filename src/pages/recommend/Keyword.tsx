import React, { useState } from 'react';
import GlobalContainer from '../../container/GlobalContainer';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';
import type { FilterList } from '../../types/filter';
import { NavbarContainer } from '../../components/common/navbar';
import { initialFilterData } from '../../data/initialFilterData';
import { KeywordMailCardGroupList } from '../../components/keyword/KeywordMailCardGroupList';

// const mockKeywordCards: KeywordMailCard[] = [];

function RecommendKeyword() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [filterList, setFilterList] = useState<FilterList>(initialFilterData);
    // const filteredCards = mockKeywordCards.filter(card => ...);
    const filteredCards: any[] = [];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
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
            <KeywordMailCardGroupList cards={filteredCards} />
        </div>
        <div className='h-6'>
        </div>
    </GlobalContainer>;
}

export default RecommendKeyword;
