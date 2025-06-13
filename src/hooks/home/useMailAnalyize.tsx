import { useState, useRef, useEffect } from 'react';
import { postFetch, getFetch } from '../../utils/fetch/fetch';
import { useNavigate } from 'react-router-dom';
import useUser from '../useUser';

const useMailAnalyize = () => {

    const navigate = useNavigate();

    const userId = useUser()?.id ?? '';

    const [isAnalyzing, setIsAnalyzing] = useState(true);

    const [isComplete, setIsComplete] = useState(false);

    const pollingRef = useRef<number | null>(null);

    useEffect(() => {
        console.log("isComplete", isComplete);

        if (isComplete) {
            setIsAnalyzing(false);
        }
    }, [isComplete]);

    useEffect(() => {
        console.log("isAnalyzing", isAnalyzing);
    }, [isAnalyzing]);

    // 분석 시작 함수
    const startAnalyzing = async () => {
        try {
            await postFetch<{ message: string; status?: string }>(
                `/mail/analyze?user_id=${userId}`,
            );
            console.log("START ANALYZING");
            setIsAnalyzing(true);
        } catch {
            setIsAnalyzing(false);
        }
    };

    // 진행상황 조회 함수
    const getProgress = async () => {
        const res = await getFetch<{ in_progress: boolean; progress_pct: number; status: string }>(
            '/mail',
            { user_id: userId }
        );
        const { status } = res;
        if (status && status === "done" || status === "failed") {
            setIsComplete(true);
        }
        return status ?? null;
    };

    const initialAnalyzing = async () => {
        const status = await getProgress();
        if (status === "done" || status === "failed") {
            setIsAnalyzing(false);
        }
        else if (status === "pending") {
            if (!pollingRef.current) {
                pollingRef.current = window.setInterval(async () => {
                    const isComplete = await getProgress();
                    if (isComplete) {
                        clearInterval(pollingRef.current!);
                        pollingRef.current = null;
                    }
                }, 10000);
            }
            setIsAnalyzing(true);
        } else {
            // null일 경우
            await startAnalyzing();
            setIsAnalyzing(true);
        }
    }

    // polling 관리 useEffect
    useEffect(() => {
        if (!userId) {
            alert('로그인 후 이용해주세요.');
            navigate('/login');
            return;
        }

        // 최초 진입 시 분석 필요 여부 확인
        initialAnalyzing();

        // 언마운트 시 polling 해제
        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
                pollingRef.current = null;
            }
        };
    }, [userId]);


    return {
        isAnalyzing,
        isComplete,
    }
}

export default useMailAnalyize