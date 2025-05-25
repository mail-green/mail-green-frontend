import React from 'react'

type Props = {
    children: React.ReactNode
}

const LoginContainer = ({ children }: Props) => {
    return (
        <div className="bg-white flex flex-col justify-between items-center h-full min-w-[320px] max-w-[430px] w-full mx-auto py-8">
            {children}
        </div>
    )
}

export default LoginContainer