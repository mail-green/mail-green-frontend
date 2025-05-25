import React from 'react';

type Props = {
    children: React.ReactNode;
}

export function CarouselCardContainer({ children }: Props) {
    return (
        <div className="bg-main-light rounded-2xl px-6 py-6 h-auto flex flex-col justify-between relative min-w-0">
            {children}
        </div>
    );
}