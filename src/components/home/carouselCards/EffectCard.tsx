import React from 'react';
import { CarouselCardContainer } from '../../common/carousel/CarouselCardContainer';
import LeafIcon from '../../common/LeafIcon';

type Props = {
    text: string;
}

// 메일 정리 효과 소개 카드
export function EffectCard({ text }: Props) {
    return (
        <CarouselCardContainer>
            <div className="font-bold text-lg leading-snug text-main opacity-90 whitespace-pre-line mb-10">
                {text}
            </div>
            <div className='w-full flex justify-end'>
                <LeafIcon />
            </div>

        </CarouselCardContainer>
    )
}