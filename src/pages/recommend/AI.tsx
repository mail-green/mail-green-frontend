import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FilterList } from '../../types/filter';
import { initialFilterData } from '../../data/initialFilterData';
import { NavbarContainer } from '../../components/common/navbar';
import SearchBar from '../../components/common/SearchBar';
import GlobalContainer from '../../container/GlobalContainer';

function RecommendAI() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [filterList, setFilterList] = useState<FilterList>(initialFilterData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    return <GlobalContainer>
        <NavbarContainer mode='recommend'
            title='AI 추천 받기'
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
    </GlobalContainer>;
}

export default RecommendAI;
