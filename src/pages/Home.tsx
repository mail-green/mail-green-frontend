import React, { useEffect, useState } from 'react';
import GlobalContainer from '../container/GlobalContainer';
import { Navbar } from '../components/common/Navbar';
import { AnalyzingStatusCard } from '../components/home/analyzingStatusCard';
import TitleText from '../components/common/TitleText';
import { Carousel } from '../components/common/carousel/CarouselCardList';
import { EffectCard } from '../components/home/carouselCards/EffectCard';
import cardData from '../mock/exampleCarouselData';
import { AvailableFeatureTileGroup } from '../components/home/AvailableFeatureTileGroup';
import exampleEcoCarouselData from '../mock/exampleCarbonCarouselData';
import { CarbonCard } from '../components/home/carouselCards/CarbonCard';
import { FeatureCardGroup } from '../components/home/feature/FeatureCardGroup';

function AnalyzingLayout({ progress, isComplete, showCheck }: { progress: number | undefined, isComplete: boolean, showCheck: boolean }) {
    return (
        <div className='px-4'>
            <div className='mt-4'>
                <AnalyzingStatusCard progress={progress} isComplete={isComplete} showCheck={showCheck} />
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
        </div>
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
    const [isAnalyzing, setIsAnalyzing] = useState(true); // 진입 시 분석중
    const [progress, setProgress] = useState(95);
    const [isComplete, setIsComplete] = useState(false);
    const [showCheck, setShowCheck] = useState(false);
    const [showNumber, setShowNumber] = useState(true); // 숫자(99) 애니메이션용
    const [showAnalyzing, setShowAnalyzing] = useState(true); // analyzing 화면 페이드아웃용

    useEffect(() => {
        if (!isAnalyzing) {
            // analyzing → false로 바뀌면 0.5초 후 analyzing 화면 완전히 제거
            const timeout = setTimeout(() => setShowAnalyzing(false), 500);
            return () => clearTimeout(timeout);
        } else {
            setShowAnalyzing(true);
        }
    }, [isAnalyzing]);

    useEffect(() => {
        if (!isAnalyzing) return;
        // 90~99까지 1%씩 자연스럽게 증가
        if (progress < 99) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev < 99) return prev + 1;
                    return 99;
                });
            }, 500); // 10% → 5초, 1%마다 0.5초
            return () => clearInterval(interval);
        } else if (progress === 99) {
            // 99에서 100이 되는 순간 체크 애니메이션
            const timeout = setTimeout(() => {
                setShowCheck(true);
                setProgress(100);
                // 숫자 사라짐 애니메이션 시간(400ms) 후 숫자 제거
                setTimeout(() => setShowNumber(false), 400);
                setTimeout(() => {
                    setIsComplete(true);
                    setIsAnalyzing(false);
                }, 1000); // 2초 후 완료
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [isAnalyzing, progress]);

    const displayProgress = progress < 100 || (progress === 100 && showNumber) ? (progress === 100 ? 99 : progress) : undefined;

    return (
        <GlobalContainer>
            <Navbar mode='home' />
            <div className='relative'>
                {showAnalyzing && (
                    <div className={`transition-all duration-500 absolute w-full left-0 top-0 z-10 ${isAnalyzing ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                        <AnalyzingLayout progress={displayProgress} isComplete={isComplete} showCheck={showCheck} />
                    </div>
                )}
                <div className={`transition-all duration-500 ${isAnalyzing ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
                    <HomeLayout />
                </div>
            </div>
        </GlobalContainer >
    );
}

export default Home;
