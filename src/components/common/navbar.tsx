import React from 'react'
import profile from '../../assets/nav/profile_example.png';
import TitleText from './titleText';

const user = {
    name: "준혁"
}


const Navbar = () => {
    // todo : 글로벌 state로 적용
    return (
        <div className='flex flex-row items-center justify-between w-full'>
            <TitleText text={`안녕하세요, ${user.name}님`} />
            <div>
                <button>
                    <img src={profile} alt="프로필 이미지" />
                </button>
            </div>
        </div>
    )
}

export default Navbar