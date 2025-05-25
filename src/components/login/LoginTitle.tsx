import React from 'react'
import logo from '../../assets/logo.png';

const LoginTitle = () => {
    return (
        <div className='flex flex-col items-center flex-1 space-x-2'>
            <img src={logo} alt="메일그린 로고" className="w-32 h-32 mx-auto mb-8" />
            <div className="text-center mb-2">
                <div className="text-2xl font-bold text-gray-900">안녕하세요</div>
                <div className="text-2xl font-bold mb-2">
                    <span className="text-[#8FD694]">메일그린</span>
                    <span className="text-gray-900">입니다</span>
                </div>
                <div className="text-gray-400 text-sm mb-12">푸른 지구, 메일그린과 함께 만들어가세요</div>
            </div>
        </div>
    )
}

export default LoginTitle