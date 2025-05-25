import React, { useState } from 'react';
import GlobalContainer from '../container/GlobalContainer';
import Navbar from '../components/common/navbar';
import { AnalyzingStatusCard } from '../components/home/analyzingStatusCard';
import TitleText from '../components/common/titleText';
import { Carousel } from '../components/common/carousel/CarouselCardList';
import { EffectCard } from '../components/home/carouselCards/EffectCard';
import cardData from '../mock/exampleCarouselData';
import { AvailableFeatureTileGroup } from '../components/home/AvailableFeatureTileGroup';
import exampleEcoCarouselData from '../mock/exampleCarbonCarouselData';
import { CarbonCard } from '../components/home/carouselCards/CarbonCard';
import { FeatureCardGroup } from '../components/home/feature/FeatureCardGroup';

function AnalyzingLayout() {
    return (
        <>
            <div className='mt-4'>
                <AnalyzingStatusCard />
            </div>
            <div className='mt-4'>
                <TitleText text={'메일을 정리하면,\n 이런 효과가 있어요!'} />
            </div>
            <div className='mt-6'>
                <Carousel
                    data={cardData}
                    renderCard={(item, idx) => <EffectCard text={item.text} key={idx} />}
                />
            </div>
            <div className='mt-6'>
                <TitleText text={'메일 분석이 끝나면\n이런 기능들을 써볼 수 있어요!'} />
            </div>
            <div className='mt-6'>
                <AvailableFeatureTileGroup />
            </div>
        </>
    )

}

function HomeLayout() {
    return (
        <>
            <div className='mt-4'>
                <Carousel<CarbonCarouselData>
                    data={exampleEcoCarouselData}
                    renderCard={(item, idx) => <CarbonCard data={item} key={idx} />}
                />
            </div>
            <div className='mt-6'>
                <FeatureCardGroup />
            </div>
            <div className='h-6' />
        </>
    )
}

function Home() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    return <GlobalContainer>
        <Navbar />
        {isAnalyzing ? <AnalyzingLayout /> : <HomeLayout />}
    </GlobalContainer>;
}

export default Home;
