import React from 'react';
import GlobalContainer from '../container/GlobalContainer';
import Navbar from '../components/common/navbar';
import { AnalyzingStatusCard } from '../components/home/AnalyzingStatusCard';
import TitleText from '../components/common/TitleText';
import { Carousel } from '../components/common/carousel/CarouselCardList';
import { EffectCard } from '../components/home/carouselCards/EffectCard';
import cardData from '../mock/exampleCarouselData';
import { AvailableFeatureTileGroup } from '../components/home/AvailableFeatureTileGroup';

function Home() {
    return <GlobalContainer>
        <Navbar />
        <div className='mt-4'>
            <AnalyzingStatusCard />
        </div>
        <div className='mt-4'>
            <TitleText text={'메일을 정리하면,\n 이런 효과가 있어요!'} />
        </div>
        <div className='mt-6'>
            <Carousel
                data={cardData}
                renderCard={(item, idx) => <EffectCard text={item.text} icon={item.icon} key={idx} />}
            />
        </div>
        <div className='mt-6'>
            <TitleText text={'메일 분석이 끝나면\n이런 기능들을 써볼 수 있어요!'} />
        </div>
        <div className='mt-6'>
            <AvailableFeatureTileGroup />
        </div>
    </GlobalContainer>;
}

export default Home;
