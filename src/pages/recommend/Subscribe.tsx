import React from 'react'
import { NavbarContainer } from '../../components/common/navbar';
import GlobalContainer from '../../container/GlobalContainer';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';


const Subscribe = () => {
    const navigate = useNavigate();

    return (
        <GlobalContainer>
            <NavbarContainer mode='recommend'
                title='구독 정리하기'
                onBack={() => {
                    navigate('/home');
                }} />
            <div className='mt-4 px-4'>
                <SearchBar
                    value={''}
                    onChange={() => { }}
                    filterList={[]}
                    setFilterList={() => { }}
                />
            </div>
        </GlobalContainer>
    )
}

export default Subscribe