import React from 'react'

type Props = {
    children: React.ReactNode
}

const GlobalContainer = ({ children }: Props) => {
    return (
        <div className='h-full bg-white flex flex-col justify-center w-lvw overflow-x-hidden'>
            <div className="bg-white h-full min-w-[320px] max-w-[430px] w-full mx-auto flex flex-col py-4">
                {children}
            </div>
        </div>
    )
}

export default GlobalContainer