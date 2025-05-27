import React from 'react'

type Props = {
    text: string
}

const TitleText = ({ text }: Props) => {
    const lines = text.split('\n');
    console.log(lines);
    return (
        <div className='text-2xl font-bold'>
            {lines.map((line, index) => (
                <div key={index}>{line}</div>
            ))}
        </div>
    )
}

export default TitleText