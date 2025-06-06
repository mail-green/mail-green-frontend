import React from 'react'

interface LeafIconProps {
    className?: string;
}

const LeafIcon = ({ className }: LeafIconProps) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 18C19.9545 18 20.9173 7.82916 20.9935 2.99665C21.0023 2.44443 20.54 1.999 19.9878 2.00914C3 2.32114 3 10.5568 3 18V22" stroke="#8FD694" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 18C3 18 3 12 11 11" stroke="#8FD694" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default LeafIcon