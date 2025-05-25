import React from 'react'
import profile from '../../assets/nav/profile_example.png';
import TitleText from './titleText';

const user = {
    name: "준혁"
}


const Navbar = () => {

    return (
        <div className='flex flex-row items-center justify-between w-full px-6'>
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