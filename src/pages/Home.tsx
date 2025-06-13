import GlobalContainer from '../container/GlobalContainer';
import { Navbar } from '../components/common/navbar';
import { AnalyzingStatusCard } from '../components/home/analyzingStatusCard';
import { Carousel } from '../components/common/carousel/CarouselCardList';
import type { CarbonCarouselData } from '../types/carbonCarousel';
import { CarbonCard } from '../components/home/carouselCards/CarbonCard';
import { FeatureCardGroup } from '../components/home/feature/FeatureCardGroup';
import { AnimatePresence, motion } from 'framer-motion';

import useFetchCarbonCarousel from '../hooks/home/useFetchCarbonCarousel';
import useMailAnalyize from '../hooks/home/useMailAnalyize';

function HomeLayout() {

    // 탄소 정보 패칭
    const { carbonCarouselData, isCarbonLoading } = useFetchCarbonCarousel();
    console.log(carbonCarouselData);
    // 분석 상태 패칭
    const { isAnalyzing, isComplete } = useMailAnalyize();

    return (
        <motion.div layout className="min-h-[400px] mt-4">
            <AnimatePresence mode="wait">
                {isAnalyzing && !isComplete && (
                    <motion.div
                        key="analyzing"
                        initial={{ opacity: 1, y: -40, marginBottom: 0, padding: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40, marginBottom: 0, padding: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        layout
                        style={{ marginBottom: 24 }}
                    >
                        <AnalyzingStatusCard isComplete={isComplete} />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div layout>
                <div className='mt-4'>
                    <Carousel<CarbonCarouselData>
                        data={isCarbonLoading ? [{ message: '탄소 정보 불러오는 중...', metricLabel: '', metricValue: '' }] : (carbonCarouselData ?? [])}
                        renderCard={(item, idx) => <CarbonCard data={item} key={idx} />}
                    />
                </div>
                <div className='mt-6'>
                    <FeatureCardGroup />
                </div>
                <div className='h-6' />
            </motion.div>
        </motion.div>
    )
}

function Home() {



    return (
        <GlobalContainer>
            <Navbar mode='home' />
            <div className='relative'>
                <div className={`transition-all duration-500 mx-4`}>
                    <HomeLayout />
                </div>
            </div>
        </GlobalContainer>
    );
}

export default Home;