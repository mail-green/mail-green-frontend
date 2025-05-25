import React from 'react'

type Props = {
    children: React.ReactNode
}

const GlobalContainer = ({ children }: Props) => {
    return (
        <div className='h-full bg-white flex flex-col justify-center w-lvw'>
            <div className="bg-white h-full min-w-[320px] max-w-[430px] w-full mx-auto py-8">
                {children}
            </div>
        </div>
    )
}

export default GlobalContainer