import React from 'react';
import { CarouselCardContainer } from '../../common/carousel/CarouselCardContainer';

type Props = {
    text: string;
    icon: React.ReactNode;
}

// 메일 정리 효과 소개 카드
export function EffectCard({ text, icon }: Props) {
    return (
        <CarouselCardContainer>
            <div className="font-bold text-lg leading-snug text-main opacity-90 whitespace-pre-line mb-10">
                {text}
            </div>
            <div className="absolute bottom-4 right-6">{icon}</div>
        </CarouselCardContainer>
    )
}