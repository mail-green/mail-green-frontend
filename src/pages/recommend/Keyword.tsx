import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FilterList } from '../../types/filter';
import { initialFilterData } from '../../data/initialFilterData';
import { Navbar } from '../../components/common/navbar';
import SearchBar from '../../components/common/SearchBar';
import GlobalContainer from '../../container/GlobalContainer';


function RecommendKeyword() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [filterList, setFilterList] = useState<FilterList>(initialFilterData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    return <GlobalContainer>
        <Navbar mode='recommend'
            title='키워드별로 정리하기'
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

export default RecommendKeyword;
