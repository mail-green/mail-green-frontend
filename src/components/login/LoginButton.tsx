import React from 'react'

import googleIcon from '../../assets/google_icon.png';

type Props = {
    text: string
}

const LoginButton = ({ text }: Props) => {
    return (
        <button
            className="flex items-center justify-center w-full max-w-xs h-14 rounded-lg bg-[#8FD694] text-green-900 font-medium text-base shadow-sm hover:bg-green-500 transition mx-auto"
        >
            <img src={googleIcon} alt="구글 아이콘" className="w-6 h-6 mr-2" />
            <p className='text-white'>{text}</p>
        </button>
    )
}

export default LoginButton