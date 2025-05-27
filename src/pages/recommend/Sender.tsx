import React, { useState } from 'react';
import GlobalContainer from '../../container/GlobalContainer';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';
import type { FilterList } from '../../types/filter';
import { Navbar } from '../../components/common/navbar';



function RecommendSender() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [filterList, setFilterList] = useState<FilterList>([
        {
            type: '읽음 상태',
            option: '읽음',
        },
        {
            type: '크기',
            option: null,
        },
        {
            type: '기간',
            option: null,
        },
    ]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };



    return <GlobalContainer>
        <Navbar mode='sort' onBack={() => {
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

export default RecommendSender;
