import React from 'react';
import { CarouselCardContainer } from '../../common/carousel/CarouselCardContainer';
import LeafIcon from '../../common/LeafIcon';

type Props = {
    data: CarbonCarouselData;
}

// 메일 정리 효과 소개 카드
export function CarbonCard({ data }: Props) {
    return (
        <CarouselCardContainer>
            <div className="font-bold text-lg leading-snug bg-main-light text-main opacity-90 whitespace-pre-line mb-10">
                {data.message}
            </div>
            <div className='flex flex-row items-center justify-end gap-2'>
                <div className='text-lg text-main font-bold'>
                    {`${data.metricLabel} : ${data.metricValue}`}
                </div>

                <LeafIcon />
            </div>
        </CarouselCardContainer>
    )
}