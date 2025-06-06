import React, { useEffect, useState, useRef, useMemo } from 'react';
import GlobalContainer from '../container/GlobalContainer';
import { Navbar } from '../components/common/navbar';
import { AnalyzingStatusCard } from '../components/home/analyzingStatusCard';
import { Carousel } from '../components/common/carousel/CarouselCardList';
import exampleEcoCarouselData from '../mock/exampleCarbonCarouselData';
import { CarbonCard } from '../components/home/carouselCards/CarbonCard';
import { FeatureCardGroup } from '../components/home/feature/FeatureCardGroup';
import { getFetch, postFetch } from '../utils/fetch/fetch';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';


function HomeLayout({ isAnalyzing, progress, isComplete }: { isAnalyzing: boolean, progress: number, isComplete: boolean }) {
    return (
        <motion.div layout className="min-h-[400px]">
            <AnimatePresence mode="wait">
                {isAnalyzing && (
                    <motion.div
                        key="analyzing"
                        initial={{ opacity: 1, y: -40, height: 0, marginBottom: 0, padding: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40, height: 0, marginBottom: 0, padding: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        layout
                        style={{ overflow: 'hidden', marginBottom: 24 }}
                    >
                        <AnalyzingStatusCard progress={progress} isComplete={isComplete} />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div layout>
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
            </motion.div>
        </motion.div>
    )
}

function Home() {
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const pollingRef = useRef<number | null>(null);

    const navigate = useNavigate();

    const userId = useMemo(() => {
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        return user?.id;
    }, []);

    // 분석 시작 함수
    const startAnalyzing = async () => {
        try {
            await postFetch<{ message: string; status?: string }>(
                `/mail/analyze?user_id=${userId}`,
            );
            setIsAnalyzing(true);
        } catch {
            setIsAnalyzing(false);
        }
    };

    // 진행상황 조회 함수
    const getProgress = async () => {
        const res = await getFetch<{ in_progress: boolean; progress_pct: number; status: string }>(
            '/mail/progress',
            { user_id: userId }
        );
        const { in_progress, progress_pct, status } = res;

        setProgress(progress_pct);
        setIsAnalyzing(in_progress);
        setIsComplete(status === "done" || status === "failed");
        return status === "done" || status === "failed";
    };

    // polling 관리 useEffect
    useEffect(() => {
        if (!userId) {
            alert('로그인 후 이용해주세요.');
            navigate('/login');
            return;
        }

        // 최초 진입 시 분석 필요 여부 확인
        (async () => {
            const isComplete = await getProgress();

            if (!isComplete) {
                console.log("CALLED")
                console.log(isComplete);
                await startAnalyzing();
                await getProgress();
            }
        })();

        // polling 시작
        if (!pollingRef.current) {
            pollingRef.current = window.setInterval(async () => {
                const isComplete = await getProgress();
                if (isComplete) {
                    console.log("CALLED");
                    console.log(isComplete);
                    clearInterval(pollingRef.current!);
                    pollingRef.current = null;
                }
            }, 2000);
        }

        // 언마운트 시 polling 해제
        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
                pollingRef.current = null;
            }
        };
    }, [userId, navigate]);

    return (
        <GlobalContainer>
            <Navbar mode='home' />
            <div className='relative'>
                <div className={`transition-all duration-500 mx-4`}>
                    <HomeLayout isAnalyzing={isAnalyzing} progress={progress} isComplete={isComplete} />
                </div>
            </div>
        </GlobalContainer>
    );
}

export default Home;